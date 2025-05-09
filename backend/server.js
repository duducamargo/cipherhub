const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const shaPath = path.join(__dirname, "sha256.exe");
const rsaPath = path.join(__dirname, "rsa.exe");

app.post("/sha256", (req, res) => {
  const { text } = req.body;
  exec(`"${shaPath}" "${text}"`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ result: stdout.trim() });
  });
});

app.post("/rsa", (req, res) => {
  const { text } = req.body;
  exec(`"${rsaPath}" "${text}"`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ result: stdout.trim() });
  });
});

app.listen(3001, () => {
  console.log("✅ API pronta em http://localhost:3001");
});
