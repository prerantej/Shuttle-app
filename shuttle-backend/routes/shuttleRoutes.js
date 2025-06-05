const express = require('express');
const Shuttle = require('../models/Shuttle');
const auth = require('../middleware/auth');

const router = express.Router();

// 🔐 Create a new shuttle (admin only)
router.post('/create', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can create shuttles' });
  }

  try {
    const shuttle = new Shuttle(req.body);
    await shuttle.save();
    res.status(201).json(shuttle);
  } catch (err) {
    res.status(500).json({ message: 'Error creating shuttle', error: err.message });
  }
});

// 🧾 List all shuttles (students can view to pick one)
router.get('/all', auth, async (req, res) => {
  const shuttles = await Shuttle.find({});
  res.json(shuttles);
});

module.exports = router;
