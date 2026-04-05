const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

module.exports = (controller) => {
  const express = require("express");
  const router = express.Router();

  router.post(
    "/user",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.create.bind(controller),
  );
  router.post("/login", controller.login.bind(controller));
  router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.getAll.bind(controller),
  );
  router.get(
    "/user/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.getOne.bind(controller),
  );
  router.patch(
    "/user/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    controller.update.bind(controller),
  );
  router.delete(
    "/user/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    controller.delete.bind(controller),
  );

  return router;
};
