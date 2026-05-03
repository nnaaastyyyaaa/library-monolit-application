class ReservationCreatedHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async handle(event) {
    try {
      const { bookId, bookTitle } = event;
      const existingAnalytics = await this.repository.findByBookId(bookId);

      if (existingAnalytics) {
        existingAnalytics.totalReservations += 1;
        existingAnalytics.activeReservations += 1;
        existingAnalytics.lastReservedAt = new Date();
        await this.repository.update(existingAnalytics.id, existingAnalytics);
      } else {
        await this.repository.create({
          bookId: bookId,
         bookTitle: bookTitle,
          totalReservations: 1,
          activeReservations: 1,
          lastReservedAt: new Date()
        });
      }
    } catch (error) {
      console.error('[Analytics] Error processing RESERVATION_CREATED:', error.message);
      throw error;
    }
  }
}

module.exports = { ReservationCreatedHandler };