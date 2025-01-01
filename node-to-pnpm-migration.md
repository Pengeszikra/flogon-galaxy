# Node to PNPM/Vite Migration Guide

The original command `node src/services/dbServer.js` has been replaced with two alternatives in `package.json`:

1. Using PNPM:
   ```bash
   pnpm run server
   ```
   This uses the script: `"server": "pnpm node src/services/dbServer.js"`

2. Using Vite:
   ```bash
   pnpm run dev:server
   ```
   This uses the script: `"dev:server": "vite serve src/services/dbServer.js"`

The Vite version (`dev:server`) is recommended for development as it provides features like hot module reloading and better development experience. The PNPM version (`server`) can be used for production-like environments.

To use these new commands:
1. Ensure you have PNPM installed globally
2. Run `pnpm install` to install dependencies
3. Choose either `pnpm run server` or `pnpm run dev:server` to start the database server