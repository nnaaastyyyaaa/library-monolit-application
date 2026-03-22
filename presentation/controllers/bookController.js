const { DomainError } = require("../../domain/errors/domainError");
class BookController {
  constructor(createBook, getBook, getBooks, updateBook, deleteBook) {
    this.createBook = createBook;
    this.getBook = getBook;
    this.getBooks = getBooks;
    this.updateBook = updateBook;
    this.deleteBook = deleteBook;
  }

  async create(req, res) {
    try {
      const result = await this.createBook.execute(req.body);
      res.status(201).json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res) {
    try {
      const result = await this.getBook.execute(req.params.id);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.getBooks.execute();
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async update(req, res) {
    try {
      const result = await this.updateBook.execute(req.params.id, req.body);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res) {
    try {
      await this.deleteBook.execute(req.params.id);
      res.status(202).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { BookController };
