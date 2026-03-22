const prisma = require("../prisma/client");
const { InventoryRepository } = require("../../domain/repository/inventoryRepository");
const { InventoryMapper } = require("../mappers/inventoryMapper");

class InventoryPrismaRepository extends InventoryRepository {
  async create(inventory) {
    const data = InventoryMapper.toPersistence(inventory);
    const created = await prisma.inventory.create({ data });
    return InventoryMapper.toDomain(created);
  }

  async findById(id) {
    const data = await prisma.inventory.findUnique({ where: { inventory_id: Number(id) } });
    return InventoryMapper.toDomain(data);
  }

  async findByNumber(number) {
    const data = await prisma.inventory.findFirst({ where: { inventory_number: Number(number) } });
    return InventoryMapper.toDomain(data);
  }

  async findAll() {
    const data = await prisma.inventory.findMany();
    return data.map(item => InventoryMapper.toDomain(item));
  }

  async update(id, inventory) {
    const data = InventoryMapper.toPersistence(inventory);
    const updated = await prisma.inventory.update({
      where: { inventory_id: Number(id) },
      data,
    });
    return InventoryMapper.toDomain(updated);
  }

  async delete(id) {
    return await prisma.inventory.delete({ where: { inventory_id: Number(id) } });
  }
}

module.exports = { InventoryPrismaRepository };