const express = require("express");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
