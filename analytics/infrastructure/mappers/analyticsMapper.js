const { Analytics } = require("../../domain/analytics");

class AnalyticsMapper {
  static toDomain(raw) {
    if (!raw) return null;

    //     model analytics {
    //   analytics_id        Int      @id @default(autoincrement())
    //   book_id             Int      @unique
    //   book_title          String   @db.VarChar(255)
    //   total_reservations  Int      @default(0)
    //   active_reservations Int      @default(0)
    //   last_reserved_at    DateTime?
    //   created_at          DateTime @default(now())
    //   updated_at          DateTime @updatedAt
    // }

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
