const express = require("express");
const router = express.Router();
const {
  getAllTablesController,
  createTableController,
  getAllRowsController,
  getRowByIdController,
  createRowController,
  updateRowController,
  deleteRowController,
} = require("./subject.controller");

// Create table route
router.post("/createTable/:subjectName", createTableController);

// CRUD routes
router.get("/:subjectName", getAllRowsController);
router.get("/abc", getAllTablesController);
router.get("/:subjectName/:id", getRowByIdController);
router.post("/:subjectName", createRowController);
router.put("/:subjectName/:id", updateRowController); // Add this line for updating rows
router.delete("/:subjectName/:id", deleteRowController); // Add this line for deleting rows

module.exports = router;
