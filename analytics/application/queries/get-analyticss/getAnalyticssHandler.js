class GetAnalyticssHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async handle() {
    return await this.prisma.analytics.findMany();
  }
}

module.exports = { GetAnalyticssHandler };