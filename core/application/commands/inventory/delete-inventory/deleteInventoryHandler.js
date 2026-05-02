const { DomainError } = require("../../../../domain/errors/domainError");

class DeleteInventoryHandler {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  async execute(command) {
    const inventory = await this.inventoryRepository.findById(command.id);
    if (!inventory) {
      throw new DomainError("Inventory item not found");
    }

    return await this.inventoryRepository.delete(command.id);
  }
}

module.exports = { DeleteInventoryHandler };
