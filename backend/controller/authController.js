const crypto = require('crypto');
const { findById } = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errorClass');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/resetEmail');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    HttpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.status(statusCode).json({
    status: 'sucess',
    token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('email or password are required', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePasswords(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = req.cookies.jwt;
  }

  // check if token exists or not
  if (!token) {
    return next(
      new AppError('you are not logged in! please login to continue', 401)
    );
  }

  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // check if user still exists with that ID
  const currUser = await User.findById(decoded.id);
  if (!currUser) {
    return next(new AppError('UserName not found', 400));
  }

  if (await currUser.changedPasswordAfterLogin(decoded.iat)) {
    return next(
      new AppError('recently password is changed!, please login again')
    );
  }

  req.user = currUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have a permission to perform this action")
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // get the user bases on email posted via forgetpassword post route
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('User does not exist with that email!'));
  }

  // generate a random token using crypto
  const token = user.passwordResetRandomToken();
  await user.save({ validateBeforeSave: false });

  // generate a url with the token
  const resetUrlBackend = `${req.protocol}://${req.get(
    'host'
  )}/users/resetPassword/${token}`;

  const ResetUrlFrontend = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const message = `forget your password ? Click on the link change your password ${ResetUrlFrontend}`;

  const options = {
    email: user.email,
    subject: 'Reset Password (Token valid for 10 minutes)',
    message,
  };

  try {
    await sendEmail(options);
    res.status(200).json({
      status: 'sucess',
      message: 'Token sent to Email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending email! Try again later'),
      500
    );
  }
});

exports.passwordReset = catchAsync(async (req, res, next) => {
  // get the token from the user and hash it
  const token = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  // find the user by the hashed token
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Token is invalied or expired! try again', 400));
  }

  // if user found update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  await user.save();
  // update the chagePasswordAt field through middleware

  // log the user in send JWT
  const jwtToken = signToken(user.id);
  res.status(200).json({
    status: 'sucess',
    token: jwtToken,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // get the logeed in user
  const currUser = await User.findById(req.user.id).select('+password');

  // comare the old password
  if (!(await currUser.comparePasswords(req.body.oldPassword))) {
    return next(new AppError('Your current password is wrong!', 401));
  }

  // if old password is correct, update it
  currUser.password = req.body.password;
  currUser.passwordConfirm = req.body.passwordConfirm;
  await currUser.save();

  const jwtToken = signToken(currUser.id);
  res.status(200).json({
    status: 'sucess',
    token: jwtToken,
  });
});

exports.logout = catchAsync((req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).json({
    status: 'sucess',
    message: 'Logout sucessfully',
  });
});
