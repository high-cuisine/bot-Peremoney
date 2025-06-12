/*
  Warnings:

  - The values [standard] on the enum `UserRate` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `leadsPro` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRate_new" AS ENUM ('default', 'pro');
ALTER TABLE "users" ALTER COLUMN "rate" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "rate" TYPE "UserRate_new" USING ("rate"::text::"UserRate_new");
ALTER TYPE "UserRate" RENAME TO "UserRate_old";
ALTER TYPE "UserRate_new" RENAME TO "UserRate";
DROP TYPE "UserRate_old";
ALTER TABLE "users" ALTER COLUMN "rate" SET DEFAULT 'default';
COMMIT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "leadsPro";
