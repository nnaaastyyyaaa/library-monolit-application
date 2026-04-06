const { Reservation } = require("../../../../domain/entities/reservation");
const { DomainError } = require("../../../../domain/errors/domainError");

class CreateReservationHandler {
  constructor(reservationRepository, reservationFactory, inventoryRepository) {
    this.reservationRepository = reservationRepository;
    this.reservationFactory = reservationFactory;
    this.inventoryRepository = inventoryRepository;
  }

  async execute(command) {
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

    return created.id;
  }
}

module.exports = { CreateReservationHandler };
