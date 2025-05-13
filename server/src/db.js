const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('supermarket', 'root', '190604', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

module.exports = sequelize;
