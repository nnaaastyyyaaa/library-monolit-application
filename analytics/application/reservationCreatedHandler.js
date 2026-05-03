class ReservationCreatedHandler {
  constructor(analyticsRepository) {
    this.analyticsRepository = analyticsRepository;
  }
  handle(event) {
    console.log("Analytics created received:", event);
  }
}

module.exports = { ReservationCreatedHandler };
