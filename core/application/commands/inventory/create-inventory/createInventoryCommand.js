class CreateInventoryCommand {
  constructor({ inventory_number, status, book_id }) {
    this.inventory_number = inventory_number;
    this.status = status;
    this.book_id = book_id;
  }
}

module.exports = { CreateInventoryCommand };
