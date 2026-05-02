class Inventory {
  constructor({ id, inventory_number, status, book_id }) {
    this.id = id;
    this.inventory_number = inventory_number;
    this.status = status || "available";
    this.book_id = book_id;
  }

  updateStatus(status) {
    this.status = status;
  }

  updateInventoryNumber(number) {
    this.inventory_number = number;
  }
}

module.exports = { Inventory };