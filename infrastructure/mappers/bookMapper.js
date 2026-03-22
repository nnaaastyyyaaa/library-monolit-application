const { Book } = require("../../domain/entities/book");

class BookMapper {
  static toDomain(raw) {
    if (!raw) return null;

    return new Book({
      id: raw.book_id,
      title: raw.title,
      author: raw.author,
      isbn: raw.isbn,
      description: raw.description,
      published_year: raw.published_year,
      category_id: raw.category_id,
    });
  }

  static toPersistence(book) {
    return {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      description: book.description,
      published_year: book.published_year,
      category_id: book.category_id,
    };
  }
}

module.exports = { BookMapper };
