const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');

const auth = require('../middleware/auth');
const verifyUserRole = require('../middleware/verifyUserRole');
const multer = require('../middleware/multerConfig');

router.put('/:id', auth, verifyUserRole('Comment'), multer, commentsController.updateComment);
router.delete('/:id', auth, verifyUserRole('Comment'), commentsController.deleteComment);

module.exports = router;
