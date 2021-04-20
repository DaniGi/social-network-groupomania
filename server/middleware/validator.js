const { body, validationResult } = require('express-validator');

const MIN_PSSWRD_LENGTH = 8;
const MAX_PSSWRD_LENGTH = 50;
const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 15;

const POST_FILE_SUPPORTED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];
const USER_PROFILE_PICTURE_SUPPORTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Post file validation
const validateFile = (req, res, next) => {
  if (req.file && !POST_FILE_SUPPORTED_TYPES.includes(req.file.mimetype)) {
    res.status(422).json({
      error: 'File format not supported. Try with an image.',
    });
    return;
  }
  next();
};

// User profile picture validation
const validateUserProfilePicture = (req, res, next) => {
  if (req.file && !USER_PROFILE_PICTURE_SUPPORTED_TYPES.includes(req.file.mimetype)) {
    res.status(422).json({
      error: 'File format not supported. Try with an image.',
    });
    return;
  }
  next();
};

// User sig up validation
const userValidationRules = () => {
  return [
    body('content.email')
      .isEmail()
      .matches(/[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}/),
    body('content.password')
      .isLength({ min: MIN_PSSWRD_LENGTH, max: MAX_PSSWRD_LENGTH })
      .matches(/^\S*$/),
    body('content.username')
      .isLength({ min: MIN_USERNAME_LENGTH, max: MAX_USERNAME_LENGTH })
      .matches(/^\S*$/),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
  validateFile,
  validateUserProfilePicture,
};
