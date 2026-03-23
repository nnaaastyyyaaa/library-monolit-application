const express = require("express");
const { ReservationFactory } = require("./domain/factories/reservationFactory");
const {
  UserPrismaRepository,
} = require("./infrastructure/repositories/userPrismaRepository");
const {
  BookPrismaRepository,
} = require("./infrastructure/repositories/bookPrismaRepository");
const {
  CategoryPrismaRepository,
} = require("./infrastructure/repositories/categoryPrismaRepository");
const {
  InventoryPrismaRepository,
} = require("./infrastructure/repositories/inventoryPrismaRepository");
const {
  ReservationPrismaRepository,
} = require("./infrastructure/repositories/reservationPrismaRepository");

const { CreateUser } = require("./application/commands/user/create-user");
const { CreateBook } = require("./application/commands/book/create-book");
const {
  CreateCategory,
} = require("./application/commands/category/create-category");
const { CreateInventory } = require("./application/commands/inventory/create-inventory");
const { CreateReservation } = require("./application/commands/reservation/create-reservation");

const { GetUser } = require("./application/queries/user/get-user");
const { GetBook } = require("./application/queries/book/get-book");
const { GetCategory } = require("./application/queries/category/get-category");
const { GetInventory } = require("./application/queries/inventory/get-inventory");
const { GetReservation } = require("./application/queries/reservation/get-reservation");

const { GetUsers } = require("./application/queries/user/get-users");
const { GetBooks } = require("./application/queries/book/get-books");
const {
  GetCategories,
} = require("./application/queries/category/get-categories");
const { GetInventories } = require("./application/queries/inventory/get-inventories");
const { GetReservations } = require("./application/queries/reservation/get-reservations");

const { UpdateUser } = require("./application/commands/user/update-user");
const { UpdateBook } = require("./application/commands/book/update-book");
const {
  UpdateCategory,
} = require("./application/commands/category/update-category");
const { UpdateInventory } = require("./application/commands/inventory/update-inventory");
const { UpdateReservation } = require("./application/commands/reservation/update-reservation");

const { DeleteUser } = require("./application/commands/user/delete-user");
const { DeleteBook } = require("./application/commands/book/delete-book");
const {
  DeleteCategory,
} = require("./application/commands/category/delete-category");
const { DeleteInventory } = require("./application/commands/inventory/delete-inventory");
const { DeleteReservation } = require("./application/commands/reservation/delete-reservation");

const { UserController } = require("./presentation/controllers/userController");
const { BookController } = require("./presentation/controllers/bookController");
const {
  CategoryController,
} = require("./presentation/controllers/categoryController");
const { InventoryController } = require("./presentation/controllers/inventoryController");
const { ReservationController } = require("./presentation/controllers/reservationController");

const userRoutes = require("./presentation/routes/userRoutes");
const bookRoutes = require("./presentation/routes/bookRoutes");
const categoryRoutes = require("./presentation/routes/categoryRoutes");
const inventoryRoutes = require("./presentation/routes/inventoryRoutes");
const reservationRoutes = require("./presentation/routes/reservationRoutes");

const app = express();
app.use(express.json());

const userRepo = new UserPrismaRepository();
const bookRepo = new BookPrismaRepository();
const categoryRepo = new CategoryPrismaRepository();
const inventoryRepo = new InventoryPrismaRepository();
const reservationRepo = new ReservationPrismaRepository();

const reservationFactory = new ReservationFactory(reservationRepo, inventoryRepo, userRepo);

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

const createInventory = new CreateInventory(inventoryRepo, bookRepo);
const getInventory = new GetInventory(inventoryRepo);
const getInventories = new GetInventories(inventoryRepo);
const updateInventory = new UpdateInventory(inventoryRepo, bookRepo);
const deleteInventory = new DeleteInventory(inventoryRepo);

const createReservation = new CreateReservation(reservationRepo, reservationFactory);
const getReservation = new GetReservation(reservationRepo);
const getReservations = new GetReservations(reservationRepo);
const updateReservation = new UpdateReservation(reservationRepo, reservationFactory);
const deleteReservation = new DeleteReservation(reservationRepo);

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

const inventoryController = new InventoryController(
  createInventory,
  getInventory,
  getInventories,
  updateInventory,
  deleteInventory,
);

const reservationController = new ReservationController(
  createReservation,
  getReservation,
  getReservations,
  updateReservation,
  deleteReservation,
);

app.use("/users", userRoutes(userController));
app.use("/books", bookRoutes(bookController));
app.use("/categories", categoryRoutes(categoryController));
app.use("/inventories", inventoryRoutes(inventoryController));
app.use("/reservations", reservationRoutes(reservationController));

module.exports = app;
