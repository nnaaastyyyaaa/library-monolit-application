class GetReservations {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute() {
    return this.reservationRepository.findAll();
  }
}

module.exports = { GetReservations };