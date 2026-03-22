const { DomainError } = require("../../../domain/errors/domainError");

class UpdateReservation {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }
  async execute(id, data) {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new DomainError("Reservation not found");
    }

    if (data.status) {
      reservation.status = data.status;
    }
    
    if (data.expiration_date) {
      if (new Date(data.expiration_date) <= new Date()) {
        throw new DomainError("New expiration date must be in the future");
      }
      reservation.expiration_date = data.expiration_date;
    }

    return await this.reservationRepository.update(id, reservation);
  }
}

module.exports = { UpdateReservation };