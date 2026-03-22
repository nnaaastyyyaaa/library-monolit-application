const { Category } = require("../../../domain/entities/category");

class CreateCategory {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data) {
    const isExist = await this.categoryRepository.findByName(data.name);
    if (isExist) {
      throw new Error("Category with this name already exists");
    }
    const category = new Category({
      name: data.name,
      description: data.description,
    });
    return await this.categoryRepository.create(category);
  }
}

module.exports = { CreateCategory };
