module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post("/user", controller.create.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  router.get("/user/:id", controller.getOne.bind(controller));
  router.patch("/user/:id", controller.update.bind(controller));
  router.delete("/user/:id", controller.delete.bind(controller));

  return router;
};
