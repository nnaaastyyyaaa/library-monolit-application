const {
  UserPrismaRepository,
} = require("../../infrastructure/repositories/userPrismaRepository");

const { CreateUser } = require("../../application/commands/user/create-user");
const { GetUser } = require("../../application/queries/user/get-user");
const { GetUsers } = require("../../application/queries/user/get-users");
const { UpdateUser } = require("../../application/commands/user/update-user");
const { DeleteUser } = require("../../application/commands/user/delete-user");
const { LoginUser } = require("../../application/commands/user/login");

const { JwtService } = require("../../infrastructure/auth/jwtService");

const {
  UserController,
} = require("../../presentation/controllers/userController");

const repository = new UserPrismaRepository();

module.exports = new UserController(
  new CreateUser(repository),
  new GetUser(repository),
  new GetUsers(repository),
  new UpdateUser(repository),
  new DeleteUser(repository),
  new LoginUser(repository, new JwtService(process.env.JWT_SECRET, "1h")),
);
