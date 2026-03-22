class Reservation {
  constructor({ id, reservation_date, expiration_date, status, user_id, inventory_id }) {
    this.id = id;
    this.reservation_date = reservation_date || new Date();
    this.expiration_date = expiration_date;
    this.status = status || "active";
    this.user_id = user_id;
    this.inventory_id = inventory_id;
  }

  cancel() {
    this.status = "cancelled";
  }

  complete() {
    this.status = "completed";
  }
}

module.exports = { Reservation };