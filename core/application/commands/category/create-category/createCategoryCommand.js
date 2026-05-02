class CreateCategoryCommand {
  constructor({ name, description }) {
    this.name = name;
    this.description = description;
  }
}

module.exports = { CreateCategoryCommand };
