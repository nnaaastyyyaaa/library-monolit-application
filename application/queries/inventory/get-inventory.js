const { DomainError } = require("../../../domain/errors/domainError");

class GetInventory {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(id) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new DomainError("Cannot find inventory with this id");
    }
    return inventory;
  }
}

module.exports = { GetInventory };