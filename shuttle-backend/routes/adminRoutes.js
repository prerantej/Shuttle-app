const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

// ✅ List all students (already done)
router.get('/students', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can access this' });
  }

  const students = await User.find({ role: 'student' }).select('_id name email walletPoints');
  res.json(students);
});

// ✅ Get all bookings in the system
router.get('/bookings', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can access this' });
  }

  const bookings = await Booking.find().populate('student', 'name email').populate('shuttle', 'name fare');
  res.json(bookings);
});

// ✅ Get bookings for a specific student by ID
router.get('/student/:id/bookings', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can access this' });
  }

  const bookings = await Booking.find({ student: req.params.id }).populate('shuttle', 'name fare time');
  res.json(bookings);
});

// 🧮 (Optional) Get total booking count and revenue
router.get('/stats', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can access this' });
  }

  const totalBookings = await Booking.countDocuments();
  const totalRevenue = await Booking.aggregate([
    { $group: { _id: null, total: { $sum: "$fare" } } }
  ]);

  res.json({
    totalBookings,
    totalRevenue: totalRevenue[0]?.total || 0
  });
});

module.exports = router;
  