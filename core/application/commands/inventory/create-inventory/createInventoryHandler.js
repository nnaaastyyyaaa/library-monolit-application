const { Inventory } = require("../../../../domain/entities/inventory");
const { DomainError } = require("../../../../domain/errors/domainError");

class CreateInventoryHandler {
  constructor(inventoryRepo) {
    this.inventoryRepo = inventoryRepo;
  }

  async execute(command) {
    const exists = await this.inventoryRepo.findByNumber(
      command.inventory_number,
    );
    if (exists) {
      throw new DomainError("Inventory number already exists");
    }
    const inventory = new Inventory(command);
    return await this.inventoryRepo.create(inventory);
  }
}

module.exports = { CreateInventoryHandler };
