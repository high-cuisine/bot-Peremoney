/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `users_clients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users_clients" ADD COLUMN     "companyId" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "users_clients_companyId_key" ON "users_clients"("companyId");

-- AddForeignKey
ALTER TABLE "users_clients" ADD CONSTRAINT "users_clients_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "lead_generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
