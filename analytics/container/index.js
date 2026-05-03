const eventBus = require("../../eventBus/eventBus");
const {
  AnalyticsRepository,
} = require("../infrastructure/analyticsRepository");
const {
  ReservationCreatedHandler,
} = require("../application/reservationCreatedHandler");
const {
  ReservationCancelledHandler,
} = require("../application/reservationCancelledHandler");
const { analyticsController } = require("./analytics/index");
const analyticsRoutes = require("../presentation/analyticsRoutes");

const repository = new AnalyticsRepository();

const analyticsCreatedHandler = new ReservationCreatedHandler(
  repository
);

const analyticsCancelledHandler = new ReservationCancelledHandler(
  repository
);

eventBus.subscribe("ReservationCreatedEvent", (event) =>
  analyticsCreatedHandler.handle(event),
);

eventBus.subscribe("ReservationCancelledEvent", (event) =>
  analyticsCancelledHandler.handle(event),
);

const analyticsRouter = analyticsRoutes(analyticsController);

module.exports = { analyticsRouter };