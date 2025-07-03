# 🔐 CipherHub — Learn Cryptography Visually

Welcome to **CipherHub**, a modern, interactive platform built to **demystify cryptography** through educational explanations, interactive tabs, and real code examples. Whether you're a student, developer, or security enthusiast, CipherHub makes it easier to **understand and visualize how cryptographic algorithms work**.

---

## 💡 Table of Contents

- [✨ Features](#-features)
- [🔧 Technologies Used](#-technologies-used)
- [🧪 Algorithms Covered](#-algorithms-covered)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📦 Deployment](#-deployment)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

- 📚 **Detailed Educational Tabs** — Organized content explaining the history, core concepts, and real-world applications of each cryptographic algorithm.
- 🧠 **Interactive Code Blocks** — Dive into the actual implementation logic with syntax highlighting, line numbers, and convenient copy-to-clipboard functionality.
- 🔍 **Live Demonstrations** — Experience how algorithms like SHA-256, RSA, and Base64 encoding behave with real-time input.
    - **RSA Chat Interface:** Engage with RSA encryption through a dynamic, chat-like interface that supports on-the-fly key generation and message processing.
- 📊 **Detail Cards** — Quickly grasp algorithm characteristics, such as type (hash, asymmetric, encoding), reversibility, implementation difficulty, common uses, and security level.
- 🎨 **Modern & Responsive UI** — Enjoy smooth animations powered by Framer Motion, elegant typography, and a fully responsive design tailored for various screen sizes using Tailwind CSS.
- ⚡ **Optimized Performance** — Benefit from lazy loading of page components, ensuring faster initial page loads and seamless transitions.

---

## 🔧 Technologies Used

CipherHub leverages a powerful combination of modern web and systems technologies to deliver a robust and interactive experience:

- **Frontend:**
    - **React:** A declarative JavaScript library for building user interfaces.
    - **TypeScript:** A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
    - **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
    - **Framer Motion:** A production-ready animation library for React, enabling fluid UI/UX.
    - **Vite:** A lightning-fast build tool and development server.
    - **Axios / Fetch API:** For making HTTP requests to the backend.
    - **React Syntax Highlighter (Prism-based):** For beautiful and functional code block rendering.
    - **Lucide React:** A versatile icon library providing clean and consistent UI icons.
- **Backend:**
    - **Node.js:** A JavaScript runtime environment for building scalable server-side applications.
    - **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
    - **C (Custom Implementations):** High-performance, custom-compiled C programs for core cryptographic computations (SHA-256, RSA, Base64), invoked via Node.js's Child Process module.
    - **Child Process (Node.js):** For executing external C binaries and capturing their output.
- **Containerization:**
    - **Docker:** For creating isolated, consistent, and portable development and deployment environments for both frontend and backend.
    - **Docker Compose:** For orchestrating and running multi-container Docker applications with a single command.
- **Hosting:** Railway (for potential future deployment)

---

## 🧪 Algorithms Covered

- ✅ **SHA-256:** A widely used cryptographic hash function, fundamental for data integrity and blockchain.
- ✅ **RSA:** A foundational asymmetric encryption algorithm, crucial for secure key exchange and digital signatures.
- ✅ **Base64:** A common encoding scheme for representing binary data in an ASCII string format.
- 🚧 More coming soon...

Each algorithm includes:
- A rich tabbed explanation (history, definition, usage, etc.)
- An interactive **CodeBlock** component showing real implementations
- A **Details Card** with technical specs

---

## 📁 Project Structure (Simplified for Overview)

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

## 🚀 Getting Started

To get CipherHub up and running locally using Docker Compose (recommended setup):

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/duducamargo/cipherhub.git](https://github.com/duducamargo/cipherhub.git)
    cd cipherhub
    ```

2.  **Clean & Prepare (Important for a fresh start):**
    * **Ensure Docker Desktop is running** on your machine.
    * **Delete local `node_modules`, `dist`, and `output` folders:**
        ```bash
        # In the root 'cipherhub' directory
        cd frontend/
        Remove-Item -Path node_modules, dist, package-lock.json -Recurse -Force -ErrorAction SilentlyContinue # For PowerShell
        # Or: rm -rf node_modules dist package-lock.json # For Bash/WSL
        cd ../backend/
        Remove-Item -Path node_modules, src/output, package-lock.json -Recurse -Force -ErrorAction SilentlyContinue # For PowerShell
        # Or: rm -rf node_modules src/output package-lock.json # For Bash/WSL
        cd .. # Back to /cipherhub root
        ```
    * **Perform a full Docker/WSL reset (Crucial if you encountered `socket failed` errors previously):**
        * Close all terminal windows.
        * Quit Docker Desktop.
        * Open **PowerShell as Administrator** and run: `wsl --shutdown`
        * **Reboot your computer.**
        * After reboot, open Docker Desktop and wait for it to fully start.

3.  **Build and Run with Docker Compose:**
    * Navigate to the **root of the `cipherhub` project** (where `docker-compose.yml` is located).
    * Execute the following command to build the Docker images and start the services:
        ```bash
        docker compose up --build --force-recreate
        ```
        This command will:
        -   Build the `frontend` and `backend` Docker images (forcing a fresh build).
        -   Start the Node.js backend server (on `http://localhost:3001`).
        -   Start the React frontend application (on `http://localhost:5173`).

4.  **Access the Application:**
    * Once both services are up (check your terminal logs), open your web browser and go to:
        [http://localhost:5173](http://localhost:5173)

---

## 📦 Deployment

CipherHub is designed for containerized deployment. Each service (frontend and backend) can be deployed independently using their respective Docker images.

-   **Build Frontend Image:** `docker build -t your-registry/cipherhub-frontend:latest -f frontend/Dockerfile .`
-   **Build Backend Image:** `docker build -t your-registry/cipherhub-backend:latest -f backend/Dockerfile .`

These images can then be pushed to a container registry (e.g., Docker Hub, AWS ECR, Google Container Registry) and deployed on platforms like Railway, AWS ECS, Google Cloud Run, or Kubernetes.

---

## 📄 License

MIT License. Use freely and contribute!

---

## 🤝 Contributing

Pull requests are welcome! If you have ideas for new algorithms, UI improvements, or educational content, let’s collaborate!

---

Made with ❤️ for learning, security, and elegant design.