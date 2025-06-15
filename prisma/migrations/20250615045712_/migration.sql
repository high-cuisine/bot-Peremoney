/*
  Warnings:

  - You are about to drop the column `email` on the `users_clients` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users_clients` table. All the data in the column will be lost.
  - Added the required column `username` to the `users_clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_clients" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;
