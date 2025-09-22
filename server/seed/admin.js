// Run with: node seed/admin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function run() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI missing in .env');

    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000
    });
    console.log('✅ Connected to Mongo');

    const email = 'admin@example.com';
    const password = 'Admin123!';
    const name = 'Super Admin';

    let user = await User.findOne({ email });
    if (user) {
      console.log(`⚠️ User ${email} already exists (role=${user.role})`);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email,
        passwordHash,
        role: 'admin'
      });
      console.log(`✅ Admin user created: ${email} / ${password}`);
    }
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
