class GetAnalyticsHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async handle(query) {
    const { id } = query;
    const analytics = await this.prisma.analytics.findUnique({
      where: { analytics_id: Number(id) }
    });
    
    if (!analytics) {
      throw new Error('Analytics record not found');
    }

    return analytics;
  }
}

module.exports = { GetAnalyticsHandler };