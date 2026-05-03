class ReservationCancelledHandler {
  constructor(analyticsRepository) {
    this.analyticsRepository = analyticsRepository;
  }
  handle(event) {
    console.log("Analytics cancell received:", event);
  }
}

module.exports = { ReservationCancelledHandler };
