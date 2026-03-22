const { Inventory } = require("../../../domain/entities/inventory");
const { DomainError } = require("../../../domain/errors/domainError");

class CreateInventory {
  constructor(inventoryRepo) {
    this.inventoryRepo = inventoryRepo;
  }

  async execute(data) {
    const exists = await this.inventoryRepo.findByNumber(data.inventory_number);
    if (exists) {
      throw new DomainError("Inventory number already exists");
    }
    const inventory = new Inventory(data);
    return await this.inventoryRepo.create(inventory);
  }
}

module.exports = { CreateInventory };