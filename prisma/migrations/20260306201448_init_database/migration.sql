-- CreateEnum
CREATE TYPE "public"."inv_status" AS ENUM ('available', 'reserved', 'borrowed', 'lost');

-- CreateEnum
CREATE TYPE "public"."res_status" AS ENUM ('active', 'cancelled', 'completed');

-- CreateTable
CREATE TABLE "public"."user" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "email" VARCHAR(32) NOT NULL,
    "password" VARCHAR(32) NOT NULL,
    "phone_number" VARCHAR(20),
    "role" VARCHAR(32) NOT NULL DEFAULT 'user',

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(32) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."book" (
    "book_id" SERIAL NOT NULL,
    "title" VARCHAR(32) NOT NULL,
    "author" VARCHAR(32) NOT NULL,
    "isbn" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "published_year" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "public"."inventory" (
    "inventory_id" SERIAL NOT NULL,
    "inventory_number" INTEGER NOT NULL,
    "status" "public"."inv_status" NOT NULL DEFAULT 'available',
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("inventory_id")
);

-- CreateTable
CREATE TABLE "public"."reservation" (
    "reservation_id" SERIAL NOT NULL,
    "reservation_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "expiration_date" DATE NOT NULL,
    "status" "public"."res_status" NOT NULL DEFAULT 'active',
    "user_id" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- AddForeignKey
ALTER TABLE "public"."book" ADD CONSTRAINT "book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book"("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reservation" ADD CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reservation" ADD CONSTRAINT "reservation_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventory"("inventory_id") ON DELETE CASCADE ON UPDATE NO ACTION;
