const { DomainError } = require("../../../domain/errors/domainError");

class DeleteReservation {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }
  async execute(id) {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new DomainError("Reservation not found");
    }

    return await this.reservationRepository.delete(id);
  }
}

module.exports = { DeleteReservation };