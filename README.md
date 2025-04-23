
# Sistema de Criptografia

Este projeto consiste em um sistema completo de criptografia baseado no algoritmo **SHA-256**, com backend em **C** e frontend em **React**. A aplicação permite:

- Geração de hashes SHA-256 a partir de arquivos e textos
- Comparação de hashes entre arquivos
- Validação de integridade por meio de hashes fornecidas
- Interface gráfica simples e intuitiva para uso via navegador

---

## ⚙️ Tecnologias Utilizadas

### Backend:
- C (padrão C99)
- SHA-256 implementado manualmente
- Interação por terminal (CLI)

### Frontend:
- React.js
- Vite ou Create React App
- Comunicação com o backend (em fase de implementação)

---

## 🚀 Funcionalidades

- [x]  Gerar hash SHA-256 de arquivos
- [x]  Gerar hash SHA-256 de textos
- [x]  Comparar hash de um arquivo com uma hash fornecida
- [x]  Verificar se dois arquivos são idênticos comparando suas hashes
- [ ]  Integração backend <-> frontend via API HTTP (em progresso)
- [ ]  Upload de arquivos via interface web (em progresso)

---

## 🧪 Como executar (modo terminal)

### Compilar o backend:

```bash
cd backend/src
gcc main.c -o sha256
./sha256
