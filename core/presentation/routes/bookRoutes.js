module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post(
    "/book",
    controller.create.bind(controller),
  );
  router.get(
    "/",
    controller.getAll.bind(controller),
  );
  router.get(
    "/book/:id",
    controller.getOne.bind(controller),
  );
  router.patch(
    "/book/:id",
    controller.update.bind(controller),
  );
  router.delete(
    "/book/:id",
    controller.delete.bind(controller),
  );

  return router;
};
