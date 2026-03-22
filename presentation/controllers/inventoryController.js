const { DomainError } = require("../../domain/errors/domainError");

class InventoryController {
  constructor(createInventory, getInventory, getInventories, updateInventory, deleteInventory) {
    this.createInventory = createInventory;
    this.getInventory = getInventory;
    this.getInventories = getInventories;
    this.updateInventory = updateInventory;
    this.deleteInventory = deleteInventory;
  }

  async create(req, res) {
    try {
      const result = await this.createInventory.execute(req.body);
      res.status(201).json(result);
    } catch (e) {
      if (e instanceof DomainError) return res.status(400).json({ error: e.message });
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res) {
    try {
      const result = await this.getInventory.execute(req.params.id);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) return res.status(400).json({ error: e.message });
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
      const result = await this.updateInventory.execute(req.params.id, req.body);
      res.json(result);
    } catch (e) {
      if (e instanceof DomainError) return res.status(400).json({ error: e.message });
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res) {
    try {
      await this.deleteInventory.execute(req.params.id);
      res.status(202).send();
    } catch (e) {
      if (e instanceof DomainError) return res.status(400).json({ error: e.message });
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { InventoryController };