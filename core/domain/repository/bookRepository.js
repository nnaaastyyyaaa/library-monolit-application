class BookRepository {
  async findAll(options) {}
  async findById(id) {}
  async findByIsbn(isbn) {}
  async findNameIsbnAuthor(name, author, isbn) {}
  async create(book) {}
  async update(id, data) {}
  async delete(id) {}
  async count() {}
}

module.exports = { BookRepository };
