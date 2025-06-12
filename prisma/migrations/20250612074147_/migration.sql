-- CreateEnum
CREATE TYPE "CRMType" AS ENUM ('amo', 'bitrix');

-- CreateTable
CREATE TABLE "user_crm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "apiKey" TEXT NOT NULL,
    "crmType" "CRMType" NOT NULL,

    CONSTRAINT "user_crm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_crm_userId_key" ON "user_crm"("userId");

-- AddForeignKey
ALTER TABLE "user_crm" ADD CONSTRAINT "user_crm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
