class GetCategoriesHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    return await this.prisma.category.findMany();
  }
}

module.exports = { GetCategoriesHandler };
