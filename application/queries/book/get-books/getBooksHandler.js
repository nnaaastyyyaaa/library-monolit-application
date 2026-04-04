class GetBooksHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    console.log("execute here");
    const data = await this.prisma.book.findMany();
    return data;
  }
}

module.exports = { GetBooksHandler };
