const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post(
    "/category",
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
    "/category/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.getOne.bind(controller),
  );
  router.patch(
    "/category/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.update.bind(controller),
  );
  router.delete(
    "/category/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.delete.bind(controller),
  );

  return router;
};
