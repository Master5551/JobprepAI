const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/db.helper");

const attributes = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.TEXT, allowNull: false },
  expected_answer: { type: DataTypes.TEXT, allowNull: false },
  timestamp,
};
const options = {
  timestamps: false, // Disable createdAt and updatedAt columns
};
const TableModel = sequelize.define("TableModel", attributes, options);

module.exports = TableModel;
