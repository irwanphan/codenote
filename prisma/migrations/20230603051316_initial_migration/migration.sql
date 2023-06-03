-- CreateEnum
CREATE TYPE "roles" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "saless" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "userEmail" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saless_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_details" (
    "id" SERIAL NOT NULL,
    "salesId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "salesPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "qty" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'pcs',

    CONSTRAINT "sales_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "firstName" VARCHAR(30),
    "lastName" VARCHAR(30),
    "dateOfBirth" DATE,
    "phone" VARCHAR(15),
    "lastAccess" TIMESTAMP(3),
    "image" TEXT,
    "role" "roles" NOT NULL DEFAULT 'user',
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "saless" ADD CONSTRAINT "saless_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_details" ADD CONSTRAINT "sales_details_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "saless"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
