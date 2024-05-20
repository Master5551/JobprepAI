const { Sequelize } = require("sequelize");
const { MYSQL_DB_CONFIG } = require("../config/db.config");

const sequelize = new Sequelize(
  MYSQL_DB_CONFIG.DB,
  MYSQL_DB_CONFIG.USER,
  MYSQL_DB_CONFIG.PASSWORD,
  {
    host: MYSQL_DB_CONFIG.HOST,
    port: MYSQL_DB_CONFIG.PORT,
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
    timestamp: false,
  }
);

module.exports = sequelize;
