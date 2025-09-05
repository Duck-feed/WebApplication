$ powershell.exe -NoProfile -Command 'apply_patch << '"'"'PATCH'"'"'
*** Begin Patch
*** Update File: README.md
@@
-# React + TypeScript + Vite
-
-This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
-
-Currently, two official plugins are available:
-
-- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
-
-## Expanding the ESLint configuration
-
-If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:
-
-```js
-export default tseslint.config([
-  globalIgnores(['"'"'dist'"'"']),
-  {
-    files: ['"'"'**/*.{ts,tsx}'"'"'],
-    extends: [
-      // Other configs...
-
-      // Remove tseslint.configs.recommended and replace with this
-      ...tseslint.configs.recommendedTypeChecked,
-      // Alternatively, use this for stricter rules
-      ...tseslint.configs.strictTypeChecked,
-      // Optionally, add this for stylistic rules
-      ...tseslint.configs.stylisticTypeChecked,
-
-      // Other configs...
-    ],
-    languageOptions: {
-      parserOptions: {
-        project: ['"'"'./tsconfig.node.json'"'"', '"'"'./tsconfig.app.json'"'"'],
-        tsconfigRootDir: import.meta.dirname,
-      },
-      // other options...
-    },
-  },
-])
-```
-
-You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:
-
-```js
-// eslint.config.js
-import reactX from '"'"'eslint-plugin-react-x'"'"'
-import reactDom from '"'"'eslint-plugin-react-dom'"'"'
-
-export default tseslint.config([
-  globalIgnores(['"'"'dist'"'"']),
-  {
-    files: ['"'"'**/*.{ts,tsx}'"'"'],
-    extends: [
-      // Other configs...
-      // Enable lint rules for React
-      reactX.configs['"'"'recommended-typescript'"'"'],
-      // Enable lint rules for React DOM
-      reactDom.configs.recommended,
-    ],
-    languageOptions: {
-      parserOptions: {
-        project: ['"'"'./tsconfig.node.json'"'"', '"'"'./tsconfig.app.json'"'"'],
-        tsconfigRootDir: import.meta.dirname,
-      },
-      // other options...
-    },
-  },
-])
-```
+# Hướng dẫn chạy dự án (A–Z)
+
+Dự án React + TypeScript + Vite. Hỗ trợ chạy dev với `json-server` (đọc dữ liệu từ `public/db.json`) và build/preview production.
+
+**Mẹo nhanh (Windows CMD):** nếu bạn chỉ muốn chạy nhanh môi trường dev: mở 2 cửa sổ CMD rồi làm 2 lệnh sau (mỗi cửa sổ 1 lệnh):
+
+1) `json-server --watch public\db.json --port 3001`
+
+2) `set VITE_API_URL=http://localhost:3001 && npm run dev` hoặc tạo .env với VITE_API_URL=http://localhost:3001
+
+
+**Yêu Cầu**
+- Node.js 18+ (khuyến nghị LTS) và npm 9+.
+- Cổng mặc định: Vite `5173`, JSON Server `3001`.
+
+**Cài Đặt**
+- Cài dependencies: `npm install`
+
+**Chạy Dev (Windows CMD)**
+- Mở 2 cửa sổ Command Prompt (CMD):
+- Cửa sổ 1 – khởi động API giả lập bằng `json-server` đọc từ `public\db.json`:
+  - `json-server --watch public\db.json --port 3001`
+- Cửa sổ 2 – chạy Vite dev server, trỏ API về JSON server:
+  - `set VITE_API_URL=http://localhost:3001 && npm run dev` hoặc tạo .env với VITE_API_URL=http://localhost:3001 rồi npm run dev
+- Truy cập: `http://localhost:5173`
+
+Ghi chú: biến môi trường `VITE_API_URL` được dùng ở chế độ dev để `axios` gọi tới JSON server. Ở chế độ prod, code sẽ tự đọc dữ liệu tĩnh từ `/db.json` đã được copy vào `dist`.
+
+**Chạy Dev (PowerShell, macOS/Linux – tham khảo)**
+- PowerShell: `$env:VITE_API_URL='"'"'http://localhost:3001'"'"'; npm run dev`
+- macOS/Linux: `VITE_API_URL=http://localhost:3001 npm run dev`
+
+**Tùy Chọn: Dùng file .env**
+- Tạo file `.env.local` tại thư mục gốc với nội dung:
+  - `VITE_API_URL=http://localhost:3001`
+- Sau đó chỉ cần: `npm run dev` (khỏi cần set biến môi trường mỗi lần).
+
+**Build & Preview Production**
+- Build: `npm run build`
+- Preview sau khi build (có sẵn script tối ưu cho prod): `npm run preview:prod`
+- Truy cập: `http://localhost:4173`
+
+Trong chế độ preview prod, ứng dụng sẽ đọc dữ liệu tĩnh từ `dist/db.json` (được copy từ `public/db.json`).
+
+**Scripts Hữu Ích**
+- `npm run dev`: chạy Vite dev server.
+- `npm run build`: build TypeScript và bundle Vite.
+- `npm run preview`: preview build (mặc định của Vite).
+- `npm run preview:prod`: build với cấu hình prod và preview.
+- `npm test`: chạy test Jest một lần.
+- `npm run test:watch`: chạy test chế độ watch.
+- `npm run test:coverage`: báo cáo coverage.
+- `npm run lint`: chạy ESLint.
+
+**API Giả Lập (json-server)**
+- File dữ liệu: `public/db.json`
+- Một số endpoint mẫu (GET):
+  - `http://localhost:3001/posts`
+  - `http://localhost:3001/users`
+  - `http://localhost:3001/posts/1`
+  - `http://localhost:3001/users/1`
+
+**Khắc Phục Sự Cố**
+- Port bận: đổi cổng JSON server, ví dụ `--port 4000`, đồng thời cập nhật `VITE_API_URL` tương ứng.
+- Không có `json-server`: dùng `npx json-server ...` (không cần cài global). Nếu muốn cài global: `npm i -g json-server`.
+- CORS: `json-server` bật sẵn CORS; nếu có proxy/công ty chặn, thử cổng khác.
+- Lỗi encode tiếng Việt trong `db.json`: lưu file dưới dạng UTF-8 (không BOM).
+
+**Cấu Trúc Liên Quan**
+- Cấu hình script: `package.json`
+- Dữ liệu giả lập: `public/db.json`
+- API client: `src/lib/apiClient.ts`
+
+Chúc bạn chạy dự án thành công! Nếu cần, mình có thể thêm script để tự động chạy song song `json-server` và Vite.
*** End Patch
PATCH'
At line:1 char:14
+ apply_patch << 'PATCH'
+              ~
Missing file specification after redirection operator.
At line:1 char:13
+ apply_patch << 'PATCH'
+             ~
The '<' operator is reserved for future use.
At line:1 char:14
+ apply_patch << 'PATCH'
+              ~
The '<' operator is reserved for future use.
At line:4 char:1
+ @@
+ ~
Unrecognized token in source text.
At line:4 char:2
+ @@
+  ~
Unrecognized token in source text.
At line:6 char:2
+ -
+  ~
Missing expression after unary operator '-'.
At line:7 char:1
+ -This template provides a minimal setup to get React working in Vite  ...
+ ~~~~~
Unexpected token '-This' in expression or statement.
At line:7 char:7
+ -This template provides a minimal setup to get React working in Vite  ...
+       ~~~~~~~~
Unexpected token 'template' in expression or statement.
At line:8 char:2
+ -
+  ~
Missing expression after unary operator '-'.
At line:9 char:1
+ -Currently, two official plugins are available:
+ ~~~~~~~~~~
Unexpected token '-Currently' in expression or statement.
Not all parse errors were reported.  Correct the reported errors and try again.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : MissingFileSpecification
 
