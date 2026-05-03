class CancellReservationCommand {
  constructor({ id, token }) {
    this.id = id;
    this.token = token;
  }
}

module.exports = { CancellReservationCommand };
