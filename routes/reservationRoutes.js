const express = require("express");
const router = express.Router();
const reservationController = require("../src/controller/reservationController");

router.get("/", reservationController.getAllReservations);
router.post("/reservation", reservationController.createReservation);
router.get("/:id", reservationController.getReservation);
router.patch("/update/:id", reservationController.updateReservation);
router.delete("/delete/:id", reservationController.deleteReservation);

module.exports = router;
