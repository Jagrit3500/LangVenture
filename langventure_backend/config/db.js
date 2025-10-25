const mongoose = require('mongoose');

// Connect to MongoDB with timeout and retry options
const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n⚠️  IMPORTANT: If using MongoDB Atlas, make sure to whitelist Replit IPs:');
    console.error('   1. Go to MongoDB Atlas → Security → Network Access');
    console.error('   2. Add IP Address: 0.0.0.0/0');
    console.error('   3. Comment: "Replit - Dynamic IPs"\n');
    console.error('⚡ Server will continue running, but database routes will fail.\n');
    return false;
  }
};

module.exports = connectDB;
