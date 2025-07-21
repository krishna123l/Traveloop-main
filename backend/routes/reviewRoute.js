const express = require('express');
const {
  getAllReviews,
  postReview,
  deleteReview,
  TourAndUserId,
  updateReview,
  avgRatings,
} = require('../controller/reviewController');
const { protect, restrictTo } = require('../controller/authController');

const Router = express.Router({ mergeParams: true });

// to post the reviews without asking the user about the userId and the TourId
// post : tour/tourId/reviews
// Get : tour/tourId/reviews

Router.route('/')
  .get(protect, restrictTo('user'), getAllReviews)
  .post(protect, restrictTo('user'), TourAndUserId, postReview);

Router.route('/:id')
  .get(avgRatings)
  .patch(protect, restrictTo('user'), updateReview)
  .delete(protect, restrictTo('user'), deleteReview);

module.exports = Router;
