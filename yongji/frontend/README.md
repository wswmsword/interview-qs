# E-commerce PDP (Product Detail Page)

React + TypeScript + Vite demo: product detail with **two variant dimensions** (color + size), **quantity** limits tied to SKU stock, **mock product-detail** and **add-to-cart** APIs, plus loading / error / out-of-stock handling.

## Prerequisites

- **Node.js 20.19+** or **22.12+** (required by Vite 8; run `node -v` to check)

## Setup

```bash
cd frontend
npm install
```

## Run (development)

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Mock API error (optional)

Append `?failProduct=1` to the URL to simulate a failed product-detail request and exercise the error UI (remove the query and retry).

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Stack

- [Vite](https://vitejs.dev/) — bundler & dev server
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Button)
