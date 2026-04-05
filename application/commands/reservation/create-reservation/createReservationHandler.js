const { Reservation } = require("../../../../domain/entities/reservation");
const { DomainError } = require("../../../../domain/errors/domainError");

class CreateReservationHandler {
  constructor(reservationRepository, inventoryRepository) {
    this.reservationRepository = reservationRepository;
    this.inventoryRepository = inventoryRepository;
  }

  async execute(command) {
    const inventory = await this.inventoryRepository.findById(command.inventory_id);
    if (!inventory) {
       throw new DomainError("Inventory item not found");
    }

    const reservation = new Reservation({
      user_id: command.user_id,
      inventory_id: command.inventory_id,
      status: command.status || "pending"
    });

    const created = await this.reservationRepository.create(reservation);
    
    return created.id; 
  }
}

module.exports = { CreateReservationHandler };