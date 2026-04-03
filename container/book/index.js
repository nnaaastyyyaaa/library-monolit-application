const {
  BookPrismaRepository,
} = require("../../infrastructure/repositories/bookPrismaRepository");

const { CreateBook } = require("../../application/commands/book/create-book");
const { GetBook } = require("../../application/queries/book/get-book");
const { GetBooks } = require("../../application/queries/book/get-books");
const { UpdateBook } = require("../../application/commands/book/update-book");
const { DeleteBook } = require("../../application/commands/book/delete-book");

const {
  BookController,
} = require("../../presentation/controllers/bookController");

const repository = new BookPrismaRepository();

module.exports = new BookController(
  new CreateBook(repository),
  new GetBook(repository),
  new GetBooks(repository),
  new UpdateBook(repository),
  new DeleteBook(repository),
);
