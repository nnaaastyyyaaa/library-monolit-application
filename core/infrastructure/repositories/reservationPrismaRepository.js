const prisma = require("../prisma/client");
const {
  ReservationRepository,
} = require("../../domain/repository/reservationRepository");
const { ReservationMapper } = require("../mappers/reservationMapper");

class ReservationPrismaRepository extends ReservationRepository {
  async create(reservation) {
    const data = ReservationMapper.toPersistence(reservation);

    const created = await prisma.reservation.create({
      data: {
        reservation_date: data.reservation_date,
        expiration_date: data.expiration_date,
        status: data.status,
        user: { connect: { user_id: Number(data.user_id) } },
        inventory: { connect: { inventory_id: Number(data.inventory_id) } },
      },
    });

    return ReservationMapper.toDomain(created);
  }

  async findById(id) {
    const data = await prisma.reservation.findUnique({
      where: { reservation_id: Number(id) },
      include: {
        user: true,
        inventory: true,
      },
    });

    return ReservationMapper.toDomain(data);
  }

  async findAll() {
    const data = await prisma.reservation.findMany();
    return data.map((res) => ReservationMapper.toDomain(res));
  }

  async findActiveByInventory(inventoryId) {
    const data = await prisma.reservation.findFirst({
      where: {
        inventory_id: Number(inventoryId),
        status: "active",
      },
    });

    return ReservationMapper.toDomain(data);
  }

  async update(id, reservation) {
    const data = ReservationMapper.toPersistence(reservation);

    const updated = await prisma.reservation.update({
      where: { reservation_id: Number(id) },
      data: {
        reservation_date: data.reservation_date,
        expiration_date: data.expiration_date,
        status: data.status,
        user_id: Number(data.user_id),
        inventory_id: Number(data.inventory_id),
      },
    });

    return ReservationMapper.toDomain(updated);
  }

  async delete(id) {
    return await prisma.reservation.delete({
      where: { reservation_id: Number(id) },
    });
  }
}

module.exports = { ReservationPrismaRepository };
