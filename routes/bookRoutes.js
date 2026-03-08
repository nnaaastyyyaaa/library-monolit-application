const express = require("express");
const router = express.Router();
const bookController = require("../src/controller/bookController");

router.get("/", bookController.getAllBooks);
router.post("/book", bookController.createBook);
router.get("/:id", bookController.getBook);
router.patch("/update/:id", bookController.updateBook);
router.delete("/delete/:id", bookController.deleteBook);

module.exports = router;