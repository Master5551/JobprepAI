const {
  createTable,
  getAllRows,
  getRowById,
  createRow,
  updateRow,
  deleteRow,
  getAllTables,
} = require("./subject.service");
const getAllTablesController = (req, res) => {
  tablesService.getAllTables((err, tables) => {
    if (err) {
      console.error("Error retrieving table information:", err);
      res.status(500).json({
        error: "An error occurred while retrieving table information",
      });
    } else {
      res.json({ tables });
    }
  });
};

async function createTableController(req, res) {
  try {
    const { subjectName } = req.params;
    if (!subjectName) {
      return res.status(400).json({ error: "Subject name is required" });
    }
    const result = await createTable(subjectName);
    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllRowsController(req, res) {
  const { subjectName } = req.params;
  const result = await getAllRows(subjectName);
  if (result.success) {
    res.status(200).json({ data: result.data });
  } else {
    res.status(500).json({ error: result.error });
  }
}

async function getRowByIdController(req, res) {
  const { subjectName, id } = req.params;
  const result = await getRowById(subjectName, id);
  if (result.success) {
    res.status(200).json({ data: result.data });
  } else {
    res.status(404).json({ error: result.error });
  }
}

async function createRowController(req, res) {
  const { subjectName } = req.params;
  const rowData = req.body;
  const result = await createRow(subjectName, rowData);
  if (result.success) {
    res.status(201).json({ message: result.message, data: result.data });
  } else {
    res.status(500).json({ error: result.error });
  }
}

async function updateRowController(req, res) {
  const { subjectName, id } = req.params;
  const newData = req.body;
  const result = await updateRow(subjectName, id, newData);
  if (result.success) {
    res.status(200).json({ message: result.message, data: result.data });
  } else {
    res.status(404).json({ error: result.error });
  }
}

async function deleteRowController(req, res) {
  const { subjectName, id } = req.params;
  const result = await deleteRow(subjectName, id);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(404).json({ error: result.error });
  }
}

module.exports = {
  getAllTablesController,
  createTableController,
  getAllRowsController,
  getRowByIdController,
  createRowController,
  updateRowController,
  deleteRowController,
};
