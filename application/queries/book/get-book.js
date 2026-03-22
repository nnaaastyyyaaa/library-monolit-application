class GetBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async execute(id) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error("Cannot find book with this id");
    }
    return book;
  }
}

module.exports = { GetBook };
