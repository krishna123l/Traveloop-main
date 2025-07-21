require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const TourModel = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errorClass');

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  // get the tour based on the id
  const tour = await TourModel.findById(req.params.tourId);

  // create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/payment-sucess?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour._id}`,

    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    metadata: {
      tourId: req.params.tourId.toString(),
      userId: req.user._id.toString(),
    },

    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: tour.name,
            description: tour.summary,
            images: [tour.imageCover],
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
  });

  // send the checkout session as a response
  res.status(200).json({
    status: 'sucess',
    session,
  });
});

exports.verifySessionAndCreateBooking = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

  const tourId = new mongoose.Types.ObjectId(session.metadata.tourId);
  const userId = new mongoose.Types.ObjectId(session.metadata.userId);
  const price = session.amount_total / 100;

  const resp = await Booking.create({ tour: tourId, user: userId, price });

  res.status(200).json({
    status: 'sucess',
    session,
  });
});

exports.getUserBookings = catchAsync(async (req, res, next) => {
  console.log('in Bookings');
  const bookings = await Booking.find({ user: req.user._id });
  const totalBookings = await Booking.countDocuments();

  res.status(200).json({
    message: 'sucess',
    totalBookings,
    bookings,
  });
});
