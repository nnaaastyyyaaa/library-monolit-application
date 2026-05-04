const { Analytics } = require("../../domain/analytics");

class AnalyticsMapper {
  static toDomain(raw) {
    if (!raw) return null;

    return new Analytics({
      analyticsId: raw.analytics_id,
      bookTitle: raw.book_title,
      bookId: raw.book_id,
      totalReservations: raw.total_reservations,
      activeReservations: raw.active_reservations,
      lastReservedAt: raw.last_reserved_at,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }

  static toPersistence(domainObj) {
    return {
      book_id: domainObj.bookId,
      book_title: domainObj.bookTitle,
      total_reservations: domainObj.totalReservations,
      active_reservations: domainObj.activeReservations,
      last_reserved_at: domainObj.lastReservedAt,
    };
  }
}

module.exports = { AnalyticsMapper };
