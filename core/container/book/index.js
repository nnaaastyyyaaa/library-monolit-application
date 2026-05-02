const prisma = require("../../../infrastructure/prisma/client");
const {
  BookPrismaRepository,
} = require("../../../infrastructure/repositories/bookPrismaRepository");

const {
  CreateBookHandler,
} = require("../../application/commands/book/create-book/createBookHandler");
const {
  GetBookHandler,
} = require("../../application/queries/book/get-book/getBookHandler");
const {
  GetBooksHandler,
} = require("../../application/queries/book/get-books/getBooksHandler");
const {
  UpdateBookHandler,
} = require("../../application/commands/book/update-book/updateBookHandler");
const {
  DeleteBookHandler,
} = require("../../application/commands/book/delete-book/deleteBookHandler");

const {
  BookController,
} = require("../../../presentation/controllers/bookController");

const repository = new BookPrismaRepository();

module.exports = new BookController(
  new CreateBookHandler(repository),
  new GetBookHandler(prisma),
  new GetBooksHandler(prisma),
  new UpdateBookHandler(repository),
  new DeleteBookHandler(repository),
);
