import { Box } from "@/components/base/box";
import { Flex } from "@/components/base/flex";
import { HomeOffersSectionList } from "@/components/home/offer/section/list";
import { NavigationHeader } from "@/components/navigation/header";
import { ReceiptScanner } from "@/components/receipt/scanner";
import { apiService } from "@/lib/api";
import { env } from "@/lib/env";
import { formatPoints } from "@/lib/format/point";
import { getSupabaseUser } from "@/lib/supabase/utils";
import { CustomerOffersResponseSchema } from "@/lib/types/offer";

export default async function Rewards() {
  const user = await getSupabaseUser();
  const data = await apiService.GET(`/customer-offers/${user.id}/saved`, {
    schema: CustomerOffersResponseSchema,
    params: { organizationId: env.NEXT_PUBLIC_CORESAVE_ORGANIZATION_ID },
    presignUrl: true,
  });

  return (
    <Box>
      <NavigationHeader label="Rewards" />
      <Flex direction="column" className="p-4 gap-2">
        <p>Points Balance: {formatPoints(0)}</p>
        <Flex direction="column" className="gap-1">
          <h3 className="text-lg font-semibold">Saved Offers</h3>
          <HomeOffersSectionList
            offers={data.data.flatMap((section) => section.offer)}
          />
        </Flex>
      </Flex>
      <ReceiptScanner />
    </Box>
  );
}
