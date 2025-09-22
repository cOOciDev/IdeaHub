const mongoose = require('mongoose');

module.exports = async function connectDB () {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not set');
  await mongoose.connect(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000
  });
};
