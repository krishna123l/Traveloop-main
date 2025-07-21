const express = require('express');
const qs = require('qs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');
const reviewRouter = require('./routes/reviewRoute');
const AppError = require('./utils/errorClass');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const GlobalErrorController = require('./controller/errorController');
const cors = require('cors');

const app = express();

app.set('query parser', (str) => qs.parse(str));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const allowedOrigins = [
  'https://traveloop-tan.vercel.app',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS error for: ' + origin));
      }
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  max: 5,
  windowMs: 30 * 60 * 1000,
  message: 'Too many attempts! try again after 30 minutes',
  keyGenerator: (req, res) => {
    return req.ip + req.body?.email;
  },
  skipSuccessfulRequests: true,
  handler: (req, res, next, options) => {
    res.status(429).json({
      status: 'fail',
      message: options.message,
    });
  },
});

app.use('/users/login', limiter);

app.use(express.json());
app.use(cookieParser());

app.use('/tours', tourRouter);
app.use('/users', userRouter);
app.use('/tour/bookings', bookingRouter);
app.use('/reviews', reviewRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`the route ${req.originalUrl} is not found`, 404));
});

app.use(GlobalErrorController);

module.exports = app;
