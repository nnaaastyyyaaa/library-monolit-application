const crypto = require("crypto");
class ReservationCancelledEvent {
  constructor({ bookId }) {
    this.id = this.id = crypto.randomUUID();
    this.bookId = bookId;
  }
}

module.exports = ReservationCancelledEvent;
