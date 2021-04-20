const Sequelize = require('sequelize');

const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Likes = require('../models/Likes');

exports.getAllPosts = async (req, res) => {
  try {
    throw new Error('Error');
    // Get all posts and corresponding userId
    const posts = await Post.findAll({
      attributes: ['id', 'content', 'imageUrl', 'created_at'],
      include: [{ model: User, attributes: ['username', 'profile_picture'] }],
      order: Sequelize.literal('created_at DESC'),
    });

    if (!posts) {
      res.status(500).json({ error: 'Error finding posts' });
      return;
    }

    // Counts comments for each post
    const commentsCounts = await Comment.findAll({
      attributes: ['PostId', [Sequelize.fn('COUNT', 'PostId'), 'count']],
      group: ['PostId'],
    });

    if (!commentsCounts) {
      res.status(500).json({ error: 'Error finding comments counts' });
      return;
    }

    // Counts number of likes
    const likesCounts = await Likes.findAll({
      attributes: ['postId', [Sequelize.fn('COUNT', 'postId'), 'count']],
      group: ['postId'],
    });

    if (!likesCounts) {
      res.status(500).json({ error: 'Error finding likes counts' });
      return;
    }

    // Create easy-to-read post object
    const postsWithCommentsCounts = posts.map((post) => {
      // eslint-disable-next-line no-shadow
      const { id, content, imageUrl, created_at, User } = post.dataValues;
      const commentsCount = commentsCounts.filter((count) => count.dataValues.PostId === post.id);
      const likesCount = likesCounts.filter((likes) => likes.dataValues.postId === post.id);
      return {
        id,
        content,
        imageUrl,
        created_at,
        username: User.dataValues.username,
        profilePicture: User.profile_picture,
        commentsCount: commentsCount.length === 0 ? 0 : commentsCount[0].dataValues.count,
        likesCount: likesCount.length === 0 ? 0 : likesCount[0].dataValues.count,
      };
    });

    res.status(200).json({ posts: postsWithCommentsCounts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.addPost = async (req, res) => {
  try {
    const content = JSON.parse(req.body.content);

    const post = await Post.create({
      content: content.textarea,
      UserId: content.UserId,
      imageUrl: req.file
        ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        : null,
    });

    if (!post) {
      res.status(500).json({ error: 'Error adding post' });
      return;
    }

    await post.reload();

    // Create easy-to-read post object
    const newPost = { ...post.dataValues, commentsCount: 0, likesCount: 0 };

    res.status(201).json({ post: newPost });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      res.status(500).json({ error: 'Error deleting post' });
      return;
    }

    res.status(201).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getPostComments = async (req, res) => {
  try {
    // Get all post comments where postId === :id
    const comments = await Comment.findAll({
      attributes: ['id', 'content', 'created_at', 'PostId'],
      include: [{ model: User, attributes: ['username'] }],
      order: Sequelize.literal('created_at ASC'),
      where: {
        PostId: req.params.id,
      },
    });

    // Create easy-to-read array of comment objects
    const newComments = comments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        username: comment.dataValues.User.username,
        postId: comment.PostId,
      };
    });

    res.status(200).json({ comments: newComments });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const content = JSON.parse(req.body.content);

    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      res.status(500).json({ error: 'Post not found' });
      return;
    }

    post.content = content.textarea;
    if (req.file) {
      post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    await post.save();

    res.status(201).json({
      message: 'Post updated',
      imageUrl: post.imageUrl,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content.textarea,
      UserId: req.body.UserId,
      PostId: req.params.id,
    });

    await comment.reload();

    if (!comment) {
      res.status(500).json({ error: 'Error adding comment' });
      return;
    }

    const user = await User.findOne({
      where: {
        id: comment.UserId,
      },
    });

    if (!user) {
      res.status(500).json({ error: 'Error finding user' });
      return;
    }

    // Create easy-to-read comment object
    const newComment = {
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      username: user.username,
      postId: comment.PostId,
    };

    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateLike = async (req, res) => {
  try {
    if (req.body.content) {
      const like = await Likes.destroy({
        where: {
          postId: req.params.id,
          userId: req.body.UserId,
        },
      });

      if (!like) {
        res.status(500).json({ error: 'Error deleting like' });
        return;
      }

      res.status(201).json({ message: 'Unliked' });
    } else {
      const like = await Likes.create({
        postId: parseInt(req.params.id, 10),
        userId: req.body.UserId,
      });

      if (!like) {
        res.status(500).json({ error: 'Error adding like' });
        return;
      }

      res.status(201).json({ message: 'Liked' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
