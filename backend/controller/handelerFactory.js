const APIfectures = require('../utils/ApiFectures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errorClass');

exports.getAllDocuments = (Model) =>
  catchAsync(async (req, res) => {
    let filters = {};
    if (req.params.tourId) filters.tour = req.params.tourId;

    const totalDocs = await Model.countDocuments();
    const limit = req.query.limit || 3;
    const fectures = new APIfectures(Model.find(filters), req.query)
      .filter()
      .sorting()
      .limiting()
      .paginate();

    const doc = await fectures.query;

    res.status(200).json({
      status: 'sucess',
      results: doc.length,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('document not Found', 404));
    }

    res.status(200).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError('No document found with that Id', 404));
    }

    res.status(202).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('Document not Found', 404));
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that Id', 404));
    }

    res.status(204).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });
