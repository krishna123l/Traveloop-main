const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  tourStats,
  Practice,
  monthlyTours,
  avgRatings,
  getToursWithin,
  getDistances,
} = require('../controller/tourController');
const { protect, restrictTo } = require('../controller/authController');
const reviewRoute = require('./reviewRoute');


const router = express.Router();

router.use('/:tourId/reviews', reviewRoute);

router.route('/monthly-tours/:year').get(monthlyTours);
router.route('/tour-stats').get(tourStats);

// tours/tours-within/:distance/center/:latlan/units/:mi
// tours/tours-within/200/center/23,-49/units/mi

router
  .route('/tours-within/:distance/center/:latlon/units/:units')
  .get(getToursWithin);

router.route('/getDistances/center/:latlon/units/:units').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide', 'user'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, deleteTour);

module.exports = router;
