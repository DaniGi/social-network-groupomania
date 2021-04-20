const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts');

const auth = require('../middleware/auth');
const verifyUserRole = require('../middleware/verifyUserRole');
const multer = require('../middleware/multerConfig');
const { validateFile } = require('../middleware/validator');

router.post('/', auth, multer, validateFile, postsController.addPost);
router.get('/', auth, postsController.getAllPosts);

// get all comments for post where post.id === :id
router.get('/:id/comments', auth, postsController.getPostComments);

// add comment to post where post.id === :id
router.post('/:id/comments', auth, postsController.addComment);

// router.get('/:id', auth, postsController.getOneSauce);
router.put('/:id', auth, verifyUserRole('Post'), multer, validateFile, postsController.updatePost);
router.delete('/:id', auth, verifyUserRole('Post'), postsController.deletePost);

router.post('/:id/likes', auth, postsController.updateLike);

module.exports = router;
