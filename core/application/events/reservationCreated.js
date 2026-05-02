const crypto = require("crypto");
class ReservationCreatedEvent {
  constructor({ userId, userEmail, bookId, bookTitle }) {
    this.id = this.id = crypto.randomUUID();
    this.userEmail = userEmail;
    this.bookTitle = bookTitle;
  }
}

module.exports = ReservationCreatedEvent;
