const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = require('./Post');
const Comment = require('./Comment');

const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      required: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    passwrd: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    profile_picture: {
      type: Sequelize.STRING(200),
    },
  },
  {
    tableName: 'User',
    timestamps: false,
  },
);

// Relations
User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = User;
