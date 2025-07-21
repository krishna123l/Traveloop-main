const express = require('express');
const {
  signup,
  login,
  forgetPassword,
  passwordReset,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = require('../controller/authController');
const {
  updateUser,
  deleteUser,
  getUsers,
  deleteUserByAdmin,
  getMe,
  getUser,
} = require('../controller/userController');
const upload = require('../utils/multer');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgetPassword', forgetPassword);
router.patch('/resetPassword/:resetToken', passwordReset);

router.use(protect);

router.post('/logout', logout);

router.get('/Me', getMe, getUser);

router.patch('/updatePassword', updatePassword);
router.delete('/deleteUser', deleteUser);
router.delete('/deleteUser/:id', restrictTo('admin'), deleteUserByAdmin);

router.patch('/updateUser', upload.single('photo'), updateUser);

router.route('/getUsers').get(restrictTo('admin'), getUsers);

module.exports = router;
