const { DomainError } = require("../../domain/errors/domainError");

class ReservationController {
  constructor(
    createReservation,
    getReservation,
    getReservations,
    updateReservation,
    deleteReservation,
  ) {
    this.createReservation = createReservation;
    this.getReservation = getReservation;
    this.getReservations = getReservations;
    this.updateReservation = updateReservation;
    this.deleteReservation = deleteReservation;
  }

  async create(req, res) {
    try {
      const result = await this.createReservation.execute(req.body);
      res.status(201).json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: e });
    }
  }

  async getOne(req, res) {
    try {
      const result = await this.getReservation.execute(req.params.id);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.getReservations.execute();
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async update(req, res) {
    try {
      const result = await this.updateReservation.execute(
        req.params.id,
        req.body,
      );
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.deleteReservation.execute(req.params.id);
      res.status(202).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { ReservationController };
