const prisma = require("../../infrastructure/prisma/client");
const {
  AnalyticsRepository,
} = require("../../infrastructure/analyticsRepository");

const {
  ReservationCreatedHandler,
} = require("../../application/reservationCreatedHandler");

const {
  AnalyticsController,
} = require("../../presentation/analyticsController");

const repository = new AnalyticsRepository();

module.exports = new AnalyticsController(
  new GetAnalyticsHandler(prisma),
  new GetAnalyticssHandler(prisma),
  new DeleteAnalyticsHandler(repository),
);
