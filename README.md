# WebApplication – Getting Started A to Z

Frontend project built with **React 19**, **TypeScript**, and **Vite**. The UI layer uses Tailwind CSS, state is managed with Redux Toolkit, and Jest/Testing Library covers automated tests. This guide walks you through installing, running, testing, and building the app from scratch.

## 1. System requirements
- Node.js **20.x LTS** or newer (consider [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage versions)
- npm **10.x** or newer (ships with Node.js)
- A modern browser (Chrome, Edge, Firefox, Safari) to verify the UI

## 2. Initial setup
1. **Clone or download the repository**
   ```bash
   git clone YOUR_REPO_URL
   cd WebApplication
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```

## 3. Configure environment variables
Create a `.env` file in the project root (alongside `package.json`) and define the backend base URL:

```env
VITE_API_URL=http://localhost:5186/api
```

`VITE_API_URL` should point at the API server that exposes endpoints such as `/users/auth/login`, `/posts`, and `/posts/{id}/like`. Adjust the value to match your backend environment (development, staging, production, etc.).

## 4. Run the development server
```bash
npm run dev
```
- Vite serves the app at http://localhost:5173 by default.
- To allow LAN access, forward the hostname:
  ```bash
  npm run dev -- --host
  ```

## 5. Quality checks
- **Unit tests (one-off)**: `npm test`
- **Watch mode**: `npm run test:watch`
- **Coverage report**: `npm run test:coverage`
- **Lint**: `npm run lint`
- **Format code (Prettier + sort imports)**:
  ```bash
  npm run format
  ```

## 6. Build and preview production output
1. **Build the project**
   ```bash
   npm run build
   ```
2. **Preview locally**
   ```bash
   npm run preview
   ```
   or use the script that forces `VITE_API_URL=/` during the build:
   ```bash
   npm run preview:prod
   ```
   The preview server listens at http://localhost:4173.

## 7. Environment customization & CI/CD tips
- Provide environment-specific `.env.*` files (for example `.env.production`) or set `VITE_API_URL` via system environment variables before running `npm run build`.
- In CI/CD pipelines, run `npm ci` (or `npm install`), followed by `npm run build`. Add `npm test` and `npm run lint` steps based on your quality gates.

## 8. Project structure (high level)
```plaintext
WebApplication/
├── public/                # Static assets (favicon, db.json sample, ...)
├── src/
│   ├── app/               # Routing, providers, Redux store setup
│   ├── components/        # Reusable UI building blocks
│   ├── features/          # Feature modules (auth, post, ...)
│   ├── layouts/           # Shared layouts
│   ├── lib/               # API client and utilities
│   ├── pages/             # Route-level screens
│   └── index.css          # Tailwind entry point & global styles
├── package.json           # Scripts & dependencies
├── tsconfig*.json         # TypeScript configurations
├── vite.config.ts         # Vite setup and `@` alias resolution
└── README.md              # This documentation
```

## 9. Troubleshooting
- **Invalid `VITE_API_URL` or backend offline**: requests return 4xx/5xx; check the browser console and ensure the API is reachable.
- **Port 5173 already in use**: start Vite on another port with `npm run dev -- --port 5174`.
- **Write-permission errors**: run your terminal with appropriate permissions or work inside a writable directory.
- **TypeScript/ESLint failures**: run `npm run lint` or `npm run build` to inspect errors and follow the guidance shown in the console.

Happy building! 🚀
