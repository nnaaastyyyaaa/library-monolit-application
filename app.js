const express = require("express");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reservations", reservationRoutes);

module.exports = app;
