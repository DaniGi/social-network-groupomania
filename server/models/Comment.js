const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = db.define(
  'Comment',
  {
    content: {
      type: Sequelize.TEXT,
      required: true,
      allowNull: false,
    },
    UserId: {
      type: Sequelize.STRING(200),
      required: true,
      allowNull: false,
    },
    PostId: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: 'Comment',
    timestamps: false,
  },
);

module.exports = Comment;
