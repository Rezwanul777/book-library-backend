import mongoose from 'mongoose';
import config from './config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('✅ Database is connected');

    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (error: any) {
    console.error('❌ DB Connection failed:', error.message);
  }
}

main();