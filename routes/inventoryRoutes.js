const express = require("express");
const router = express.Router();
const bookController = require("../src/controller/inventoryController");

router.get("/", inventoryController.getAllInventory);
router.post("/inventory", inventoryController.createInventory);
router.get("/:id", inventoryController.getInventory);
router.patch("/update/:id", inventoryController.updateInventory);
router.delete("/delete/:id", inventoryController.deleteInventory);

module.exports = router;