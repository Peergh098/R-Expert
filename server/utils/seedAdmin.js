require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ role: 'admin' });
    if (existing) {
      console.log('✅ Admin already exists:', existing.email);
      process.exit(0);
    }

    const admin = new User({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@researchexperts.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin user created!');
    console.log('   Email:', admin.email);
    console.log('   Password:', process.env.ADMIN_PASSWORD || 'Admin@123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedAdmin();
