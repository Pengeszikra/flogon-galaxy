# Server and Client Setup

To start both the server and client together, run:

```bash
pnpm run dev
```

This will:
1. Start the Express server (backend) running on its default port
2. Start the Vite development server (frontend)

Both services will run concurrently using the `&` operator in the npm script.

You can also run them separately using:
- `pnpm start` - for the client only
- `pnpm run server` - for the server only