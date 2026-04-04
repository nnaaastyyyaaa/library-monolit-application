class GetInventoriesHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    return this.prisma.inventory.findMany();
  }
}

module.exports = { GetInventoriesHandler };
