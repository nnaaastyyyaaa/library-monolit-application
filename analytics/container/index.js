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

const analyticsCreatedHandler = new ReservationCreatedHandler(
  new AnalyticsRepository(),
);

const analyticsCancelledHandler = new ReservationCancelledHandler(
  new AnalyticsRepository(),
);

eventBus.subscribe("ReservationCreatedEvent", (event) =>
  analyticsCreatedHandler.handle(event),
);

eventBus.subscribe("ReservationCancelledEvent", (event) =>
  analyticsCancelledHandler.handle(event),
);
