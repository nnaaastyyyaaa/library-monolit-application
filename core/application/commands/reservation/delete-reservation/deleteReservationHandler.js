const { DomainError } = require("../../../../domain/errors/domainError");

class DeleteReservationHandler {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute(command) {
    const reservation = await this.reservationRepository.findById(command.id);
    if (!reservation) {
      throw new DomainError("Reservation not found");
    }

    await this.reservationRepository.delete(command.id);
    
    return;
  }
}

module.exports = { DeleteReservationHandler };