const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  walletPoints: { type: Number, default: 0 } // 🆕 Wallet field
});

module.exports = mongoose.model('User', userSchema);
