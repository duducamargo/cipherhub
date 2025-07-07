# 🔐 CipherHub — Aprenda Criptografia Visualmente

[Read in English](README.md)

---

Bem-vindo ao **CipherHub**, uma plataforma moderna e interativa criada para **desmistificar a criptografia** através de explicações educacionais, abas interativas e exemplos de código reais. Seja você um estudante, desenvolvedor ou entusiasta de segurança, o CipherHub facilita o **entendimento e a visualização de como os algoritmos criptográficos funcionam**.

**🚀 Demonstração ao Vivo:** O aplicativo CipherHub está agora online e disponível em: [https://cipher-hub.up.railway.app/](https://cipher-hub.up.railway.app/)

---

## 💡 Índice

- [✨ Recursos](#-recursos)
- [🔧 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🧪 Algoritmos Abordados](#-algoritmos-abordados)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Primeiros Passos](#-primeiros-passos)
- [📦 Implantação](#-implantação)
- [📄 Licença](#-licença)
- [🤝 Contribuição](#-contribuição)

---

## ✨ Recursos

- 📚 **Abas Educacionais Detalhadas** — Conteúdo organizado explicando a história, conceitos centrais e aplicações no mundo real de cada algoritmo criptográfico.
- 🧠 **Blocos de Código Interativos** — Aprofunde-se na lógica de implementação real com destaque de sintaxe, números de linha e funcionalidade conveniente de copiar para a área de transferência.
- 🔍 **Demonstrações ao Vivo** — Experimente como algoritmos como SHA-256, RSA e a codificação Base64 se comportam com entrada em tempo real.
    - **Interface de Chat RSA:** Interaja com a criptografia RSA através de uma interface dinâmica, semelhante a um chat, que suporta geração de chaves e processamento de mensagens em tempo real.
- 📊 **Cartões de Detalhes** — Entenda rapidamente as características do algoritmo, como tipo (hash, assimétrico, codificação), reversibilidade, dificuldade de implementação, usos comuns e nível de segurança.
- 🎨 **UI Moderna e Responsiva** — Desfrute de animações suaves alimentadas por Framer Motion, tipografia elegante e um design totalmente responsivo adaptado para vários tamanhos de tela usando Tailwind CSS.
- ⚡ **Desempenho Otimizado** — Beneficie-se do carregamento preguiçoso (lazy loading) de componentes de página, garantindo cargas iniciais de página mais rápidas e transições suaves.

---

## 🔧 Tecnologias Utilizadas

O CipherHub aproveita uma poderosa combinação de tecnologias web e de sistemas modernas para oferecer uma experiência robusta e interativa:

- **Frontend:**
    - **React:** Uma biblioteca JavaScript declarativa para construção de interfaces de usuário.
    - **TypeScript:** Um superconjunto de JavaScript que adiciona tipagem estática, aprimorando a qualidade e a manutenibilidade do código.
    - **Tailwind CSS:** Um framework CSS utility-first para construção rápida de designs personalizados.
    - **Framer Motion:** Uma biblioteca de animação pronta para produção para React, permitindo UI/UX fluida.
    - **Vite:** Uma ferramenta de build e servidor de desenvolvimento extremamente rápidos.
    - **Axios / Fetch API:** Para fazer requisições HTTP para o backend.
    - **React Syntax Highlighter (baseado em Prism):** Para renderização bonita e funcional de blocos de código.
    - **Lucide React:** Uma biblioteca de ícones versátil que fornece ícones de UI limpos e consistentes.
- **Backend:**
    - **Node.js:** Um ambiente de execução JavaScript para construir aplicações escaláveis no lado do servidor.
    - **Express.js:** Um framework web rápido, minimalista e sem opiniões para Node.js.
    - **C (Implementações Personalizadas):** Programas C de alto desempenho e compilados sob medida para computações criptográficas centrais (SHA-256, RSA, Base64), invocados através do módulo Child Process do Node.js.
    - **Child Process (Node.js):** Para executar binários C externos e capturar sua saída.
- **Containerização:**
    - **Docker:** Para criar ambientes de desenvolvimento e implantação isolados, consistentes e portáteis para frontend e backend.
    - **Docker Compose:** Para orquestrar e executar aplicações Docker multi-contêiner com um único comando.
- **Hospedagem:** Railway (para potencial implantação futura)

---

## 🧪 Algoritmos Abordados

- ✅ **SHA-256:** Uma função hash criptográfica amplamente utilizada, fundamental para integridade de dados e blockchain.
- ✅ **RSA:** Um algoritmo de criptografia assimétrica fundamental, crucial para troca segura de chaves e assinaturas digitais.
- ✅ **Base64:** Um esquema de codificação comum para representar dados binários em formato de string ASCII.
- 🚧 Mais em breve...

Cada algoritmo inclui:
- Uma rica explicação em abas (história, definição, uso, etc.)
- Um componente **CodeBlock** interativo mostrando implementações reais
- Um **Details Card** com especificações técnicas

---

## 📁 Estrutura do Projeto (Simplificada para Visão Geral)

```
/cipherhub
├── docker-compose.yml             
├── frontend/                     
│   ├── public/                    
│   ├── src/                       
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/                  
│   │   ├── lib/                 
│   │   ├── pages/
│   │   ├── App.tsx                 
│   │   └── main.tsx                
│   ├── package.json
│   ├── vite.config.ts
│   └── .dockerignore             
│
└── backend/                       
├── files/                     
├── src/                       
│   ├── base64.c
│   ├── rsa.c
│   ├── sha256.c
├── server.js                   
├── package.json
└── .dockerignore               


```


---

## 🚀 Primeiros Passos

Para colocar o CipherHub em funcionamento localmente usando Docker Compose (configuração recomendada):

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/duducamargo/cipherhub.git
    cd cipherhub
    ```

2. **Limpar e Preparar (Importante para um novo começo):**
    * **Garanta que o Docker Desktop esteja em execução** em sua máquina.
    * **Exclua as pastas locais `node_modules`, `dist` e `output`:**
        ```bash
        # No diretório raiz 'cipherhub'
        cd frontend/
        Remove-Item -Path node_modules, dist, package-lock.json -Recurse -Force -ErrorAction SilentlyContinue # Para PowerShell
        # Ou: rm -rf node_modules dist package-lock.json # Para Bash/WSL
        cd ../backend/
        Remove-Item -Path node_modules, src/output, package-lock.json -Recurse -Force -ErrorAction SilentlyContinue # Para PowerShell
        # Ou: rm -rf node_modules src/output package-lock.json # Para Bash/WSL
        cd .. # Voltar para a raiz /cipherhub
        ```
    * **Execute um reset completo do Docker/WSL (Crucial se você encontrou erros de `socket failed` anteriormente):**
        * Feche todas as janelas do terminal.
        * Saia do Docker Desktop.
        * Abra o **PowerShell como Administrador** e execute: `wsl --shutdown`
        * **Reinicie seu computador.**
        * Após a reinicialização, abra o Docker Desktop e espere ele iniciar completamente.

3. **Construa e Execute com Docker Compose:**
    * Navegue até a **raiz do projeto `cipherhub`** (onde `docker-compose.yml` está localizado).
    * Execute o seguinte comando para construir as imagens Docker e iniciar os serviços:
        ```bash
        docker compose up --build --force-recreate
        ```
        Este comando irá:
        - Construir as imagens Docker do `frontend` e `backend` (forçando uma nova construção).
        - Iniciar o servidor backend Node.js (em `http://localhost:3001`).
        - Iniciar a aplicação frontend React (em `http://localhost:5173`).

4. **Acesse a Aplicação:**
    * Assim que ambos os serviços estiverem ativos (verifique os logs do seu terminal), abra seu navegador e acesse:
        [http://localhost:5173](http://localhost:5173)

---

## 📦 Implantação

O CipherHub é projetado para implantação em contêineres. Cada serviço (frontend e backend) pode ser implantado independentemente usando suas respectivas imagens Docker.

- **Construir Imagem Frontend:** `docker build -t your-registry/cipherhub-frontend:latest -f frontend/Dockerfile .`
- **Construir Imagem Backend:** `docker build -t your-registry/cipherhub-backend:latest -f backend/Dockerfile .`

Essas imagens podem então ser enviadas para um registro de contêiner (por exemplo, Docker Hub, AWS ECR, Google Container Registry) e implantadas em plataformas como Railway, AWS ECS, Google Cloud Run ou Kubernetes.

---

## 📄 Licença

Licença MIT. Use livremente e contribua!

---

## 🤝 Contribuição

Pull requests são bem-vindos! Se você tem ideias para novos algoritmos, melhorias na UI ou conteúdo educacional, vamos colaborar!

---

Feito com ❤️ para aprendizado, segurança e design elegante.
