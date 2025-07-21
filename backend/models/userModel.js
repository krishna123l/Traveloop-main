const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (cnfPassword) {
        return cnfPassword === this.password;
      },
      message: 'Passwords Do not match',
    },
  },
  passwordResetToken: String,
  passwordResetTokenExpire: Date,
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// instance method
userSchema.methods.comparePasswords = async function (EnteredPassword) {
  return await bcrypt.compare(EnteredPassword, this.password);
};

userSchema.methods.changedPasswordAfterLogin = function (loginTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return loginTimeStamp < passwordChangedTimeStamp;
  }

  return false;
};

userSchema.methods.passwordResetRandomToken = function () {
  // plain reset Token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // hanshed resetToken
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // save the hashed token to the DB
  this.passwordResetToken = hashedToken;
  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;

  // sent the plain reset token to the user
  return resetToken;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
