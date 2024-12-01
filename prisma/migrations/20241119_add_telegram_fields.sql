-- First, drop the existing constraint if it exists
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_telegramId_key') THEN
        ALTER TABLE "users" DROP CONSTRAINT "users_telegramId_key";
    END IF;
END $$;

-- Add new columns if they don't exist
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'telegram_id') THEN
        ALTER TABLE "users" ADD COLUMN "telegram_id" BIGINT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'is_bot') THEN
        ALTER TABLE "users" ADD COLUMN "is_bot" BOOLEAN;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'first_name') THEN
        ALTER TABLE "users" ADD COLUMN "first_name" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_name') THEN
        ALTER TABLE "users" ADD COLUMN "last_name" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'username') THEN
        ALTER TABLE "users" ADD COLUMN "username" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'language_code') THEN
        ALTER TABLE "users" ADD COLUMN "language_code" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'is_premium') THEN
        ALTER TABLE "users" ADD COLUMN "is_premium" BOOLEAN;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'added_to_attachment_menu') THEN
        ALTER TABLE "users" ADD COLUMN "added_to_attachment_menu" BOOLEAN;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'allows_write_to_pm') THEN
        ALTER TABLE "users" ADD COLUMN "allows_write_to_pm" BOOLEAN;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'photo_url') THEN
        ALTER TABLE "users" ADD COLUMN "photo_url" TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_opened_at') THEN
        ALTER TABLE "users" ADD COLUMN "last_opened_at" TIMESTAMP(3);
    END IF;
END $$;

-- Add unique constraint for telegram_id
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'users_telegram_id_key'
    ) THEN
        ALTER TABLE "users" ADD CONSTRAINT "users_telegram_id_key" UNIQUE ("telegram_id");
    END IF;
END $$;
