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

  if (!text || !n || (mode === "encrypt" && !e) || (mode === "decrypt" && !d)) {
    return res
      .status(400)
      .json({ error: "Dados incompletos: texto, N e E/D são obrigatórios." });
  }

  let bigIntN, bigIntE, bigIntD;
  try {
    bigIntN = BigInt(n);
    if (mode === "encrypt") bigIntE = BigInt(e);
    if (mode === "decrypt") bigIntD = BigInt(d);
  } catch (parseError) {
    return res
      .status(400)
      .json({ error: "Chaves (N, E, D) devem ser números inteiros válidos." });
  }

  const MIN_N_LENGTH = 3; 
  const MIN_EXP_LENGTH = 1; 

  if (bigIntN.toString().length < MIN_N_LENGTH || bigIntN <= 1n) {
    return res
      .status(400)
      .json({
        error: "Chave N inválida: N deve ser um número inteiro positivo muito grande (geralmente com centenas de dígitos) e composto (formado pela multiplicação de dois números primos grandes).",
      });
  }
  if (
    mode === "encrypt" &&
    (bigIntE.toString().length < MIN_EXP_LENGTH || bigIntE <= 1n)
  ) {
    return res
      .status(400)
      .json({ error: "Chave E inválida: E deve ser um número inteiro positivo, como 3 ou 65537. Geralmente, números pequenos e ímpares são usados para esta chave." });
  }
  if (
    mode === "decrypt" &&
    (bigIntD.toString().length < MIN_EXP_LENGTH || bigIntD <= 1n)
  ) {
    return res
      .status(400)
      .json({ error: "Chave D inválida: deve ser um número positivo." });
  }

  try {
    const command = `./rsa_program --mode ${mode} --n ${n} --e ${e} --d ${d} --text "${text}"`;
    const { stdout, stderr } = await exec(command); 

    if (stderr) {
      console.error("Erro do programa C:", stderr);
      return res
        .status(400)
        .json({ error: `Erro na operação RSA: ${stderr.trim()}` });
    }

    const result = JSON.parse(stdout); 

    if (result.success === false) {
      return res
        .status(400)
        .json({ error: result.message || "Chaves RSA inválidas fornecidas." });
    }

    res.json(result);
  } catch (error) {
    console.error("Erro ao executar o programa C:", error);
    return res
      .status(500)
      .json({
        error:
          "Erro ao processar RSA: As chaves fornecidas podem ser inválidas. Certifique-se de que N é um número inteiro positivo muito grande (geralmente com centenas de dígitos e composto pela multiplicação de dois números primos grandes). As chaves E e D também devem ser números inteiros positivos válidos.",
      });
  }
});

app.listen(3001, () => {
  console.log("API pronta em http://localhost:3001");
});
