-- AlterTable
ALTER TABLE "users" ADD COLUMN "telegramId" BIGINT UNIQUE,
    ADD COLUMN "isBot" BOOLEAN,
    ADD COLUMN "firstName" TEXT,
    ADD COLUMN "lastName" TEXT,
    ADD COLUMN "username" TEXT,
    ADD COLUMN "languageCode" TEXT,
    ADD COLUMN "isPremium" BOOLEAN,
    ADD COLUMN "addedToAttachmentMenu" BOOLEAN,
    ADD COLUMN "allowsWriteToPm" BOOLEAN,
    ADD COLUMN "photoUrl" TEXT,
    ADD COLUMN "lastOpenedAt" TIMESTAMP(3);
