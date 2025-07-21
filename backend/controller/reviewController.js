const { default: mongoose } = require('mongoose');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const {
  deleteOne,
  createOne,
  getAllDocuments,
  updateOne,
  getOne,
} = require('./handelerFactory');

exports.getAllReviews = getAllDocuments(Review);

exports.TourAndUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.Id;
  next();
};

exports.gerReview = getOne(Review);
exports.postReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);

exports.avgRatings = catchAsync(async (req, res) => {
  
  const tourAvgRating = await Review.aggregate([
    {
      $match: { tour: new mongoose.Types.ObjectId(req.params.id) },
    },
    {
      $group: {
        _id: '$tour',
        numReviews: { $sum: 1 },
        avgReviewRating: { $avg: '$rating' },
      },
    },
  ]);

  
  res.status(200).json({
    status: 'sucess',
    data: tourAvgRating,
  });
});
