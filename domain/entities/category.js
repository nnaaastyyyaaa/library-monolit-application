class Category {
  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
  changeName(name) {
    this.name = name;
  }
  changeDescription(description) {
    this.description = description;
  }
}

module.exports = { Category };
