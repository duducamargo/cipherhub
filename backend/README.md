# 🔐 CipherHub — Learn Cryptography Visually

Welcome to **CipherHub**, a modern, interactive platform built to **demystify cryptography** through educational explanations, interactive tabs, and real code examples. Whether you're a student, developer, or security enthusiast, CipherHub makes it easier to **understand and visualize how cryptographic algorithms work**.

---

## ✨ Features

- 📚 **Detailed Educational Tabs** — Organized content explaining the history, concepts, and applications of cryptography.
- 🧠 **Interactive Code Blocks** — With syntax highlighting, line numbers, and copy-to-clipboard functionality.
- 🔍 **Live Demonstrations** — See how algorithms like SHA-256, RSA, and Base64 encoding actually behave with real inputs.
- 📊 **Detail Cards** — Algorithm characteristics, such as output size, key usage, and performance, presented clearly.
- 🎨 **Modern UI** — Smooth animations, elegant typography, and responsive design using Tailwind CSS and Framer Motion.

---

## 🔧 Backend Technologies Used

The backend of CipherHub is built on a robust set of technologies designed for performance, scalability, and seamless interaction with cryptographic operations:

- **Node.js:** A powerful JavaScript runtime environment, serving as the foundation for the server-side application.
- **Express.js:** A fast, minimalist web framework for Node.js, used to build the RESTful API endpoints.
- **C (Custom Implementations):** High-performance, custom-compiled C programs are leveraged for the core cryptographic computations (SHA-256, RSA, Base64). This choice ensures optimal processing speed for computationally intensive tasks.
- **Child Process (Node.js):** This Node.js module is used to execute the external C binaries, facilitating the communication and data exchange between the Node.js server and the C cryptographic programs.
- **Docker:** For containerization of the backend service, ensuring a consistent and isolated environment across development, testing, and production.
- **Docker Compose:** Used in conjunction with Docker to orchestrate and manage the backend service (and frontend) in a multi-container environment, simplifying local setup and testing.

---

## 🧪 Algorithms Covered

- ✅ SHA-256
- ✅ RSA
- ✅ Base64
- 🚧 More coming soon...

Each algorithm includes:
- A rich tabbed explanation (history, definition, usage, etc.)
- An interactive **CodeBlock** component showing real implementations
- A **Details Card** with technical specs

---

## 📁 Project Structure (Simplified)

```
/backend/                       
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

To get CipherHub up and running locally, you have two main options: using **Docker Compose** (recommended for full environment consistency) or running **Frontend and Backend separately**.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/duducamargo/cipherhub.git](https://github.com/duducamargo/cipherhub.git)
    cd cipherhub
    ```

---

### Option 1: Running with Docker Compose (Recommended)

This method ensures a consistent development environment for both Frontend and Backend, compiling C programs and managing dependencies automatically within containers.

1.  **Clean & Prepare (Important for a fresh start):**
    * Ensure Docker Desktop is running on your machine.
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

2.  **Build and Run with Docker Compose:**
    * Navigate to the **root of the `cipherhub` project** (where `docker-compose.yml` is located).
    * Execute the following command to build the Docker images and start the services:
        ```bash
        docker compose up --build --force-recreate
        ```
        This command will:
        -   Build the `frontend` and `backend` Docker images (forcing a fresh build).
        -   Start the Node.js backend server (on `http://localhost:3001`).
        -   Start the React frontend application (on `http://localhost:5173`).

3.  **Access the Application:**
    * Once both services are up (check your terminal logs), open your web browser and go to:
        [http://localhost:5173](http://localhost:5173)

---

### Option 2: Running Frontend and Backend Separately (Without Docker)

This option is suitable if you prefer to manage the environments manually.

#### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically be available at `http://localhost:5173`.

#### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Compile C programs (Linux/macOS):**
    * Ensure you have `gcc` and `make` installed (`build-essential` on Debian/Ubuntu, `Xcode Command Line Tools` on macOS).
    * Navigate to the C source files directory:
        ```bash
        cd src/
        ```
    * Create the output directory:
        ```bash
        mkdir -p output
        ```
    * Compile the C source files:
        ```bash
        gcc base64.c -o output/base64
        gcc rsa.c -o output/rsa -std=gnu99 -lm
        gcc sha256.c -o output/sha256
        ```
    * **(Windows):** If compiling manually on Windows, you'll need MinGW/GCC and the executables will likely be `.exe` (e.g., `rsa.exe`). Ensure your `server.js` `executableExtension` is set to `".exe"` if you compile with `.exe` extensions.
    * Return to the backend root:
        ```bash
        cd ../ # Back to backend/
        ```

4.  **Start the backend server:**
    ```bash
    npm start # Assuming your package.json has a "start" script, otherwise "node server.js"
    ```
    The backend API will typically be available at `http://localhost:3001`.

---

## 📄 License

MIT License. Use freely and contribute!

---

## 🤝 Contributing

Pull requests are welcome! If you have ideas for new algorithms, UI improvements, or educational content, let’s collaborate!

---

Made with ❤️ for learning, security, and elegant design.
