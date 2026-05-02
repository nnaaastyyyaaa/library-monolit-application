const { DomainError } = require("../../domain/errors/domainError");

const {
  CreateCategoryCommand,
} = require("../../application/commands/category/create-category/createCategoryCommand");
const {
  DeleteCategoryCommand,
} = require("../../application/commands/category/delete-category/deleteCategoryCommand");
const {
  UpdateCategoryCommand,
} = require("../../application/commands/category/update-category/updateCategoryCommand");
const {
  GetCategoryQuery,
} = require("../../application/queries/category/get-category/getCategoryQuery");

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
      const command = new CreateCategoryCommand(req.body);
      const id = await this.createCategory.execute(command);
      res.status(201).json({ id });
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async getOne(req, res) {
    try {
      const query = new GetCategoryQuery({ id: req.params.id });
      const result = await this.getCategory.execute(query);
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
      const command = new UpdateCategoryCommand({
        id: req.params.id,
        ...req.body,
      });
      await this.updateCategory.execute(command);
      res.status(200).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }

  async delete(req, res) {
    try {
      const command = new DeleteCategoryCommand({ id: req.params.id });
      await this.deleteCategory.execute(command);
      res.status(204).send();
    } catch (e) {
      if (e instanceof DomainError) {
        return res.status(400).json({ error: e.message });
      }
      res.status(500).json({ error: "Internal error" });
    }
  }
}

module.exports = { CategoryController };
