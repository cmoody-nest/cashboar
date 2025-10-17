import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProfileBySupabaseId } from "@/lib/db/profiles/utils";
import { getSupabaseUser } from "@/lib/supabase/utils";

async function NavigationProfile() {
  const { id } = await getSupabaseUser();
  const profile = await getProfileBySupabaseId(id);

  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="cursor-pointer bg-gray-200 text-gray-600">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {profile.firstName} {profile.lastName}
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/sign-out">Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { NavigationProfile };
