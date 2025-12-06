import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import db from './config/database.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API endpoint: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}


process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await db.destroy();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await db.destroy();
  process.exit(0);
});

startServer();