const { DomainError } = require("../errors/domainError");
class ReservationPeriod {
  constructor({ reservationDate, expirationDate }) {
    this.reservationDate = new Date(reservationDate);
    this.expirationDate = new Date(expirationDate);

    this.validate();
  }

  validate() {
    if (isNaN(this.reservationDate)) {
      throw new DomainError("Invalid reservation date");
    }

    if (isNaN(this.expirationDate)) {
      throw new DomainError("Invalid expiration date");
    }

    if (this.expirationDate <= this.reservationDate) {
      throw new DomainError("Expiration date cannot be in the past");
    }
  }

  isExpired() {
    return new Date() > this.expirationDate;
  }
}

module.exports = { ReservationPeriod };
