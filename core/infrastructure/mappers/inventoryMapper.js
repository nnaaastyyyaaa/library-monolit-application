const { Inventory } = require("../../domain/entities/inventory");

class InventoryMapper {
  static toDomain(raw) {
    if (!raw) return null;
    return new Inventory({
      id: raw.inventory_id,
      inventory_number: raw.inventory_number,
      status: raw.status,
      book_id: raw.book_id,
    });
  }

  static toPersistence(domain) {
    return {
      inventory_number: domain.inventory_number,
      status: domain.status,
      book_id: domain.book_id,
    };
  }
}

module.exports = { InventoryMapper };