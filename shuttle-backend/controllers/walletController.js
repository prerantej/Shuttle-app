const User = require('../models/User');

exports.getWalletBalance = async (req, res) => {
  const user = await User.findById(req.user.id).select('walletPoints name email');
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ balance: user.walletPoints });
};

exports.rechargeWallet = async (req, res) => {
  const { studentId, amount } = req.body;

  // Only admin can recharge others
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can recharge wallets' });
  }

  const student = await User.findById(studentId);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  student.walletPoints += Number(amount);
  await student.save();

  res.json({ message: 'Wallet recharged', newBalance: student.walletPoints });
};
