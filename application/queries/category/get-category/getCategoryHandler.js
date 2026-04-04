const { DomainError } = require("../../../../domain/errors/domainError");

class GetCategoryHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async execute(query) {
    console.log(query);
    const category = await this.prisma.category.findUnique({
      where: { category_id: Number(query.id) },
    });
    console.log(category);
    if (!category) {
      throw new DomainError("Cannot find category with this id");
    }
    return category;
  }
}

module.exports = { GetCategoryHandler };
