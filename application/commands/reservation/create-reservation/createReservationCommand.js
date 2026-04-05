class CreateReservationCommand {
  constructor({ user_id, inventory_id, status }) {
    this.user_id = user_id;
    this.inventory_id = inventory_id;
    this.status = status;
  }
}

module.exports = { CreateReservationCommand };