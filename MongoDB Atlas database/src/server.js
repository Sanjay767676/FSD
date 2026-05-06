import app from './app.js';
import { connectToDatabase } from './config/database.js';

const PORT = process.env.PORT || 5000;

async function start() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`MongoDB Atlas API running on port ${PORT}`);
  });
}

start();