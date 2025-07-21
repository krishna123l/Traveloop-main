const { findById, findByIdAndDelete } = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errorClass');
const { deleteOne, getAllDocuments, getOne } = require('./handelerFactory');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const filterObj = (Original, ...filterOptions) => {
  const objKeys = Object.keys(Original);
  let newObj = {};
  objKeys.map((option) => {
    if (filterOptions.includes(option))
      return (newObj[option] = Original[option]);
  });

  return newObj;
};

exports.updateUser = catchAsync(async (req, res, next) => {
  let photo;
  if (req.file) {
    photo = req.file.path;
  }

  if (!req.user || !req.user.id) {
    return next(new AppError('User not authenticated', 401));
  }

  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "You can't change password on this route! please use /updatePassword route to update the password",
        400
      )
    );

  const filteredObject = filterObj(req.body, 'email', 'name');

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { ...filteredObject, photo },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(user);

  res.status(200).json({
    status: 'sucess',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      active: false,
    },
    {
      new: true,
    }
  ).select('+active');

  console.log(user);

  res.status(200).json({
    status: 'sucess',
  });
});

exports.getUsers = getAllDocuments(User);
exports.getUser = getOne(User);
exports.deleteUserByAdmin = deleteOne(User);
