const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post(
    "/book",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.create.bind(controller),
  );
  router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.getAll.bind(controller),
  );
  router.get(
    "/book/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.getOne.bind(controller),
  );
  router.patch(
    "/book/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.update.bind(controller),
  );
  router.delete(
    "/book/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.delete.bind(controller),
  );

  return router;
};
