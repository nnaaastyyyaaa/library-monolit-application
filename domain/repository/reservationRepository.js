class ReservationRepository {
  async findAll() {}
  async findById(id) {}
  async findActiveByInventory(inventoryId) {}
  async create(reservation) {}
  async update(id, data) {}
  async delete(id) {}
}

module.exports = { ReservationRepository };