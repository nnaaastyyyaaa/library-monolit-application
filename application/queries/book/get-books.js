class GetBooks {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute() {
    return this.bookRepository.findAll();
  }
}

module.exports = { GetBooks };
