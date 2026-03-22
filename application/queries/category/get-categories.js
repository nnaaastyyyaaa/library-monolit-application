class GetCategories {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    return this.categoriesRepository.findAll();
  }
}

module.exports = { GetCategories };
