class Analytics {
  constructor({
    id,
    book_id,
    title,
    total_reservations,
    active_reservations,
    last_reserved_at,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.book_id = book_id;
    this.title = title;
    this.total_reservations = total_reservations;
    this.active_reservations = active_reservations;
    this.last_reserved_at = last_reserved_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  updateTotalReservations(total) {
    this.total_reservations = total;
    this.updated_at = Date.now();
  }
  updateActiveReservations(active) {
    this.active_reservations = active;
    this.updated_at = Date.now();
  }
  updateLastReserved(date) {
    this.last_reserved_at = date;
    this.updated_at = Date.now();
  }
  updateCreatedAt(date) {
    this.created_at = date;
    this.updated_at = Date.now();
  }
  updateUpdatedAt(date) {
    this.updated_at = date;
    this.updated_at = Date.now();
  }
}

module.exports = { Analytics };
