const { Category } = require("../../../domain/entities/category");
const { DomainError } = require("../../../domain/errors/domainError");

class CreateCategory {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data) {
    const isExist = await this.categoryRepository.findByName(data.name);
    if (isExist) {
      throw new DomainError("Category with this name already exists");
    }
    const category = new Category({
      name: data.name,
      description: data.description,
    });
    return await this.categoryRepository.create(category);
  }
}

module.exports = { CreateCategory };
