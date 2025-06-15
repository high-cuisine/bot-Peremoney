/*
  Warnings:

  - You are about to drop the `users_auto_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_auto_settings" DROP CONSTRAINT "users_auto_settings_userId_fkey";

-- AlterTable
ALTER TABLE "lead_generation" ADD COLUMN     "auto" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "calling" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "telegramInviting" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "telegramMailing" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "users_auto_settings";
