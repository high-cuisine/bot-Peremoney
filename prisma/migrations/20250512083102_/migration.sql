-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('admin', 'moderator', 'user');

-- CreateEnum
CREATE TYPE "UserRate" AS ENUM ('default', 'standard', 'pro');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL DEFAULT 'user',
    "rate" "UserRate" NOT NULL DEFAULT 'default',
    "lastAction" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstAction" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_questions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isTakingBonus" BOOLEAN NOT NULL DEFAULT false,
    "whatsABusiness" TEXT NOT NULL,
    "conversion" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "CAC" DOUBLE PRECISION NOT NULL,
    "LTV" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "users_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersEstimation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "estimation" INTEGER NOT NULL,

    CONSTRAINT "UsersEstimation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersClients" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,

    CONSTRAINT "UsersClients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_telegramId_idx" ON "users"("telegramId");

-- AddForeignKey
ALTER TABLE "users_questions" ADD CONSTRAINT "users_questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersEstimation" ADD CONSTRAINT "UsersEstimation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersClients" ADD CONSTRAINT "UsersClients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
