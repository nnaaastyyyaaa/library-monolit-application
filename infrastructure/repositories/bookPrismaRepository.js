const prisma = require("../prisma/client");
const { BookRepository } = require("../../domain/repository/bookRepository");
const { BookMapper } = require("../mappers/bookMapper");

class BookPrismaRepository extends BookRepository {
  async create(book) {
    const data = BookMapper.toPersistence(book);

    const created = await prisma.book.create({
      data,
    });

    return BookMapper.toDomain(created);
  }

  async findById(id) {
    const data = await prisma.book.findUnique({
      where: { book_id: Number(id) },
    });

    return BookMapper.toDomain(data);
  }

  async findByIsbn(isbn) {
    const data = await prisma.book.findFirst({
      where: { isbn: Number(isbn) },
    });

    return BookMapper.toDomain(data);
  }

  async findNameIsbnAuthor(title, author, isbn) {
    const data = await prisma.book.findFirst({
      where: { isbn: Number(isbn), title, author },
    });

    return BookMapper.toDomain(data);
  }

  async findAll() {
    const data = await prisma.book.findMany();
    return data.map((book) => BookMapper.toDomain(book));
  }

  async update(id, book) {
    const data = BookMapper.toPersistence(book);

    const updated = await prisma.book.update({
      where: { book_id: Number(id) },
      data,
    });

    return BookMapper.toDomain(updated);
  }
  async delete(id) {
    return await prisma.book.delete({
      where: { book_id: Number(id) },
    });
  }
}

module.exports = { BookPrismaRepository };
