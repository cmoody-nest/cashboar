import { Box } from "@/components/base/box";
import { Flex } from "@/components/base/flex";
import { HomeOfferSection } from "@/components/home/offer/section";
import { NavigationHeader } from "@/components/navigation/header";
import { ReceiptScanner } from "@/components/receipt/scanner";

export default function Home() {
  return (
    <Box>
      <NavigationHeader />
      <Flex direction="column" className="p-4 gap-2">
        <HomeOfferSection section="new" />
        <HomeOfferSection section="regular" />
        <HomeOfferSection section="expiring-soon" />
      </Flex>
      <ReceiptScanner />
    </Box>
  );
}
