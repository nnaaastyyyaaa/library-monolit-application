class UpdateCategoryCommand {
  constructor({ id, description }) {
    this.id = id;
    this.description = description;
  }
}

module.exports = { UpdateCategoryCommand };
