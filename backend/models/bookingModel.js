const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: true,
    message: 'You must choose a tour to book',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  price: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name summary startLocation duration imageCover guides',
  }).populate({
    path: 'user',
    select: 'name',
  });

  next();
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
