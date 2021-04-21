const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const Likes = require('../models/Likes');

exports.signup = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.content.password, 10);
    // Hashing email+username to create a not-trivial user ID
    const userHash = await bcrypt.hash(`${req.body.content.email}${req.body.content.username}`, 10);
    const emailHash = crypto.createHash('sha256').update(req.body.content.email).digest('hex');

    User.create({
      email: emailHash,
      id: userHash,
      username: req.body.content.username,
      passwrd: passwordHash,
    })
      .then(() => res.status(201).json({ message: 'Added User' }))
      .catch((err) => res.send(err));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const emailHash = crypto.createHash('sha256').update(req.body.content.email).digest('hex');
    const user = await User.findOne({ where: { email: emailHash } });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    if (!user.is_active) {
      res.status(401).json({ error: 'User account not active' });
      return;
    }

    const isValid = await bcrypt.compare(req.body.content.password, user.passwrd);
    if (!isValid) {
      res.status(401).json({ error: 'Wrong password' });
      return;
    }

    // user likes
    const likes = await Likes.findAll({
      where: { userId: user.id },
      attributes: ['postId'],
    });

    if (!likes) {
      res.status(500).json({ error: "Error finding user's likes" });
      return;
    }

    const userLikes = likes.map((like) => {
      return like.postId;
    });

    res.status(200).json({
      userId: user.id,
      userName: user.username,
      isAdmin: user.is_admin,
      likes: userLikes,
      profilePicture: user.profile_picture,
      token: jwt.sign({ userId: user.id }, process.env.RANDOM_TOKEN_SECRET, { expiresIn: '24h' }),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.verify = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.body.UserId } });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // user likes
    const likes = await Likes.findAll({
      where: { UserId: user.id },
      attributes: ['postId'],
    });

    if (!likes) {
      res.status(500).json({ error: "Error finding user's likes" });
      return;
    }

    const userLikes = likes.map((like) => {
      return like.postId;
    });

    res.status(200).json({
      userName: user.username,
      isAdmin: user.is_admin,
      likes: userLikes,
      profilePicture: user.profile_picture,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// set user.active === 0, NOT deleting user from database, user's posts and user's comments
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.body.UserId } });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    const isValid = await bcrypt.compare(req.body.content.password, user.passwrd);
    if (!isValid) {
      res.status(401).json({ error: 'Wrong password' });
      return;
    }

    // user.active === 0 means user account deleted
    user.is_active = false;
    await user.save();

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.addProfilePicture = async (req, res) => {
  try {
    const content = JSON.parse(req.body.content);

    const user = await User.findOne({ where: { id: content.UserId } });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    user.profile_picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    await user.save();

    res.status(201).json({
      message: 'User updated',
      profile_picture: user.profile_picture,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
