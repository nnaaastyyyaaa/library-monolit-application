const { CreateReservationCommand } = require("../../application/commands/reservation/create-reservation/createReservationCommand");
const { UpdateReservationCommand } = require("../../application/commands/reservation/update-reservation/updateReservationCommand");
const { DeleteReservationCommand } = require("../../application/commands/reservation/delete-reservation/deleteReservationCommand");
const { GetReservationQuery } = require("../../application/queries/reservation/get-reservation/getReservationQuery");
const { GetReservationsQuery } = require("../../application/queries/reservation/get-reservations/getReservationsQuery");

class ReservationController {
  constructor(createHandler, updateHandler, deleteHandler, getHandler, getAllHandler) {
    this.createHandler = createHandler;
    this.updateHandler = updateHandler;
    this.deleteHandler = deleteHandler;
    this.getHandler = getHandler;
    this.getAllHandler = getAllHandler;
  }

  async create(req, res, next) {
    try {
      const command = new CreateReservationCommand(req.body);
      const id = await this.createHandler.execute(command);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const command = new UpdateReservationCommand({ id: req.params.id, ...req.body });
      await this.updateHandler.execute(command);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const command = new DeleteReservationCommand({ id: req.params.id });
      await this.deleteHandler.execute(command);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const query = new GetReservationQuery({ id: req.params.id });
      const reservation = await this.getHandler.execute(query);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const query = new GetReservationsQuery();
      const reservations = await this.getAllHandler.execute(query);
      res.json(reservations);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ReservationController };