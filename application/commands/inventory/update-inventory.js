const { DomainError } = require("../../../domain/errors/domainError");

class UpdateInventory {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  async execute(id, data) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new DomainError("Inventory item not found");
    }
    
    if (data.inventory_number) {
      const isExist = await this.inventoryRepository.findByNumber(data.inventory_number);
      if (isExist && isExist.id !== Number(id)) {
        throw new DomainError("Inventory number already in use");
      }
      inventory.updateInventoryNumber(data.inventory_number);
    }
    
    if (data.status) {
      inventory.updateStatus(data.status);
    }

    return await this.inventoryRepository.update(id, inventory);
  }
}

module.exports = { UpdateInventory };