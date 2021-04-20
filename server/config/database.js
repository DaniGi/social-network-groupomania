const Sequelize = require('sequelize');

module.exports = new Sequelize('groupomania', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});
