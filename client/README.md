# Separnoavari Client (Vite + React)

## Run
```bash
npm i
npm run dev
```

Set API base:
```
VITE_API_BASE_URL=http://localhost:4000
```

Routes: / (Landing), /tracks, /tracks/:slug, /committee, /submit, /login, /signup, /account
Admin/user gating is stubbed; replace API in `src/services/api.ts` as needed.
