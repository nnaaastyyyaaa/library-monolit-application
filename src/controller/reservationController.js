const reservationService = require("../service/reservationService");

exports.getAllReservations = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const reservations = await reservationService.getAllReservations(page, limit);
    res.json(reservations);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationService.createReservation(req.body);
    res.status(201).json({ "Created reservation": reservation });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await reservationService.getReservation(req.params.id);
    res.json(reservation);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await reservationService.updateReservation(req.params.id, req.body);
    res.json({ "Updated reservation": updatedReservation });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};