const express = require('express');
const {
  createCheckoutSession,
  verifySessionAndCreateBooking,
  getUserBookings,
} = require('../controller/bookingController');
const { protect } = require('../controller/authController');

const router = express.Router();

router.use(protect);

router.post('/checkout-session/:tourId', createCheckoutSession);
router.get('/verify-session/:sessionId', verifySessionAndCreateBooking);

router.get('/user', getUserBookings);

module.exports = router;