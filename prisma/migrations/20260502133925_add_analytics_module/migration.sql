-- CreateTable
CREATE TABLE "public"."analytics" (
    "analytics_id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "book_title" VARCHAR(255) NOT NULL,
    "total_reservations" INTEGER NOT NULL DEFAULT 0,
    "active_reservations" INTEGER NOT NULL DEFAULT 0,
    "last_reserved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("analytics_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "analytics_book_id_key" ON "public"."analytics"("book_id");
