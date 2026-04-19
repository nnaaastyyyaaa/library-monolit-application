const { eventBus } = require("../eventBus/eventBus");
const EmailHandler = require("../application/services/emailHandler");
const NodemailerEmailService = require("../infrastructure/services/email");

const emailService = new NodemailerEmailService();
const emailHandler = new EmailHandler(emailService);

eventBus.subscribe("ReservationCreatedEvent", (event) =>
  emailHandler.handle(event),
);

module.exports = {
  eventBus,
};
