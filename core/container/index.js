const eventBus = require("../../eventBus/eventBus");
const EmailHandler = require("../application/services/emailService");
const NodemailerEmailService = require("../infrastructure/services/email");

const emailService = new NodemailerEmailService();
const emailHandler = new EmailHandler(emailService);

try {
  eventBus.subscribe("ReservationCreatedEvent", (event) =>
    emailHandler.handle(event),
  );
} catch (e) {
  console.log(e);
}

module.exports = {
  eventBus,
};
