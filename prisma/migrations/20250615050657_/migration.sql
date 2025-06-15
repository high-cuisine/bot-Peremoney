-- CreateTable
CREATE TABLE "users_auto_settings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "telegramMailing" BOOLEAN NOT NULL,
    "calling" BOOLEAN NOT NULL,
    "telegramInviting" BOOLEAN NOT NULL,
    "auto" BOOLEAN NOT NULL,

    CONSTRAINT "users_auto_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_auto_settings_userId_key" ON "users_auto_settings"("userId");

-- AddForeignKey
ALTER TABLE "users_auto_settings" ADD CONSTRAINT "users_auto_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
