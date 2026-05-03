const { AnalyticsError } = require("../domain/errors/analyticsError");

class AnalyticsController {
  constructor(getAnalytics, getAnalyticss, deleteAnalytics) {
    this.getAnalytics = getAnalytics;
    this.getAnalyticss = getAnalytics;
    this.deleteAnalytics = deleteAnalytics;
  }

  async getOne(req, res) {}

  async getAll(req, res) {}

  async delete(req, res) {}
}

module.exports = { AnalyticsController };
