const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports = function verifyUserRole(model) {
  const itemModel = model === 'Post' ? Post : Comment;
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
      const { userId } = decodedToken;

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        res.status(500).json({ error: 'Error finding user' });
        return;
      }

      const item = await itemModel.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!item) {
        res.status(500).json({ error: `Error finding ${model}` });
        return;
      }

      if (user.is_admin || item.UserId === user.id) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden acces to this resource' });
        return;
      }
    } catch {
      res.status(401).json({
        error: 'User role error',
      });
    }
  };
};
