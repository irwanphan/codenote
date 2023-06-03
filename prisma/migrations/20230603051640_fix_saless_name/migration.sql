/*
  Warnings:

  - You are about to drop the `sales_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saless` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sales_details" DROP CONSTRAINT "sales_details_salesId_fkey";

-- DropForeignKey
ALTER TABLE "saless" DROP CONSTRAINT "saless_userId_fkey";

-- DropTable
DROP TABLE "sales_details";

-- DropTable
DROP TABLE "saless";

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "userEmail" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_details" (
    "id" SERIAL NOT NULL,
    "salesId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "salesPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "qty" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'pcs',

    CONSTRAINT "sale_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sale_details" ADD CONSTRAINT "sale_details_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
