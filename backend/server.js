const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const shaPath = path.join(__dirname, "src", "output", "sha256.exe");
const rsaPath = path.join(__dirname, "src", "output", "rsa.exe");
const base64Path = path.join(__dirname, "src", "output", "base64.exe");

app.post("/sha256", (req, res) => {
  const { text } = req.body;
  exec(`"${shaPath}" "${text}"`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ result: stdout.trim() });
  });
});

app.post("/base64/encode", (req, res) => {
  const { text } = req.body;
  exec(`"${base64Path}" 1 "${text}"`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ result: stdout.trim() });
  });
});

app.post("/base64/decode", (req, res) => {
  const { text } = req.body;
  exec(`"${base64Path}" 2 "${text}"`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ result: stdout.trim() });
  });
});

app.post("/rsa/generate-keys", (req, res) => {
  const command = `"${rsaPath}" generate-keys`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(
        `Error executing C program for key generation: ${err.message}`
      );
      console.error("Stderr:", stderr);
      return res
        .status(500)
        .json({ error: `Failed to generate keys: ${stderr}` });
    }
    if (stderr) {
      console.warn(
        "C program Stderr (Warnings/Info during key generation):",
        stderr
      );
    }

    try {
      const jsonString = stdout.trim();
      const keys = JSON.parse(jsonString);
      res.json(keys);
    } catch (parseError) {
      console.error("JSON Parse Error from key generation:", parseError);
      console.error("Raw stdout for key generation error:", stdout);
      res
        .status(500)
        .json({
          error: "Failed to parse key generation output.",
          rawOutput: stdout,
        });
    }
  });
});

app.post("/rsa", (req, res) => {
  const { text, n, e, d, mode } = req.body;

  if (!text || !n || !mode) {
    return res
      .status(400)
      .json({ error: "Missing required parameters: text, n, or mode." });
  }
  if (mode === "encrypt" && !e) {
    return res
      .status(400)
      .json({ error: 'Missing public key "e" for encryption.' });
  }
  if (mode === "decrypt" && !d) {
    return res
      .status(400)
      .json({ error: 'Missing private key "d" for decryption.' });
  }

  let command;
  const inputForC = text;

  if (mode === "encrypt") {
    command = `"${rsaPath}" encrypt "${inputForC}" "${n}" "${e}"`;
  } else if (mode === "decrypt") {
    command = `"${rsaPath}" decrypt "${inputForC}" "${n}" "${d}"`;
  } else {
    return res
      .status(400)
      .json({ error: 'Invalid mode specified. Use "encrypt" or "decrypt".' });
  }

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`RSA Exec Error for command: ${command}`, err);
      console.error("Stderr:", stderr);
      console.error("Stdout:", stdout);
      return res.status(500).json({
        error: `Erro de execução no programa C: ${stderr || "Nenhum"}.`,
        details: stdout.trim(),
      });
    }
    if (stderr) {
      console.warn("RSA Program Stderr (Warning/Info):", stderr);
    }

    try {
      const jsonString = stdout.trim();
      const rsaResult = JSON.parse(jsonString);
      res.json(rsaResult);
    } catch (parseError) {
      console.error("RSA JSON Parse Error:", parseError);
      console.error("RSA Raw stdout for parsing error:", stdout);
      return res.status(500).json({
        error: `Erro ao analisar a saída JSON do programa C. Saída bruta: "${stdout}"`,
        parseErrorDetails: parseError.message,
      });
    }
  });
});

app.listen(3001, () => {
  console.log("API pronta em http://localhost:3001");
});
