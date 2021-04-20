const express = require('express');

const router = express.Router();
const multer = require('../middleware/multerConfig');

const userController = require('../controllers/user');

const auth = require('../middleware/auth');
const {
  userValidationRules,
  validate,
  validateUserProfilePicture,
} = require('../middleware/validator');

router.post('/login', userController.login);

router.post('/signup', userValidationRules(), validate, userController.signup);

router.post('/verify', auth, userController.verify);

router.delete('/:id', auth, userController.deleteUser);

router.post('/picture', auth, multer, validateUserProfilePicture, userController.addProfilePicture);

module.exports = router;
