const { DomainError } = require("../../../../domain/errors/domainError");

class GetReservationHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(query) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { reservation_id: Number(query.id) },
      include: {
        user: true,
        inventory: true,
      },
    });

    if (!reservation) {
      throw new DomainError("Reservation not found");
    }

    return reservation;
  }
}

module.exports = { GetReservationHandler };