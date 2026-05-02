const { Category } = require("../../../../domain/entities/category");
const { DomainError } = require("../../../../domain/errors/domainError");

class CreateCategoryHandler {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(command) {
    const isExist = await this.categoryRepository.findByName(command.name);
    if (isExist) {
      throw new DomainError("Category with this name already exists");
    }
    const category = new Category({
      name: command.name,
      description: command.description,
    });
    const created = await this.categoryRepository.create(category);
    return created.id;
  }
}

module.exports = { CreateCategoryHandler };
