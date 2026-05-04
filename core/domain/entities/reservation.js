class Reservation {
  constructor({ id, period, status, user_id, inventory_id }) {
    this.id = id;
    this.period = period;
    this.status = status || "active";
    this.user_id = user_id;
    this.inventory_id = inventory_id;
  }

  cancell() {
    this.status = "cancelled";
    return this;
  }

  complete() {
    this.status = "completed";
    return this;
  }
  isExpired() {
    return this.period.isExpired();
  }
}

module.exports = { Reservation };
