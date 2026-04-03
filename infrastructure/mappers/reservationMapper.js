const { Reservation } = require("../../domain/entities/reservation");
const {
  ReservationPeriod,
} = require("../../domain/value-oblects/reservation-period");
class ReservationMapper {
  static toDomain(raw) {
    if (!raw) return null;
    return new Reservation({
      id: raw.reservation_id,
      period: new ReservationPeriod({
        reservationDate: raw.reservation_date,
        expirationDate: raw.expiration_date,
      }),
      status: raw.status,
      user_id: raw.user_id,
      inventory_id: raw.inventory_id,
    });
  }

  static toPersistence(domain) {
    return {
      reservation_date: domain.period.reservationDate,
      expiration_date: domain.period.expirationDate,
      status: domain.status,
      user_id: domain.user_id,
      inventory_id: domain.inventory_id,
    };
  }
}

module.exports = { ReservationMapper };
