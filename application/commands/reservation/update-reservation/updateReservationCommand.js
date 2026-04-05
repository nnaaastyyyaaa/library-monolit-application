class UpdateReservationCommand {
  constructor({ id, status, expiration_date }) {
    this.id = id;
    this.status = status;
    this.expiration_date = expiration_date;
  }
}

module.exports = { UpdateReservationCommand };