const {
  ReservationPrismaRepository,
} = require("../../infrastructure/repositories/reservationPrismaRepository");
const {
  ReservationFactory,
} = require("../../domain/factories/reservationFactory");

const {
  CreateReservation,
} = require("../../application/commands/reservation/create-reservation");
const {
  GetReservation,
} = require("../../application/queries/reservation/get-reservation");
const {
  GetReservations,
} = require("../../application/queries/reservation/get-reservations");
const {
  UpdateReservation,
} = require("../../application/commands/reservation/update-reservation");
const {
  DeleteReservation,
} = require("../../application/commands/reservation/delete-reservation");

const {
  ReservationController,
} = require("../../presentation/controllers/reservationController");

const repository = new ReservationPrismaRepository();
const factory = new ReservationFactory();

module.exports = new ReservationController(
  new CreateReservation(repository, factory),
  new GetReservation(repository),
  new GetReservations(repository),
  new UpdateReservation(repository, factory),
  new DeleteReservation(repository),
);
