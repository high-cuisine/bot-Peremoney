/*
  Warnings:

  - The values [pro,premium] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [default,pro] on the enum `UserRate` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentType_new" AS ENUM ('replenishment', 'free', 'kids', 'adult', 'epic', 'space', 'beyond');
ALTER TABLE "payments" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "payments" ALTER COLUMN "type" TYPE "PaymentType_new" USING ("type"::text::"PaymentType_new");
ALTER TYPE "PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "PaymentType_old";
ALTER TABLE "payments" ALTER COLUMN "type" SET DEFAULT 'replenishment';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRate_new" AS ENUM ('free', 'kids', 'adult', 'epic', 'space', 'beyond');
ALTER TABLE "users" ALTER COLUMN "rate" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "rate" TYPE "UserRate_new" USING ("rate"::text::"UserRate_new");
ALTER TYPE "UserRate" RENAME TO "UserRate_old";
ALTER TYPE "UserRate_new" RENAME TO "UserRate";
DROP TYPE "UserRate_old";
ALTER TABLE "users" ALTER COLUMN "rate" SET DEFAULT 'free';
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "rate" SET DEFAULT 'free';

-- CreateTable
CREATE TABLE "Partners" (
    "id" SERIAL NOT NULL,
    "referrerId" INTEGER NOT NULL,
    "referredId" INTEGER NOT NULL,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Partners" ADD CONSTRAINT "Partners_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
