const { DomainError } = require("../../../domain/errors/domainError");

class UpdateCategory {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute(id, data) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new DomainError("category not found");
    }
    if (data.name) {
      const isExist = await this.categoryRepository.findByName(data.name);
      if (isExist) {
        throw new DomainError("Category with this name already exists");
      }
      category.changeName(data.name);
    }
    if (data.description) {
      category.changeDescription(data.description);
    }

    return await this.categoryRepository.update(id, category);
  }
}

module.exports = { UpdateCategory };
