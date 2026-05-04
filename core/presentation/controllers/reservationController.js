const { DomainError } = require("../../domain/errors/domainError");
const {
  CreateReservationCommand,
} = require("../../application/commands/reservation/create-reservation/createReservationCommand");
const {
  UpdateReservationCommand,
} = require("../../application/commands/reservation/update-reservation/updateReservationCommand");
const {
  DeleteReservationCommand,
} = require("../../application/commands/reservation/delete-reservation/deleteReservationCommand");
const {
  CancellReservationCommand,
} = require("../../application/commands/reservation/cancell-reservation/cancellReservationCommand");
const {
  GetReservationQuery,
} = require("../../application/queries/reservation/get-reservation/getReservationQuery");
const {
  GetReservationsQuery,
} = require("../../application/queries/reservation/get-reservations/getReservationsQuery");

class ReservationController {
  constructor(
    createHandler,
    getHandler,
    getAllHandler,
    updateHandler,
    deleteHandler,
    cancellHandler,
  ) {
    this.createHandler = createHandler;
    this.getHandler = getHandler;
    this.getAllHandler = getAllHandler;
    this.updateHandler = updateHandler;
    this.deleteHandler = deleteHandler;
    this.cancellHandler = cancellHandler;
  }

  async create(req, res, next) {
    try {
      const header = req.headers.authorization;

      if (!header) {
        return res.status(401).json({ error: "No token" });
      }

      const token = header.split(" ")[1];

      const command = new CreateReservationCommand({ ...req.body, token });
      const id = await this.createHandler.execute(command);
      res.status(201).json({ id });
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async cancell(req, res, next) {
    try {
      const header = req.headers.authorization;

      if (!header) {
        return res.status(401).json({ error: "No token" });
      }

      const token = header.split(" ")[1];

      const command = new CancellReservationCommand({
        id: req.params.id,
        token,
      });
      const id = await this.cancellHandler.execute(command);
      res.status(201).json({ message: "Reservation cancelled" });
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async update(req, res, next) {
    try {
      const command = new UpdateReservationCommand({
        id: req.params.id,
        ...req.body,
      });
      await this.updateHandler.execute(command);
      res.status(204).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res, next) {
    try {
      const command = new DeleteReservationCommand({ id: req.params.id });
      await this.deleteHandler.execute(command);
      res.status(204).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res, next) {
    try {
      const query = new GetReservationQuery({ id: req.params.id });
      const reservation = await this.getHandler.execute(query);
      res.json(reservation);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getAll(req, res, next) {
    try {
      const query = new GetReservationsQuery();
      const reservations = await this.getAllHandler.execute(query);
      res.json(reservations);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { ReservationController };
