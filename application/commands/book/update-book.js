const { DomainError } = require("../../../domain/errors/domainError");

class UpdateBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async execute(id, data) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new DomainError("Book not found");
    }
    if (data.isbn) {
      const isExist = await this.bookRepository.findByIsbn(data.isbn);
      if (isExist) {
        throw new DomainError("Book with this isbn already exists");
      }
      book.updateIsbn(data.isbn);
    }
    if (data.title) {
      book.updateTitle(data.title);
    }
    if (data.author) {
      book.updateAuthor(data.author);
    }
    if (data.description) {
      book.updateDescription(data.description);
    }
    if (data.category_id) {
      book.updateCategory(data.category_id);
    }

    return await this.bookRepository.update(id, book);
  }
}

module.exports = { UpdateBook };
