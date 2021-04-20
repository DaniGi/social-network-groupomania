const Comment = require('../models/Comment');

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!comment) {
      res.status(500).json({ error: 'Error deleting comment' });
      return;
    }

    res.status(201).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const content = JSON.parse(req.body.content);

    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!comment) {
      res.status(500).json({ error: 'Comment not found' });
      return;
    }

    comment.content = content.textarea;
    await comment.save();

    res.status(201).json({ message: 'Comment updated' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
