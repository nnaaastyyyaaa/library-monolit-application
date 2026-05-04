class Analytics {
  constructor({
    analyticsId,
    bookId,
    bookTitle,
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
}

module.exports = { Analytics };
