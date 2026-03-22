const { DomainError } = require("../../../domain/errors/domainError");

class DeleteCategory {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute(id) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new DomainError("Category not found");
    }

    return await this.categoryRepository.delete(id);
  }
}

module.exports = { DeleteCategory };
