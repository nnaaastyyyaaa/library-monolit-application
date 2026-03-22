const { DomainError } = require("../../../domain/errors/domainError");

class GetReservation {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute(id) {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new DomainError("Cannot find reservation with this id");
    }
    return reservation;
  }
}

module.exports = { GetReservation };