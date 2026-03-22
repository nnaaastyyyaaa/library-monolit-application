class BookController {
  constructor(createBook, getBook, getBooks, updateBook, deleteBook) {
    this.createBook = createBook;
    this.getBook = getBook;
    this.getBooks = getBooks;
    this.updateBook = updateBook;
    this.deleteBook = deleteBook;
  }

  async create(req, res) {
    const result = await this.createBook.execute(req.body);
    res.status(201).json(result);
  }

  async getOne(req, res) {
    const result = await this.getBook.execute(req.params.id);
    res.json(result);
  }

  async getAll(req, res) {
    const result = await this.getBooks.execute();
    res.json(result);
  }

  async update(req, res) {
    const result = await this.updateBook.execute(req.params.id, req.body);
    res.json(result);
  }

  async delete(req, res) {
    await this.deleteBook.execute(req.params.id);
    res.status(202).send();
  }
}

module.exports = { BookController };
