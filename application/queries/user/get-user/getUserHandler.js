const { DomainError } = require("../../../../domain/errors/domainError");

class GetUserHandler {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(query) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(query.id) },
    });
    
    if (!user) {
      throw new DomainError("Cannot find user with this id");
    }
    
    return user;
  }
}

module.exports = { GetUserHandler };