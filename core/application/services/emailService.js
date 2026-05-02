const processedEvents = new Set();

class EmailHandler {
  constructor(emailService) {
    this.emailService = emailService;
  }

  async handle(event) {
    console.log("Will handle event");
    if (processedEvents.has(event.id)) {
      return;
    }

    processedEvents.add(event.id);

    try {
      await this.emailService.sendReservationEmail({
        email: event.userEmail,
        bookTitle: event.bookTitle,
      });
      console.log(`Handled event for ${event.userEmail}`);
    } catch (e) {
      console.error("Email failed:", e.message);
    }
  }
}

module.exports = EmailHandler;
