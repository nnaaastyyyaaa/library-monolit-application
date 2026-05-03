const crypto = require("crypto");
class ReservationCreatedEvent {
  constructor({ userId, userEmail, bookId, bookTitle }) {
    this.id = this.id = crypto.randomUUID();
    this.userEmail = userEmail;
    this.bookTitle = bookTitle;
    this.bookId = bookId;
  }
}

module.exports = ReservationCreatedEvent;
