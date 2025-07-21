const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      unique: true,
      minlength: [10, 'Name length must be above 10'],
      maxlength: [90, 'Name length does not exceed 50'],
    },
    slug: String,
    duration: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Values must be either: easy, difficulty, Medium',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be at least 1'],
      max: [5, 'rating must noot exceed 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount Price ({VALUE}) must be less than actual price',
      },
    },
    startLocation: {
      description: String,
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        description: String,
        day: Number,
      },
    ],
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageCover: String,
    images: [String],
    startDates: [Date],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    secretTour: {
      type: Boolean,
      default: false,
      select: false,
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
      },
    },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.index({ price: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// Document Middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function (next) {
//   const guidePromises = this.guides.map(async (id) => await User.findById(id));
//   const guides = await Promise.all(guidePromises);
//   this.guides = guides;
//   next();
// });

// query middleware

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

tourSchema.pre('findOneAndDelete', async function (next) {
  const Review = require('./reviewModel');
  const tour = await this.model.findOne(this.getFilter());

  if (tour) {
    await Review.deleteMany({ tour: tour._id });
  }
  next();
});

// aggregation pipeline(logs aggeregation middlewares logs in the order they are difined in the controller)
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

// this gives the second aggregation function that we are defined in the controller
tourSchema.pre('aggregate', function (next) {
  next();
});

const TourModel = mongoose.model('Tour', tourSchema);

module.exports = TourModel;
