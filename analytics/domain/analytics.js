class Analytics {
  constructor({
    analyticsId, // Змінили на analyticsId, щоб збігалося з базою
    bookId,      // Тільки camelCase!
    bookTitle,   // Змінили title на bookTitle для повної відповідності
    totalReservations,
    activeReservations,
    lastReservedAt,
    createdAt,
    updatedAt,
  }) {
    this.analyticsId = analyticsId;
    this.bookId = bookId;
    this.bookTitle = bookTitle;
    this.totalReservations = totalReservations;
    this.activeReservations = activeReservations;
    this.lastReservedAt = lastReservedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  updateTotalReservations(total) {
    this.totalReservations = total;
    this.updatedAt = new Date(); // Для БД краще використовувати new Date()
  }

  updateActiveReservations(active) {
    this.activeReservations = active;
    this.updatedAt = new Date();
  }

  updateLastReserved(date) {
    this.lastReservedAt = date;
    this.updatedAt = new Date();
  }

  updateCreatedAt(date) {
    this.createdAt = date;
    this.updatedAt = new Date();
  }

  updateUpdatedAt(date) {
    this.updatedAt = date;
  }
}

module.exports = { Analytics };