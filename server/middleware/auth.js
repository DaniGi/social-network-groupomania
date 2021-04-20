const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('Invalid user ID');
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error(`Auth error: ${error}`),
    });
  }
};
