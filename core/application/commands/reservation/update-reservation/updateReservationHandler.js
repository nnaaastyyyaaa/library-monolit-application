const { DomainError } = require("../../../../domain/errors/domainError");

class UpdateReservationHandler {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute(command) {
    const reservation = await this.reservationRepository.findById(command.id);
    if (!reservation) {
      throw new DomainError("Reservation not found");
    }

    if (command.status) {
      reservation.status = command.status;
    }
    
    if (command.expiration_date) {
      if (new Date(command.expiration_date) <= new Date()) {
        throw new DomainError("New expiration date must be in the future");
      }
      reservation.expiration_date = command.expiration_date;
    }

    await this.reservationRepository.update(command.id, reservation);
    
    return;
  }
}

module.exports = { UpdateReservationHandler };