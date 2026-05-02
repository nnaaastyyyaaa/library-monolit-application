const prisma = require("../../infrastructure/prisma/client");
const {
  ReservationPrismaRepository,
} = require("../../infrastructure/repositories/reservationPrismaRepository");
const {
  InventoryPrismaRepository,
} = require("../../infrastructure/repositories/inventoryPrismaRepository");
const {
  UserPrismaRepository,
} = require("../../infrastructure/repositories/userPrismaRepository");
const {
  BookPrismaRepository,
} = require("../../infrastructure/repositories/bookPrismaRepository");
const {
  ReservationFactory,
} = require("../../domain/factories/reservationFactory");
const eventBus = require("../../../eventBus/eventBus.js");
const { AuthService } = require("../../application/services/authService");
const { JwtService } = require("../../application/services/jwtService.js");

const {
  CreateReservationHandler,
} = require("../../application/commands/reservation/create-reservation/createReservationHandler");
const {
  UpdateReservationHandler,
} = require("../../application/commands/reservation/update-reservation/updateReservationHandler");
const {
  DeleteReservationHandler,
} = require("../../application/commands/reservation/delete-reservation/deleteReservationHandler");
const {
  GetReservationHandler,
} = require("../../application/queries/reservation/get-reservation/getReservationHandler");
const {
  GetReservationsHandler,
} = require("../../application/queries/reservation/get-reservations/getReservationsHandler");

const {
  ReservationController,
} = require("../../presentation/controllers/reservationController");
const repository = new ReservationPrismaRepository();
const inventoryRepo = new InventoryPrismaRepository();
const userRepo = new UserPrismaRepository();
const bookRepo = new BookPrismaRepository();
const factory = new ReservationFactory(repository, inventoryRepo, userRepo);
const jwtService = new JwtService(process.env.JWT_SECRET, "1h");
const authService = new AuthService(userRepo, jwtService);

module.exports = new ReservationController(
  new CreateReservationHandler(
    repository,
    factory,
    inventoryRepo,
    userRepo,
    bookRepo,
    eventBus,
    authService,
  ),
  new GetReservationHandler(prisma),
  new GetReservationsHandler(prisma),
  new UpdateReservationHandler(repository),
  new DeleteReservationHandler(repository),
);
