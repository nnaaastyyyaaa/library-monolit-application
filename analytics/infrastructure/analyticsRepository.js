const prisma = require("./prisma/client");
const {
  AnalyticsMapper,
} = require("../infrastructure/mappers/analyticsMapper");

class AnalyticsRepository {
  async create(analytics) {
    const data = AnalyticsMapper.toPersistence(analytics);
    const created = await prisma.analytics.create({
      data,
    });

    return AnalyticsMapper.toDomain(created);
  }

  async findById(id) {
    const data = await prisma.analytics.findUnique({
      where: { analytics_id: Number(id) },
    });

    return AnalyticsMapper.toDomain(data);
  }

  async findByBookId(id) {
    const data = await prisma.analytics.findUnique({
      where: { book_id: Number(id) },
    });

    return AnalyticsMapper.toDomain(data);
  }

  async findAll() {
    const data = await prisma.analytics.findMany();
    return data.map((analytics) => AnalyticsMapper.toDomain(analytics));
  }

  async update(id, analytics) {
    const data = AnalyticsMapper.toPersistence(analytics);

    const updated = await prisma.analytics.update({
      where: { analytics_id: Number(id) },
      data,
    });

    return AnalyticsMapper.toDomain(updated);
  }
  async delete(id) {
    return await prisma.analytics.delete({
      where: { analytics_id: Number(id) },
    });
  }
}

module.exports = { AnalyticsRepository };
