const { DomainError } = require("../../domain/errors/domainError");

class UserController {
  constructor(
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
  ) {
    this.createUser = createUser;
    this.getUser = getUser;
    this.getUsers = getUsers;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
    this.loginUser = loginUser;
  }

  async create(req, res) {
    try {
      const result = await this.createUser.execute(req.body);
      console.log(result);
      res.status(201).json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async login(req, res) {
    try {
      const token = await this.loginUser.execute(req.body);
      console.log(token);
      res.status(200).json({ token });
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ e });
    }
  }

  async getOne(req, res) {
    try {
      const result = await this.getUser.execute(req.params.id);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.getUsers.execute();
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async update(req, res) {
    try {
      const result = await this.updateUser.execute(req.params.id, req.body);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.deleteUser.execute(req.params.id);
      res.status(202).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { UserController };
