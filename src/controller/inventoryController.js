const inventoryService = require("../service/inventoryService");

exports.getAllInventory = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const inventory = await inventoryService.getAllInventory(page, limit);
    res.json(inventory);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.createInventory(req.body);
    res.status(201).json({ "Created inventory": inventory });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getInventory(req.params.id);
    res.json(inventory);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const updatedInventory = await inventoryService.updateInventory(req.params.id, req.body);
    res.json({ "Updated inventory": updatedInventory });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    await inventoryService.deleteInventory(req.params.id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};