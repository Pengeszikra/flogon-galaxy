# CORS Setup Instructions

To resolve the CORS issues between the frontend (localhost:5173) and backend (localhost:3000), please follow these steps:

1. Install the required CORS package:
```bash
pnpm add cors
```

2. The server code has been updated with the necessary CORS configuration in `src/services/dbServer.js`:
- Added CORS middleware with appropriate configuration
- Added health check endpoint
- Server is set to listen on port 3000

3. After installing the dependency, restart the server for the changes to take effect.

4. Test the endpoint again with:
```javascript
fetch('http://localhost:3000/api/health').then(r => r.json()).then(console.log)
```

The endpoint should now respond successfully without CORS errors.