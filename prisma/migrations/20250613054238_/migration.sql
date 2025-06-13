-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('replenishment', 'pro', 'premium');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "type" "PaymentType" NOT NULL DEFAULT 'replenishment';
