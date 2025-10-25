require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Checking MongoDB Connection...\n');
console.log('📍 Connection String:', process.env.MONGO_URI?.substring(0, 30) + '...');

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
.then((conn) => {
  console.log('\n✅ SUCCESS! MongoDB Connected to:', conn.connection.host);
  console.log('✅ Database:', conn.connection.name);
  console.log('\n🎉 Your MongoDB is working! You can now run:');
  console.log('   npm run seed');
  console.log('   npm run dev\n');
  process.exit(0);
})
.catch((error) => {
  console.log('\n❌ FAILED! MongoDB Connection Error\n');
  console.log('Error:', error.message);
  console.log('\n📋 SOLUTION: Whitelist Replit IPs in MongoDB Atlas');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n1️⃣  Go to: https://cloud.mongodb.com/');
  console.log('2️⃣  Navigate to: Security → Network Access');
  console.log('3️⃣  Click: "Add IP Address"');
  console.log('4️⃣  Enter: 0.0.0.0/0');
  console.log('5️⃣  Comment: "Replit - Dynamic IPs"');
  console.log('6️⃣  Click: "Confirm"');
  console.log('\n💡 Why 0.0.0.0/0?');
  console.log('   - Replit uses dynamic IPs that change frequently');
  console.log('   - Your database is still protected by username/password');
  console.log('   - This is the standard approach for Replit + MongoDB Atlas\n');
  console.log('🔄 After whitelisting, run this script again: node check-mongodb.js\n');
  process.exit(1);
});
