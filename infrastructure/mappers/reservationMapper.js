const { Reservation } = require("../../domain/entities/reservation");

class ReservationMapper {
  static toDomain(raw) {
    if (!raw) return null;
    return new Reservation({
      id: raw.reservation_id,
      reservation_date: raw.reservation_date,
      expiration_date: raw.expiration_date,
      status: raw.status,
      user_id: raw.user_id,
      inventory_id: raw.inventory_id,
    });
  }

  static toPersistence(domain) {
    return {
      reservation_date: domain.reservation_date,
      expiration_date: domain.expiration_date,
      status: domain.status,
      user_id: domain.user_id,
      inventory_id: domain.inventory_id,
    };
  }
}

module.exports = { ReservationMapper };