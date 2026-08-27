# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Octofit Tracker frontend

React 19 presentation tier for the Octofit Tracker API.

## Environment

Codespaces deployments must define `VITE_CODESPACE_NAME` in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then calls `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/.../`.
When the variable is unset, it safely falls back to `http://localhost:8000`.

## Development

```bash
npm run dev
```
