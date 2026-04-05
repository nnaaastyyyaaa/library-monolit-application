const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post(
    "/reservation",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.create.bind(controller),
  );
  router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.getAll.bind(controller),
  );
  router.get(
    "/reservation/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.getOne.bind(controller),
  );
  router.patch(
    "/reservation/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.update.bind(controller),
  );
  router.delete(
    "/reservation/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.delete.bind(controller),
  );

  return router;
};
