````markdown
# Project Guide (A–Z)

This project is built with **React + TypeScript + Vite**.  
It uses **json-server** (serving data from `public/db.json`) for development and supports building/previewing in production mode.

---

## 📋 Requirements

- Node.js **18+** (LTS recommended) and npm **9+**  
- Default ports:  
  - Vite: **5173**  
  - JSON Server: **3001**

---

## ⚙️ Environment Setup (Required)

Before running the project, you **must** create a `.env` file in the project root.

Create a new file `.env` with the following content:

```env
VITE_API_URL=http://localhost:3001
````

👉 This variable is required for Axios to know where to fetch data in **dev mode**.
In **prod mode**, the app automatically falls back to static `db.json` in `dist`.

---

## 🔧 Installation

Install dependencies:

```bash
npm install
```

---

## 🖥️ Run in Development

1. Open **two terminals**:

   * **Terminal 1** – start the fake API server:

     ```bash
     json-server --watch public\db.json --port 3001
     ```

   * **Terminal 2** – start the Vite dev server:

     ```bash
     npm run dev
     ```

2. Open in browser:
   👉 [http://localhost:5173](http://localhost:5173)

---

## 📦 Build & Preview (Production)

* Build:

  ```bash
  npm run build
  ```

* Preview after build:

  ```bash
  npm run preview:prod
  ```

The app runs at 👉 [http://localhost:4173](http://localhost:4173)

> In production preview mode, the app reads static data from `dist/db.json` (copied from `public/db.json`).

---

## 📜 Useful Scripts

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start Vite dev server (requires `.env.local`) |
| `npm run build`         | Build TypeScript and bundle with Vite         |
| `npm run preview`       | Preview build (default Vite preview)          |
| `npm run preview:prod`  | Build in prod mode and preview                |
| `npm test`              | Run Jest tests once                           |
| `npm run test:watch`    | Run Jest tests in watch mode                  |
| `npm run test:coverage` | Generate test coverage report                 |
| `npm run lint`          | Run ESLint                                    |

---

## 📡 Mock API (json-server)

* Data file: `public/db.json`

Sample endpoints (GET):

* [http://localhost:3001/posts](http://localhost:3001/posts)
* [http://localhost:3001/users](http://localhost:3001/users)
* [http://localhost:3001/posts/1](http://localhost:3001/posts/1)
* [http://localhost:3001/users/1](http://localhost:3001/users/1)

---

## 🛠️ Troubleshooting

* **Port already in use**: change port in JSON server (e.g., `--port 4000`) and update `VITE_API_URL` in `.env.local`.
* **json-server not installed**: run with `npx json-server ...` (no global install required). To install globally:

  ```bash
  npm i -g json-server
  ```
* **CORS issues**: json-server enables CORS by default. If blocked by proxy/firewall, try another port.
* **Encoding issues (Vietnamese characters)**: save `db.json` as UTF-8 (without BOM).

---

## 📂 Project Structure

```plaintext
WebApplication/
├── public/
│   └── db.json              # Mock database (json-server)
├── src/
│   ├── app/                 # Redux store, hooks, routes, providers
│   ├── components/          # Common UI, layout, icons, UI kit
│   ├── features/            # Business features (auth, post)
│   ├── layouts/             # RootLayout, MainLayout
│   ├── lib/                 # API client (axios), utils
│   ├── pages/               # Page-level components (NewFeed)
│   ├── types/               # Shared TypeScript types
│   ├── App.tsx              # Root app component
│   └── main.tsx             # Application entrypoint
├── index.html               # Base HTML
├── package.json             # Scripts & dependencies
├── tailwind.config.js       # TailwindCSS config
├── vite.config.ts           # Vite config
└── eslint.config.js         # ESLint config
```

---

## 🎉 Final Notes

✅ Always set up `.env.local` before starting the app.
✅ Start **json-server** + **Vite dev server** in parallel.
🚀 Now you’re ready to run DuckFeed!
