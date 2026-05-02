const { DomainError } = require("../../../../domain/errors/domainError");

class UpdateInventoryHandler {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  async execute(command) {
    const inventory = await this.inventoryRepository.findById(command.id);
    if (!inventory) {
      throw new DomainError("Inventory item not found");
    }

    if (command.status) {
      inventory.updateStatus(command.status);
    }

    await this.inventoryRepository.update(command.id, inventory);
  }
}

module.exports = { UpdateInventoryHandler };
