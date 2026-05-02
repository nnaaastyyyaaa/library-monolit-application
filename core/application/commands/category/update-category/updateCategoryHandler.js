const { DomainError } = require("../../../../domain/errors/domainError");

class UpdateCategoryHandler {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute(command) {
    const category = await this.categoryRepository.findById(command.id);
    if (!category) {
      throw new DomainError("category not found");
    }
    if (command.description) {
      category.changeDescription(command.description);
    }

    await this.categoryRepository.update(command.id, category);
  }
}

module.exports = { UpdateCategoryHandler };
