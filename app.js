const express = require("express");

const userRoutes = require("./core/presentation/routes/userRoutes");
const bookRoutes = require("./core/presentation/routes/bookRoutes");
const categoryRoutes = require("./core/presentation/routes/categoryRoutes");
const inventoryRoutes = require("./core/presentation/routes/inventoryRoutes");
const reservationRoutes = require("./core/presentation/routes/reservationRoutes");

const userController = require("./core/container/user");
const bookController = require("./core/container/book");
const categoryController = require("./core/container/category");
const inventoryController = require("./core/container/inventory");
const reservationController = require("./core/container/reservation");

require("./core/container/index");

const app = express();
app.use(express.json());

app.use("/users", userRoutes(userController));
app.use("/books", bookRoutes(bookController));
app.use("/categories", categoryRoutes(categoryController));
app.use("/inventories", inventoryRoutes(inventoryController));
app.use("/reservations", reservationRoutes(reservationController));

module.exports = app;
