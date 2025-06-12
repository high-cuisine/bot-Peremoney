-- CreateTable
CREATE TABLE "users_call_order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "leads" TEXT NOT NULL DEFAULT '',
    "companyName" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "users_call_order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_call_order" ADD CONSTRAINT "users_call_order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
