class GetReservationsHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    return await this.prisma.reservation.findMany({
      include: {
        user: true,
        inventory: true,
      },
    });
  }
}

module.exports = { GetReservationsHandler };