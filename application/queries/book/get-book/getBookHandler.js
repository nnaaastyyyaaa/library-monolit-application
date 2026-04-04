const { DomainError } = require("../../../../domain/errors/domainError");

class GetBookHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async execute(query) {
    const book = await this.prisma.book.findUnique({
      where: { book_id: Number(query.id) },
    });
    if (!book) {
      throw new DomainError("Cannot find book with this id");
    }
    return book;
  }
}

module.exports = { GetBookHandler };
