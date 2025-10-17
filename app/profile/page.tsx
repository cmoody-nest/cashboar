import { Box } from "@/components/base/box";
import { Flex } from "@/components/base/flex";
import { NavigationHeader } from "@/components/navigation/header";
import { ReceiptScanner } from "@/components/receipt/scanner";
import { Separator } from "@/components/ui/separator";
import { getProfileBySupabaseId } from "@/lib/db/profiles/utils";
import { getSupabaseUser } from "@/lib/supabase/utils";

export default async function Profile() {
  const user = await getSupabaseUser();
  const profile = await getProfileBySupabaseId(user.id);

  return (
    <Box>
      <NavigationHeader label="Profile" />
      <Flex direction="column" className="p-4 gap-2">
        <p>
          Name: {profile.firstName} {profile.lastName}
        </p>
        <p>Email: {user.email}</p>
        <p>Gender: {profile.gender}</p>
        <p>Date of Birth: {profile.dateOfBirth.toDateString()}</p>
        <Separator />
        <p>
          Location: {profile.city}, {profile.state} {profile.zipCode}
        </p>
      </Flex>
      <ReceiptScanner />
    </Box>
  );
}
