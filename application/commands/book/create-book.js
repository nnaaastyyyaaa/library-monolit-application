const { Book } = require("../../../domain/entities/book");
const { DomainError } = require("../../../domain/errors/domainError");

class CreateBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(data) {
    const isExistIsbn = await this.bookRepository.findByIsbn(data.isbn);
    if (isExistIsbn) {
      throw new DomainError("Book with this isbn already exists");
    }
    const isExist = await this.bookRepository.findNameIsbnAuthor(
      data.title,
      data.author,
      data.isbn,
    );
    if (isExist) {
      throw new DomainError("This book alredy exists!");
    }
    const book = new Book({
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      description: data.description,
      published_year: data.published_year,
      category_id: data.category_id,
    });
    return await this.bookRepository.create(book);
  }
}

module.exports = { CreateBook };
