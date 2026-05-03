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
      analytics_id: raw.analytics_id,
      book_title: raw.book_title,
      book_id: raw.book_id,
      total_reservations: raw.total_reservations,
      active_reservations: raw.active_reservations,
      last_reserved_at: raw.last_reserved_at,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });
  }

  static toPersistence(book) {
    return {
      book_id: book.bookId, 
      book_title: book.bookTitle,
      total_reservations: book.totalReservations,
      active_reservations: book.activeReservations,
      last_reserved_at: book.lastReservedAt,
    };
  }
}

module.exports = { AnalyticsMapper };
