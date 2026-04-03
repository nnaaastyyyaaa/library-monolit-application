class CreateReservation {
  constructor(reservationRepository, reservationFactory) {
    this.reservationRepository = reservationRepository;
    this.reservationFactory = reservationFactory;
  }

  async execute(data) {
    const reservation = await this.reservationFactory.create(data);

    return await this.reservationRepository.create(reservation);
  }
}

module.exports = { CreateReservation };
