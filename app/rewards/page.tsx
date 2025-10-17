import { Box } from "@/components/base/box";
import { NavigationHeader } from "@/components/navigation/header";
import { ReceiptScanner } from "@/components/receipt/scanner";

export default function Rewards() {
  return (
    <Box>
      <NavigationHeader label="Rewards" />
      <ReceiptScanner />
    </Box>
  );
}
