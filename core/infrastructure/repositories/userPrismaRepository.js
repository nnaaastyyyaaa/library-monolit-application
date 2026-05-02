const prisma = require("../prisma/client");
const { UserRepository } = require("../../domain/repository/userRepository");
const { UserMapper } = require("../mappers/userMapper");

class UserPrismaRepository extends UserRepository {
  async create(user) {
    const data = UserMapper.toPersistence(user);

    const created = await prisma.user.create({
      data,
    });

    return UserMapper.toDomain(created);
  }

  async findById(id) {
    const data = await prisma.user.findUnique({
      where: { user_id: Number(id) },
    });

    return UserMapper.toDomain(data);
  }

  async findByEmail(email) {
    const data = await prisma.user.findFirst({
      where: { email },
    });

    return UserMapper.toDomain(data);
  }

  async findAll() {
    const data = await prisma.user.findMany();
    return data.map((user) => UserMapper.toDomain(user));
  }

  async update(id, user) {
    const data = UserMapper.toPersistence(user);

    const updated = await prisma.user.update({
      where: { user_id: Number(id) },
      data,
    });

    return UserMapper.toDomain(updated);
  }
  async delete(id) {
    return await prisma.user.delete({
      where: { user_id: Number(id) },
    });
  }
}

module.exports = { UserPrismaRepository };
