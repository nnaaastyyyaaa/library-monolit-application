class GetUsersHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    return await this.prisma.user.findMany();
  }
}

module.exports = { GetUsersHandler };