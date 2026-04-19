const { Reservation } = require("../../../../domain/entities/reservation");
const { DomainError } = require("../../../../domain/errors/domainError");
const ReservationCreatedEvent = require("../../../events/reservationCreated");

class CreateReservationHandler {
  constructor(
    reservationRepository,
    reservationFactory,
    inventoryRepository,
    userRepository,
    bookRepository,
    eventBus,
    authService,
  ) {
    this.reservationRepository = reservationRepository;
    this.reservationFactory = reservationFactory;
    this.inventoryRepository = inventoryRepository;
    this.userRepository = userRepository;
    this.bookRepository = bookRepository;
    this.eventBus = eventBus;
    this.authService = authService;
  }

  async execute(command) {

   await this.authService.validateUserStatus(command.user_id);

    const reservation = await this.reservationFactory.create({
      user_id: command.user_id,
      inventory_id: command.inventory_id,
      expiration_date: command.expiration_date,
    });

    const inventory = await this.inventoryRepository.findById(
      command.inventory_id,
    );
    inventory.status = "reserved";
    await this.inventoryRepository.update(inventory.id, inventory);

    const created = await this.reservationRepository.create(reservation);
    const user = await this.userRepository.findById(command.user_id);
    const book = await this.bookRepository.findById(inventory.book_id);
    if (created) {
      const event = new ReservationCreatedEvent({
        userEmail: user.email,
        bookTitle: book.title,
      });
      this.eventBus.publish("ReservationCreatedEvent", event);
    }

    return created.id;
  }
}

module.exports = { CreateReservationHandler };
