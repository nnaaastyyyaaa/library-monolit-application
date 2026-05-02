class Reservation {
  constructor({ id, period, status, user_id, inventory_id }) {
    this.id = id;
    this.period = period;
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
  isExpired() {
    return this.period.isExpired();
  }
}

module.exports = { Reservation };
