class CreateReservationCommand {
  constructor({ user_id, inventory_id, expiration_date, status }) {
    this.user_id = user_id;
    this.inventory_id = inventory_id;
    this.expiration_date = expiration_date;
    this.status = status;
  }
}

module.exports = { CreateReservationCommand };
