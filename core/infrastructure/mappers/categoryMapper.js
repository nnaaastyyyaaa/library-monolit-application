const { Category } = require("../../domain/entities/category");

class CategoryMapper {
  static toDomain(raw) {
    if (!raw) return null;

    return new Category({
      id: raw.category_id,
      name: raw.category_name,
      description: raw.description,
    });
  }

  static toPersistence(category) {
    return {
      category_name: category.name,
      description: category.description,
    };
  }
}

module.exports = { CategoryMapper };
