class ReservationCancelledHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async handle(event) {
    try {
      const { bookId } = event;
      const existingAnalytics = await this.repository.findByBookId(bookId);

      if (existingAnalytics && existingAnalytics.activeReservations > 0) {
        existingAnalytics.activeReservations =- 1;
        await this.repository.update(existingAnalytics.id, existingAnalytics);
      }
    } catch (error) {
      console.error('[Analytics] Error processing RESERVATION_CANCELLED:', error.message);
      throw error;
    }
  }
}

module.exports = { ReservationCancelledHandler };