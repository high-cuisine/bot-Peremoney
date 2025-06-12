-- CreateEnum
CREATE TYPE "PaymentsStatus" AS ENUM ('pending', 'error', 'success');

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "status" "PaymentsStatus" NOT NULL DEFAULT 'pending';
