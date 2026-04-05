const prisma = require("../../infrastructure/prisma/client");
const { ReservationPrismaRepository } = require("../../infrastructure/repositories/reservationPrismaRepository");
const { InventoryPrismaRepository } = require("../../infrastructure/repositories/inventoryPrismaRepository");

const { CreateReservationHandler } = require("../../application/commands/reservation/create-reservation/createReservationHandler");
const { UpdateReservationHandler } = require("../../application/commands/reservation/update-reservation/updateReservationHandler");
const { DeleteReservationHandler } = require("../../application/commands/reservation/delete-reservation/deleteReservationHandler");
const { GetReservationHandler } = require("../../application/queries/reservation/get-reservation/getReservationHandler");
const { GetReservationsHandler } = require("../../application/queries/reservation/get-reservations/getReservationsHandler");

const { ReservationController } = require("../../presentation/controllers/reservationController");

const repository = new ReservationPrismaRepository();
const inventoryRepo = new InventoryPrismaRepository();

module.exports = new ReservationController(
  new CreateReservationHandler(repository, inventoryRepo),
  new GetReservationHandler(prisma),                      
  new GetReservationsHandler(prisma),                
  new UpdateReservationHandler(repository),         
  new DeleteReservationHandler(repository)              
);