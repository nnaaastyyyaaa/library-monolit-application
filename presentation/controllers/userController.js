class UserController {
  constructor(createUser, getUser, getUsers, updateUser, deleteUser) {
    this.createUser = createUser;
    this.getUser = getUser;
    this.getUsers = getUsers;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
  }

  async create(req, res) {
    const result = await this.createUser.execute(req.body);
    res.status(201).json(result);
  }

  async getOne(req, res) {
    const result = await this.getUser.execute(req.params.id);
    res.json(result);
  }

  async getAll(req, res) {
    const result = await this.getUsers.execute();
    res.json(result);
  }

  async update(req, res) {
    const result = await this.updateUser.execute(req.params.id, req.body);
    res.json(result);
  }

  async delete(req, res) {
    const result = await this.deleteUser.execute(req.params.id);
    res.status(202).send();
  }
}

module.exports = { UserController };
