module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post(
    "/reservation",
    controller.create.bind(controller),
  );
  router.get(
    "/",
    controller.getAll.bind(controller),
  );
  router.get(
    "/reservation/:id",
    controller.getOne.bind(controller),
  );
  router.patch(
    "/reservation/:id",
    controller.update.bind(controller),
  );
  router.delete(
    "/reservation/:id",
    controller.delete.bind(controller),
  );

  return router;
};
