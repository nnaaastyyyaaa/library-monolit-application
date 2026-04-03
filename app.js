const express = require("express");

const userRoutes = require("./presentation/routes/userRoutes");
const bookRoutes = require("./presentation/routes/bookRoutes");
const categoryRoutes = require("./presentation/routes/categoryRoutes");
const inventoryRoutes = require("./presentation/routes/inventoryRoutes");
const reservationRoutes = require("./presentation/routes/reservationRoutes");

const userController = require("./container/user");
const bookController = require("./container/book");
const categoryController = require("./container/category");
const inventoryController = require("./container/inventory");
const reservationController = require("./container/reservation");

const app = express();
app.use(express.json());

app.use("/users", userRoutes(userController));
app.use("/books", bookRoutes(bookController));
app.use("/categories", categoryRoutes(categoryController));
app.use("/inventories", inventoryRoutes(inventoryController));
app.use("/reservations", reservationRoutes(reservationController));

module.exports = app;
