-- CreateTable
CREATE TABLE "LeadGeneration" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "maxCount" INTEGER NOT NULL,
    "dailyCount" INTEGER NOT NULL,

    CONSTRAINT "LeadGeneration_pkey" PRIMARY KEY ("id")
);
