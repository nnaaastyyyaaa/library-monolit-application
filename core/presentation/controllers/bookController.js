const { DomainError } = require("../../domain/errors/domainError");
const {
  CreateBookCommand,
} = require("../../application/commands/book/create-book/createBookCommand");
const {
  UpdateBookCommand,
} = require("../../application/commands/book/update-book/updateBookCommand");
const {
  DeleteBookCommand,
} = require("../../application/commands/book/delete-book/deleteBookCommand");
const {
  GetBookQuery,
} = require("../../application/queries/book/get-book/getBookQuery");

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
      const command = new CreateBookCommand(req.body);
      const id = await this.createBook.execute(command);
      res.status(201).json({ id });
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res) {
    try {
      const query = new GetBookQuery({ id: req.params.id });
      const result = await this.getBook.execute(query);
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
      res.status(500).json({ e });
    }
  }

  async update(req, res) {
    try {
      const command = new UpdateBookCommand({ id: req.params.id, ...req.body });
      await this.updateBook.execute(command);
      res.status(200).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res) {
    try {
      const command = new DeleteBookCommand({ id: req.params.id });
      await this.deleteBook.execute(command);
      res.status(204).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { BookController };
