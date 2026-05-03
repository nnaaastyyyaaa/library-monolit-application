const prisma = require("../../infrastructure/prisma/client");
const { AnalyticsRepository } = require("../../infrastructure/analyticsRepository");

const { GetAnalyticsHandler } = require("../../application/queries/get-analytics/getAnalyticsHandler");
const { GetAnalyticssHandler } = require("../../application/queries/get-analyticss/getAnalyticssHandler");
const { DeleteAnalyticsHandler } = require("../../application/commands/delete-analytics/deleteAnalyticsHandler");

const { ReservationCreatedHandler } = require("../../application/reservationCreatedHandler");
const { ReservationCancelledHandler } = require("../../application/reservationCancelledHandler");

const { AnalyticsController } = require("../../presentation/analyticsController");

const repository = new AnalyticsRepository();

const analyticsController = new AnalyticsController(
  new GetAnalyticsHandler(prisma),
  new GetAnalyticssHandler(prisma),
  new DeleteAnalyticsHandler(repository)
);

const reservationCreatedHandler = new ReservationCreatedHandler(repository);
const reservationCancelledHandler = new ReservationCancelledHandler(repository);

module.exports = {
  analyticsController,
  reservationCreatedHandler,
  reservationCancelledHandler
};