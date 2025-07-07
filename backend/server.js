const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const isWindows = process.platform === "win32";
const executableExtension = isWindows ? ".exe" : ""; 

const shaPath = path.join(
  __dirname,
  "src",
  "output",
  `sha256${executableExtension}`
);
const rsaPath = path.join(
  __dirname,
  "src",
  "output",
  `rsa${executableExtension}`
);
const base64Path = path.join(
  __dirname,
  "src",
  "output",
  `base64${executableExtension}`
);

async function executeCCommand(command, res, debugName = "C Program") {
  console.log(`${debugName} - Executing command: ${command}`);

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`${debugName} Exec Error:`, err);
        console.error("Stderr:", stderr);
        console.error("Stdout:", stdout);
        return reject({
          status: 500,
          error: `${debugName} execution failed.`,
          details: err.message,
          stderr_output: stderr.trim(),
          stdout_output: stdout.trim(),
        });
      }
      if (stderr) {
        console.warn(`${debugName} Stderr (Warning/Info):`, stderr);
      }
      resolve(stdout.trim());
    });
  });
}
app.post("/sha256", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text input cannot be empty." });
  }

  const sanitizedText = text.trim();

  try {
    const stdout = await executeCCommand(
      `"${shaPath}" "${sanitizedText}"`,
      res,
      "SHA256 Program"
    );

    if (!stdout) {
      return res.status(500).json({
        error: "SHA256 program returned empty output.",
        rawOutput: stdout,
      });
    }

    res.json({ result: stdout });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

app.post("/base64/encode", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text input cannot be empty." });
  }

  const sanitizedText = text.trim();

  try {
    const stdout = await executeCCommand(
      `"${base64Path}" 1 "${sanitizedText}"`,
      res,
      "Base64 Encode Program"
    );
    res.json({ result: stdout });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

app.post("/base64/decode", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text input cannot be empty." });
  }

  const sanitizedText = text.trim();

  try {
    const stdout = await executeCCommand(
      `"${base64Path}" 2 "${sanitizedText}"`,
      res,
      "Base64 Decode Program"
    );
    res.json({ result: stdout });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

app.post("/rsa/generate-keys", async (req, res) => {
  try {
    const stdout = await executeCCommand(
      `"${rsaPath}" generate-keys`,
      res,
      "RSA Key Generation Program"
    );

    let keys;
    try {
      keys = JSON.parse(stdout);
    } catch (parseError) {
      console.error("RSA Key Generation - JSON Parse Error:", parseError);
      console.error("RSA Key Generation - Raw stdout:", stdout);
      return res.status(500).json({
        error: "Failed to parse key generation output as JSON.",
        parseErrorDetails: parseError.message,
        rawOutput: stdout,
      });
    }

    res.json(keys);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

app.post("/rsa", async (req, res) => {
  const { text, n, e, d, mode } = req.body;

  if (
    !text ||
    text.trim() === "" ||
    !n ||
    n.trim() === "" ||
    !mode ||
    (mode !== "encrypt" && mode !== "decrypt")
  ) {
    return res.status(400).json({
      error: "Missing or invalid required parameters: text, n, mode.",
    });
  }
  if (mode === "encrypt" && (!e || e.trim() === "")) {
    return res
      .status(400)
      .json({ error: 'Missing public key "e" for encryption.' });
  }
  if (mode === "decrypt" && (!d || d.trim() === "")) {
    return res
      .status(400)
      .json({ error: 'Missing private key "d" for decryption.' });
  }

  const sanitizedText = text.trim();
  const sanitizedN = n.trim();
  const sanitizedE = e ? e.trim() : "";
  const sanitizedD = d ? d.trim() : "";

  let command;
  if (mode === "encrypt") {
    command = `"${rsaPath}" encrypt "${sanitizedText}" ${sanitizedN} ${sanitizedE}`;
  } else {
    // mode === "decrypt"
    command = `"${rsaPath}" decrypt "${sanitizedText}" ${sanitizedN} ${sanitizedD}`;
  }

  try {
    const stdout = await executeCCommand(command, res, `RSA ${mode} Program`);

    let rsaResult;
    try {
      rsaResult = JSON.parse(stdout);
    } catch (parseError) {
      console.error(`RSA ${mode} Program - JSON Parse Error:`, parseError);
      console.error(`RSA ${mode} Program - Raw stdout:`, stdout);
      return res.status(500).json({
        error: `Failed to parse ${mode} output as JSON.`,
        parseErrorDetails: parseError.message,
        rawOutput: stdout,
      });
    }

    res.json(rsaResult);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

app.listen(3001, () => {
  console.log("API pronta em http://localhost:3001");
});
