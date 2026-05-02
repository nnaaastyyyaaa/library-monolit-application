const { Book } = require("../../../../domain/entities/book");
const { DomainError } = require("../../../../domain/errors/domainError");

class CreateBookHandler {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(command) {
    const isExistIsbn = await this.bookRepository.findByIsbn(command.isbn);
    if (isExistIsbn) {
      throw new DomainError("Book with this isbn already exists");
    }
    const isExist = await this.bookRepository.findNameIsbnAuthor(
      command.title,
      command.author,
      command.isbn,
    );
    if (isExist) {
      throw new DomainError("This book alredy exists!");
    }
    const book = new Book({
      title: command.title,
      author: command.author,
      isbn: command.isbn,
      description: command.description,
      published_year: command.published_year,
      category_id: command.category_id,
    });
    const created = await this.bookRepository.create(book);
    return created.id;
  }
}

module.exports = { CreateBookHandler };
