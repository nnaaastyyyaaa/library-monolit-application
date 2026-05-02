const { DomainError } = require("../../../../domain/errors/domainError");

class UpdateBookHandler {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async execute(command) {
    const book = await this.bookRepository.findById(command.id);
    if (!book) {
      throw new DomainError("Book not found");
    }
    if (command.title) {
      book.updateTitle(command.title);
    }
    if (command.author) {
      book.updateAuthor(command.author);
    }
    if (command.description) {
      book.updateDescription(command.description);
    }

    await this.bookRepository.update(command.id, book);
  }
}

module.exports = { UpdateBookHandler };
