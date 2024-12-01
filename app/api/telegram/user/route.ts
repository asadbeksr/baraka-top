import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";

interface TelegramUserData {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export async function POST(req: Request) {
  try {
    const userData: TelegramUserData = await req.json();
    console.log('Received user data:', userData);

    // Try to create first, if it fails due to unique constraint, then update
    try {
      const newUser = await db.user.create({
        data: {
          telegram_id: BigInt(userData.id),
          first_name: userData.first_name,
          last_name: userData.last_name ?? null,
          username: userData.username ?? null,
          language_code: userData.language_code ?? null,
          is_premium: userData.is_premium ?? null,
          added_to_attachment_menu: userData.added_to_attachment_menu ?? null,
          allows_write_to_pm: userData.allows_write_to_pm ?? null,
          photo_url: userData.photo_url ?? null,
          is_bot: userData.is_bot ?? null,
          last_opened_at: new Date(),
        }
      });
      console.log('Created new user:', newUser);
      return NextResponse.json({ 
        success: true, 
        user: {
          ...newUser,
          telegram_id: newUser.telegram_id.toString()
        }
      });
    } catch (createError) {
      if (createError.code === 'P2002') {
        // If create failed due to unique constraint, update the existing user
        const updatedUser = await db.user.update({
          where: {
            telegram_id: BigInt(userData.id)
          },
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name ?? null,
            username: userData.username ?? null,
            language_code: userData.language_code ?? null,
            is_premium: userData.is_premium ?? null,
            added_to_attachment_menu: userData.added_to_attachment_menu ?? null,
            allows_write_to_pm: userData.allows_write_to_pm ?? null,
            photo_url: userData.photo_url ?? null,
            is_bot: userData.is_bot ?? null,
            last_opened_at: new Date(),
          }
        });
        console.log('Updated existing user:', updatedUser);
        return NextResponse.json({ 
          success: true, 
          user: {
            ...updatedUser,
            telegram_id: updatedUser.telegram_id.toString()
          }
        });
      }
      throw createError;
    }
  } catch (error) {
    console.error("Error saving telegram user:", error);
    return NextResponse.json(
      { error: "Failed to save user data", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
