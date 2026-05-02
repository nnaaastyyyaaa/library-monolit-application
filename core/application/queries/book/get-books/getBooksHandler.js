class GetBooksHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    return await this.prisma.book.findMany();
  }
}

module.exports = { GetBooksHandler };
