module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post("/category", controller.create.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  router.get("/category/:id", controller.getOne.bind(controller));
  router.patch("/category/:id", controller.update.bind(controller));
  router.delete("/category/:id", controller.delete.bind(controller));

  return router;
};
