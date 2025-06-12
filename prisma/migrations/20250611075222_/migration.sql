/*
  Warnings:

  - You are about to drop the `Competitors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeadGeneration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersClients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersEstimation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Competitors" DROP CONSTRAINT "Competitors_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersClients" DROP CONSTRAINT "UsersClients_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersEstimation" DROP CONSTRAINT "UsersEstimation_userId_fkey";

-- DropTable
DROP TABLE "Competitors";

-- DropTable
DROP TABLE "LeadGeneration";

-- DropTable
DROP TABLE "UsersClients";

-- DropTable
DROP TABLE "UsersEstimation";

-- CreateTable
CREATE TABLE "users_estimation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "estimation" INTEGER NOT NULL,

    CONSTRAINT "users_estimation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_generation" (
    "id" SERIAL NOT NULL,
    "competitorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "maxCount" INTEGER NOT NULL,
    "dailyCount" INTEGER NOT NULL,
    "projectName" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "lead_generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_clients" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,

    CONSTRAINT "users_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitors" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "webSite" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "competitors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_estimation" ADD CONSTRAINT "users_estimation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_generation" ADD CONSTRAINT "lead_generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_generation" ADD CONSTRAINT "lead_generation_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_clients" ADD CONSTRAINT "users_clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitors" ADD CONSTRAINT "competitors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
