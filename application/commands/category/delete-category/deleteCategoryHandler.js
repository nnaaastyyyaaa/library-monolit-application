const { DomainError } = require("../../../../domain/errors/domainError");

class DeleteCategoryHandler {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute(command) {
    const category = await this.categoryRepository.findById(command.id);
    if (!category) {
      throw new DomainError("Category not found");
    }

    return await this.categoryRepository.delete(command.id);
  }
}

module.exports = { DeleteCategoryHandler };
