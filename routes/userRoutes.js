const express = require("express");
const router = express.Router();
const userController = require("../src/controller/userController");

router.get("/", userController.getAllUsers);
router.post("/user", userController.createUser);
router.get("/:id", userController.getUser);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
