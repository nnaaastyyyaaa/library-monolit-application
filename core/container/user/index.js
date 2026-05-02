const prisma = require("../../infrastructure/prisma/client");
const {
  UserPrismaRepository,
} = require("../../infrastructure/repositories/userPrismaRepository");
const { JwtService } = require("../../application/services/jwtService");

const {
  CreateUserHandler,
} = require("../../application/commands/user/create-user/createUserHandler");
const {
  LoginHandler,
} = require("../../application/commands/user/login/loginHandler");
const {
  UpdateUserHandler,
} = require("../../application/commands/user/update-user/updateUserHandler");
const {
  DeleteUserHandler,
} = require("../../application/commands/user/delete-user/deleteUserHandler");
const {
  GetUserHandler,
} = require("../../application/queries/user/get-user/getUserHandler");
const {
  GetUsersHandler,
} = require("../../application/queries/user/get-users/getUsersHandler");

const {
  UserController,
} = require("../../presentation/controllers/userController");

const repository = new UserPrismaRepository();
const jwtService = new JwtService(process.env.JWT_SECRET, "1h");

module.exports = new UserController(
  new CreateUserHandler(repository),
  new LoginHandler(repository, jwtService),
  new UpdateUserHandler(repository),
  new DeleteUserHandler(repository),
  new GetUserHandler(prisma),
  new GetUsersHandler(prisma),
);
