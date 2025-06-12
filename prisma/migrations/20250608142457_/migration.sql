-- CreateTable
CREATE TABLE "Competitors" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "webSite" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Competitors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Competitors" ADD CONSTRAINT "Competitors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
