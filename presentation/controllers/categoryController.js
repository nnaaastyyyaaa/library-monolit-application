const { DomainError } = require("../../domain/errors/domainError");

class CategoryController {
  constructor(
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
  ) {
    this.createCategory = createCategory;
    this.getCategory = getCategory;
    this.getCategories = getCategories;
    this.updateCategory = updateCategory;
    this.deleteCategory = deleteCategory;
  }

  async create(req, res) {
    try {
      const result = await this.createCategory.execute(req.body);
      res.status(201).json(result);
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res) {
    try {
      const result = await this.getCategory.execute(req.params.id);
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
      const result = await this.getCategories.execute();
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
      const result = await this.updateCategory.execute(req.params.id, req.body);
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
      const result = await this.deleteCategory.execute(req.params.id);
      res.status(202).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { CategoryController };
