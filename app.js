const express = require("express");

const {
  UserPrismaRepository,
} = require("./infrastructure/repositories/userPrismaRepository");
const {
  BookPrismaRepository,
} = require("./infrastructure/repositories/bookPrismaRepository");
const {
  CategoryPrismaRepository,
} = require("./infrastructure/repositories/categoryPrismaRepository");

const { CreateUser } = require("./application/commands/user/create-user");
const { CreateBook } = require("./application/commands/book/create-book");
const {
  CreateCategory,
} = require("./application/commands/category/create-category");

const { GetUser } = require("./application/queries/user/get-user");
const { GetBook } = require("./application/queries/book/get-book");
const { GetCategory } = require("./application/queries/category/get-category");

const { GetUsers } = require("./application/queries/user/get-users");
const { GetBooks } = require("./application/queries/book/get-books");
const {
  GetCategories,
} = require("./application/queries/category/get-categories");

const { UpdateUser } = require("./application/commands/user/update-user");
const { UpdateBook } = require("./application/commands/book/update-book");
const {
  UpdateCategory,
} = require("./application/commands/category/update-category");

const { DeleteUser } = require("./application/commands/user/delete-user");
const { DeleteBook } = require("./application/commands/book/delete-book");
const {
  DeleteCategory,
} = require("./application/commands/category/delete-category");

const { UserController } = require("./presentation/controllers/userController");
const { BookController } = require("./presentation/controllers/bookController");
const {
  CategoryController,
} = require("./presentation/controllers/categoryController");

const userRoutes = require("./presentation/routes/userRoutes");
const bookRoutes = require("./presentation/routes/bookRoutes");
const categoryRoutes = require("./presentation/routes/categoryRoutes");

const app = express();
app.use(express.json());

const userRepo = new UserPrismaRepository();
const bookRepo = new BookPrismaRepository();
const categoryRepo = new CategoryPrismaRepository();

const createUser = new CreateUser(userRepo);
const getUser = new GetUser(userRepo);
const getUsers = new GetUsers(userRepo);
const updateUser = new UpdateUser(userRepo);
const deleteUser = new DeleteUser(userRepo);

const createBook = new CreateBook(bookRepo);
const getBook = new GetBook(bookRepo);
const getBooks = new GetBooks(bookRepo);
const updateBook = new UpdateBook(bookRepo);
const deleteBook = new DeleteBook(bookRepo);

const createCategory = new CreateCategory(categoryRepo);
const getCategory = new GetCategory(categoryRepo);
const getCategories = new GetCategories(categoryRepo);
const updateCategory = new UpdateCategory(categoryRepo);
const deleteCategory = new DeleteCategory(categoryRepo);

const userController = new UserController(
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
);

const bookController = new BookController(
  createBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
);

const categoryController = new CategoryController(
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
);

app.use("/users", userRoutes(userController));
app.use("/books", bookRoutes(bookController));
app.use("/categories", categoryRoutes(categoryController));

module.exports = app;
