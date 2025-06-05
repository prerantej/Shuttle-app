const User = require('../models/User');
const Shuttle = require('../models/Shuttle');
const Booking = require('../models/Booking');

exports.bookShuttle = async (req, res) => {
  const studentId = req.user.id;
  const { shuttleId } = req.body;

  const student = await User.findById(studentId);
  const shuttle = await Shuttle.findById(shuttleId);
  if (!shuttle) return res.status(404).json({ message: 'Shuttle not found' });

  if (student.walletPoints < shuttle.fare) {
    return res.status(400).json({ message: 'Insufficient wallet points' });
  }

  // Deduct fare
  student.walletPoints -= shuttle.fare;
  await student.save();

  // Save booking
  const booking = new Booking({
    student: student._id,
    shuttle: shuttle._id,
    fare: shuttle.fare
  });
  await booking.save();

  res.status(201).json({ message: 'Booking successful', booking });
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ student: req.user.id }).populate('shuttle');
  res.json(bookings);
};
