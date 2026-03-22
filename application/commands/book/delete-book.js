class DeleteBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async execute(id) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }

    return await this.bookRepository.delete(id);
  }
}

module.exports = { DeleteBook };
