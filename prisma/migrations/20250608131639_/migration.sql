/*
  Warnings:

  - You are about to drop the column `leadsMini` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "leadsMini",
ADD COLUMN     "leads" INTEGER NOT NULL DEFAULT 0;
