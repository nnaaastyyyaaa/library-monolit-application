const { DomainError } = require("../../../domain/errors/domainError");

class DeleteInventory {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  async execute(id) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new DomainError("Inventory item not found");
    }

    return await this.inventoryRepository.delete(id);
  }
}

module.exports = { DeleteInventory };