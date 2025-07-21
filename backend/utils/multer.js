const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user-profiles',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

module.exports = upload;
