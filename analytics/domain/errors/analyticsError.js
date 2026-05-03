class AnalyticsError extends Error {
  constructor(message) {
    super(message);
    this.name = "AnalyticsError";
  }
}

module.exports = { AnalyticsError };
