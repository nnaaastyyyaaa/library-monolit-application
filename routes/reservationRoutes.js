const express = require("express");
const router = express.Router();
const bookController = require("../src/controller/reservationController");

router.get("/", bookController.getAllReservations);
router.post("/reservation", bookController.createReservation);
router.get("/:id", bookController.getReservation);
router.patch("/update/:id", bookController.updateReservation);
router.delete("/delete/:id", bookController.deleteReservation);

module.exports = router;