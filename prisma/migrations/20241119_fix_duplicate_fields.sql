-- First, copy any data from the old columns to the new ones if they exist
UPDATE "users" 
SET 
  "telegram_id" = COALESCE("telegram_id", "telegramId"),
  "is_bot" = COALESCE("is_bot", "isBot"),
  "first_name" = COALESCE("first_name", "firstName"),
  "last_name" = COALESCE("last_name", "lastName"),
  "language_code" = COALESCE("language_code", "languageCode"),
  "is_premium" = COALESCE("is_premium", "isPremium"),
  "added_to_attachment_menu" = COALESCE("added_to_attachment_menu", "addedToAttachmentMenu"),
  "allows_write_to_pm" = COALESCE("allows_write_to_pm", "allowsWriteToPm"),
  "photo_url" = COALESCE("photo_url", "photoUrl"),
  "last_opened_at" = COALESCE("last_opened_at", "lastOpenedAt");

-- Then drop the old camelCase columns
ALTER TABLE "users"
  DROP COLUMN IF EXISTS "telegramId",
  DROP COLUMN IF EXISTS "isBot",
  DROP COLUMN IF EXISTS "firstName",
  DROP COLUMN IF EXISTS "lastName",
  DROP COLUMN IF EXISTS "languageCode",
  DROP COLUMN IF EXISTS "isPremium",
  DROP COLUMN IF EXISTS "addedToAttachmentMenu",
  DROP COLUMN IF EXISTS "allowsWriteToPm",
  DROP COLUMN IF EXISTS "photoUrl",
  DROP COLUMN IF EXISTS "lastOpenedAt";
