const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcRatingsAvg = async function (tourId) {
  const totalDocAndAvgRating = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        totalReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
    {
      $project: {
        avgRatingRounded: { $round: ['$avgRating', 1] },
        totalReviews: 1,
      },
    },
  ]);

  console.log(totalDocAndAvgRating);
  
  if (totalDocAndAvgRating) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: totalDocAndAvgRating[0].avgRatingRounded,
      ratingsQuantity: totalDocAndAvgRating[0].totalReviews,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcRatingsAvg(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.model.findOne(this.getFilter());
  next();
});

reviewSchema.post(/^findOneAnd/, function () {
  // console.log(this);
  this.review.constructor.calcRatingsAvg(this.review.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
