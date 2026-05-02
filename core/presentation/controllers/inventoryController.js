const { DomainError } = require("../../domain/errors/domainError");
const {
  CreateInventoryCommand,
} = require("../../application/commands/inventory/create-inventory/createInventoryCommand");
const {
  UpdateInventoryCommand,
} = require("../../application/commands/inventory/update-inventory/updateInventoryCommand");
const {
  DeleteInventoryCommand,
} = require("../../application/commands/inventory/delete-inventory/deleteInventoryCommand");
const {
  GetInventoryQuery,
} = require("../../application/queries/inventory/get-inventory/getInventoryQuery");

class InventoryController {
  constructor(
    createInventory,
    getInventory,
    getInventories,
    updateInventory,
    deleteInventory,
  ) {
    this.createInventory = createInventory;
    this.getInventory = getInventory;
    this.getInventories = getInventories;
    this.updateInventory = updateInventory;
    this.deleteInventory = deleteInventory;
  }

  async create(req, res) {
    try {
      const command = new CreateInventoryCommand(req.body);
      const result = await this.createInventory.execute(command);
      res.status(201).json(result);
    } catch (e) {
      if (e instanceof DomainError)
        return res.status(400).json({ error: e.message });
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res) {
    try {
      const query = new GetInventoryQuery({ id: req.params.id });
      const result = await this.getInventory.execute(query);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError)
        return res.status(400).json({ error: e.message });
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.getInventories.execute();
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: "Internal error" });
    }
  }

  async update(req, res) {
    try {
      const command = new UpdateInventoryCommand({
        id: req.params.id,
        ...req.body,
      });
      const result = await this.updateInventory.execute(command);
      res.status(200).json(result);
    } catch (e) {
      if (e instanceof DomainError)
        return res.status(400).json({ error: e.message });
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res) {
    try {
      const command = new DeleteInventoryCommand({ id: req.params.id });
      await this.deleteInventory.execute(command);
      res.status(204).send();
    } catch (e) {
      if (e instanceof DomainError)
        return res.status(400).json({ error: e.message });
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { InventoryController };
