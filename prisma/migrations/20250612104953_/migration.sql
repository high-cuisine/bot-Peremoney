-- CreateTable
CREATE TABLE "UserBots" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "UserBots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inviting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "botId" INTEGER NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "Inviting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inviting_userId_key" ON "Inviting"("userId");

-- AddForeignKey
ALTER TABLE "Inviting" ADD CONSTRAINT "Inviting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inviting" ADD CONSTRAINT "Inviting_botId_fkey" FOREIGN KEY ("botId") REFERENCES "UserBots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
