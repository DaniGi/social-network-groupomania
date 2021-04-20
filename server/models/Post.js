const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = db.define(
  'Post',
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
    imageUrl: {
      type: Sequelize.STRING(200),
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: 'Post',
    timestamps: false,
  },
);

module.exports = Post;
