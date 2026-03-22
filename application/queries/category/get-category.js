const { DomainError } = require("../../../domain/errors/domainError");

class GetCategory {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute(id) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new DomainError("Cannot find category with this id");
    }
    return category;
  }
}

module.exports = { GetCategory };
