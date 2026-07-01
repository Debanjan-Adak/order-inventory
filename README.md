# Order Inventory Management

Frontend-only order & inventory management system. No real backend —
data is served locally via `json-server` against `db.json`, and auth
is simulated with a fake JWT stored via Zustand `persist`.

## Stack
- React + Vite
- TanStack Query (server state)
- Zustand (client/auth state)
- React Router
- Formik + Yup (forms/validation)
- Tailwind CSS
- Vitest + React Testing Library + MSW (testing)

## Getting started
```bash
npm install
npm run server   # starts json-server on :4000
npm run dev      # starts vite on :5173
```

## Testing
```bash
npm run test
npm run coverage
```
