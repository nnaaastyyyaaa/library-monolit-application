class UpdateInventoryCommand {
  constructor({ id, status }) {
    this.id = id;
    this.status = status;
  }
}

module.exports = { UpdateInventoryCommand };
