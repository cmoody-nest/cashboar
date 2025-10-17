import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { withLogger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  return withLogger(request, async () => {
    const client = await createClient();
    await client.auth.signOut();

    const redirectUrl = new URL("/", env.NEXT_PUBLIC_BASE_URL);
    revalidatePath("/", "layout");

    return NextResponse.redirect(redirectUrl);
  });
}
