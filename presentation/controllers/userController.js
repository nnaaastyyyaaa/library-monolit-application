const { DomainError } = require("../../domain/errors/domainError");
const {
  CreateUserCommand,
} = require("../../application/commands/user/create-user/createUserCommand");
const {
  LoginCommand,
} = require("../../application/commands/user/login/loginCommand");
const {
  UpdateUserCommand,
} = require("../../application/commands/user/update-user/updateUserCommand");
const {
  DeleteUserCommand,
} = require("../../application/commands/user/delete-user/deleteUserCommand");
const {
  GetUserQuery,
} = require("../../application/queries/user/get-user/getUserQuery");
const {
  GetUsersQuery,
} = require("../../application/queries/user/get-users/getUsersQuery");

class UserController {
  constructor(
    createUserHandler,
    loginHandler,
    updateUserHandler,
    deleteUserHandler,
    getUserHandler,
    getUsersHandler,
  ) {
    this.createUserHandler = createUserHandler;
    this.loginHandler = loginHandler;
    this.updateUserHandler = updateUserHandler;
    this.deleteUserHandler = deleteUserHandler;
    this.getUserHandler = getUserHandler;
    this.getUsersHandler = getUsersHandler;
  }

  async create(req, res, next) {
    try {
      const command = new CreateUserCommand(req.body);
      const userId = await this.createUserHandler.execute(command);
      res.status(201).json({ id: userId });
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async login(req, res, next) {
    try {
      const command = new LoginCommand(req.body);
      const token = await this.loginHandler.execute(command);
      res.json({ token });
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async update(req, res, next) {
    try {
      const command = new UpdateUserCommand({ id: req.params.id, ...req.body });
      await this.updateUserHandler.execute(command);
      res.status(204).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res, next) {
    try {
      const command = new DeleteUserCommand({ id: req.params.id });
      await this.deleteUserHandler.execute(command);
      res.status(204).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res, next) {
    try {
      const query = new GetUserQuery({ id: req.params.id });
      const user = await this.getUserHandler.execute(query);
      res.json(user);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getAll(req, res, next) {
    try {
      const query = new GetUsersQuery();
      const users = await this.getUsersHandler.execute(query);
      res.json(users);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { UserController };
