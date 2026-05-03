const { AnalyticsError } = require("../domain/errors/analyticsError");

class AnalyticsController {
  constructor(getAnalytics, getAnalyticss, deleteAnalytics) {
    this.getAnalytics = getAnalytics;
    this.getAnalyticss = getAnalyticss;
    this.deleteAnalytics = deleteAnalytics;
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.getAnalytics.handle({ id });
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof AnalyticsError) {
        return res.status(400).json({ error: error.message });
      }
      if (next) next(error);
      else res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await this.getAnalyticss.handle();
      res.status(200).json(result);
    } catch (error) {
      if (next) next(error);
      else res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.deleteAnalytics.handle({ id });
      res.status(204).send();
    } catch (error) {
      if (error instanceof AnalyticsError) {
        return res.status(400).json({ error: error.message });
      }
      if (next) next(error);
      else res.status(500).json({ error: error.message });
    }
  }
}

module.exports = { AnalyticsController };