const { DomainError } = require("../../../../domain/errors/domainError");

class GetInventoryHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(query) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { inventory_id: Number(query.id) },
    });
    if (!inventory) {
      throw new DomainError("Cannot find inventory with this id");
    }
    return inventory;
  }
}

module.exports = { GetInventoryHandler };
