/*
  Warnings:

  - You are about to drop the column `cretedAt` on the `Media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Media` DROP COLUMN `cretedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
