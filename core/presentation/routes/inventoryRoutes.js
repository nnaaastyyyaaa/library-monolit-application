module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post(
    "/inventory",
    controller.create.bind(controller),
  );
  router.get(
    "/",
    controller.getAll.bind(controller),
  );
  router.get(
    "/inventory/:id",
    controller.getOne.bind(controller),
  );
  router.patch(
    "/inventory/:id",
    controller.update.bind(controller),
  );
  router.delete(
    "/inventory/:id",
    controller.delete.bind(controller),
  );

  return router;
};
