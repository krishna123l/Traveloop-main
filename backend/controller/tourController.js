const Review = require('../models/reviewModel');
const APIfectures = require('../utils/ApiFectures');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/errorClass');
const {
  deleteOne,
  createOne,
  getAllDocuments,
  getOne,
  updateOne,
} = require('./handelerFactory');

const getAllTours = getAllDocuments(Tour);
const getTour = getOne(Tour, {
  path: 'reviews',
  select: '-__v ',
});
const createTour = createOne(Tour);
const updateTour = updateOne(Tour);
const deleteTour = deleteOne(Tour);

const tourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    { $match: { price: { $gte: 800 } } },
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        totalRatingsAverage: { $avg: '$ratingsAverage' },
        totalRatings: { $sum: '$ratingsQuantity' },
        AveragePrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { AveragePrice: 1 } },
  ]);

  res.status(200).json({
    status: 'sucess',
    totalDocuments: stats.length,
    data: {
      stats,
    },
  });
});

const Practice = catchAsync(async (req, res) => {
  const prac = await Tour.aggregate([
    {
      $group: {
        _id: '$difficulty',
        maxRatingsAverage: { $avg: '$ratingsAverage' },
        avgDuration: { $avg: '$duration' },
      },
    },
  ]);

  res.status(200).json({
    status: 'sucess',
    totalDoc: prac.length,
    data: {
      prac,
    },
  });
});

const monthlyTours = catchAsync(async (req, res) => {
  const year = req.params.year * 1;

  const totalMonthlyTours = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        totalTours: { $sum: 1 },
        tourNames: { $push: '$name' },
      },
    },
    {
      $sort: { totalTours: -1 },
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
  ]);

  res.status(200).json({
    status: 'sucess',
    totalDocs: totalMonthlyTours.length,
    message: {
      data: totalMonthlyTours,
    },
  });
});

// get the tours based on the  radius on a given point
// distance // latitute&longitude // units (mi, km)

// tours/tours-within/:distance/center/:latlan/units/:units
// tours/tours-within/200/center/23,-49/units/mi

const getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlon, units } = req.params;
  const [lat, lon] = latlon.split(',');

  const radiants = units === 'mi' ? distance / 3959 : distance / 6371;

  if (!lat || !lon) {
    return next(new AppError('Please provide your current location', 400));
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lon, lat], radiants] } },
  });

  res.status(200).json({
    message: 'sucess',
    totalDoc: tours.length,
    data: {
      tours,
    },
  });
});

// tourDistances/center/:latlon/units/:units

const getDistances = catchAsync(async (req, res) => {
  const { latlon, units } = req.params;
  const [lat, lon] = latlon.split(',');

  const multiplier = units === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lon) {
    return next(new AppError('please enter your location', 400));
  }

  const tours = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lon * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        name: 1,
        distance: { $round: ['$distance', 1] },
      },
    },
  ]);

  res.status(200).json({
    message: 'sucess',
    docLength: tours.length,
    data: tours,
  });
});

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  tourStats,
  Practice,
  monthlyTours,
  getToursWithin,
  getDistances,
};
