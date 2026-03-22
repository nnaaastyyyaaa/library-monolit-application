const prisma = require("../prisma/client");
const {
  CategoryRepository,
} = require("../../domain/repository/categoryRepository");
const { CategoryMapper } = require("../mappers/categoryMapper");

class CategoryPrismaRepository extends CategoryRepository {
  async create(category) {
    const data = CategoryMapper.toPersistence(category);

    const created = await prisma.category.create({
      data,
    });

    return CategoryMapper.toDomain(created);
  }

  async findById(id) {
    const data = await prisma.category.findUnique({
      where: { category_id: Number(id) },
    });

    return CategoryMapper.toDomain(data);
  }

  async findByName(name) {
    const data = await prisma.category.findFirst({
      where: { category_name: name },
    });

    return CategoryMapper.toDomain(data);
  }

  async findAll() {
    const data = await prisma.category.findMany();
    return data.map((category) => CategoryMapper.toDomain(category));
  }

  async update(id, category) {
    const data = CategoryMapper.toPersistence(category);

    const updated = await prisma.category.update({
      where: { category_id: Number(id) },
      data,
    });

    return CategoryMapper.toDomain(updated);
  }
  async delete(id) {
    return await prisma.category.delete({
      where: { category_id: Number(id) },
    });
  }
}

module.exports = { CategoryPrismaRepository };
