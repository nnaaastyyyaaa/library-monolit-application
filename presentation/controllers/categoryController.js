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
    const result = await this.createCategory.execute(req.body);
    res.status(201).json(result);
  }

  async getOne(req, res) {
    const result = await this.getCategory.execute(req.params.id);
    res.json(result);
  }

  async getAll(req, res) {
    const result = await this.getCategories.execute();
    res.json(result);
  }

  async update(req, res) {
    const result = await this.updateCategory.execute(req.params.id, req.body);
    res.json(result);
  }

  async delete(req, res) {
    const result = await this.deleteCategory.execute(req.params.id);
    res.status(202).send();
  }
}

module.exports = { CategoryController };
