const { DomainError } = require("../../../../domain/errors/domainError");
const ReservationCancelledEvent = require("../../../events/reservationCancelled");

class CancellReservationHandler {
  constructor(
    reservationRepository,
    inventoryRepository,
    eventBus,
    authService,
  ) {
    this.reservationRepository = reservationRepository;
    this.inventoryRepository = inventoryRepository;
    this.eventBus = eventBus;
    this.authService = authService;
  }

  async execute(command) {
    this.authService.validateToken(command.token);
    const reservation = await this.reservationRepository.findById(command.id);

    if (!reservation) {
      throw new DomainError("Reservation not found");
    }

    const inventory = await this.inventoryRepository.findById(
      reservation.inventory_id,
    );
    inventory.status = "available";

    await this.inventoryRepository.update(inventory.id, inventory);

    const cancelled = reservation.cancell();

    const updated = await this.reservationRepository.update(
      command.id,
      cancelled,
    );

    if (updated) {
      const event = new ReservationCancelledEvent({
        bookId: inventory.book_id,
      });
      this.eventBus.publish("ReservationCancelledEvent", event);
    }

    return updated.id;
  }
}

module.exports = { CancellReservationHandler };
