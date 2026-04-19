const { EventBus } = require("../application/events/eventBus");

const eventBus = new EventBus();

module.exports = {
  eventBus,
};
