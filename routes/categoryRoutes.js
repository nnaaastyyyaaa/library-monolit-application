const express = require("express");
const router = express.Router();
const categoryController = require("../src/controller/categoryController");

router.get("/", categoryController.getAllCategories);
router.post("/category", categoryController.createCategory);
router.get("/:id", categoryController.getCategory);
router.patch("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
