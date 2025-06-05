const express = require('express');
const { bookShuttle, getMyBookings } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/book', auth, bookShuttle);           // student books a shuttle
router.get('/my', auth, getMyBookings);            // view past trips

module.exports = router;
