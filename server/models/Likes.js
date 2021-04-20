const Sequelize = require('sequelize');
const db = require('../config/database');

const Likes = db.define(
  'Likes',
  {
    userId: {
      type: Sequelize.STRING(200),
      required: true,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },
  },
  {
    tableName: 'Likes',
    timestamps: false,
  },
);

module.exports = Likes;
