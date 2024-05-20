const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/db.helper");

async function createTable(tableName) {
  try {
    const NewTableModel = sequelize.define(
      tableName,
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        question: { type: DataTypes.TEXT, allowNull: false },
        expected_answer: { type: DataTypes.TEXT, allowNull: false },
      },
      { freezeTableName: true }
    );
    await NewTableModel.sync({ force: true });
    return {
      success: true,
      message: `Table ${tableName} created successfully`,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getAllRows(tableName) {
  try {
    const DynamicModel = sequelize.define(tableName, {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      question: { type: DataTypes.TEXT },
      expected_answer: { type: DataTypes.TEXT },
    });
    const rows = await DynamicModel.findAll({
      attributes: ["id", "question", "expected_answer"],
    });
    return { success: true, data: rows };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getRowById(tableName, id) {
  try {
    const DynamicModel = sequelize.define(tableName, {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      question: { type: DataTypes.TEXT },
      expected_answer: { type: DataTypes.TEXT },
    });
    const row = await DynamicModel.findOne({ where: { id } });
    if (!row) {
      return { success: false, error: "Row not found" };
    }
    return { success: true, data: row };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function createRow(tableName, rowData) {
  try {
    const DynamicModel = sequelize.define(
      tableName,
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        question: { type: DataTypes.TEXT, allowNull: false },
        expected_answer: { type: DataTypes.TEXT, allowNull: false },
      },
      {
        timestamps: false, // Exclude timestamps
      }
    );
    const newRow = await DynamicModel.create(rowData);
    console.log("New row ID:", newRow.id); // Print the ID of the new row
    return { success: true, message: "Row created successfully", data: newRow };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updateRow(tableName, id, newData) {
  try {
    const DynamicModel = sequelize.define(
      tableName,
      {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        question: { type: DataTypes.TEXT },
        expected_answer: { type: DataTypes.TEXT },
      },
      {
        timestamps: false, // Exclude timestamps
      }
    );
    const [updatedRowsCount, updatedRows] = await DynamicModel.update(newData, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return { success: false, error: "Row not found" };
    }
    return {
      success: true,
      message: "Row updated successfully",
      data: updatedRows[0],
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteRow(tableName, id) {
  try {
    const DynamicModel = sequelize.define(tableName, {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      question: { type: DataTypes.TEXT },
      expected_answer: { type: DataTypes.TEXT },
    });
    const deletedRowCount = await DynamicModel.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return { success: false, error: "Row not found" };
    }
    return { success: true, message: "Row deleted successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
const getAllTables = (callback) => {
  connection.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'jobprepai' AND table_type = 'BASE TABLE';",
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const tables = result.map((row) => row.table_name);
        callback(null, tables);
      }
    }
  );
};

module.exports = {
  createTable,
  getAllRows,
  getRowById,
  createRow,
  updateRow,
  deleteRow,
  getAllTables,
};
