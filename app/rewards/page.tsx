import { Box } from "@/components/base/box";
import { NavigationHeader } from "@/components/navigation/header";
import { ReceiptScanner } from "@/components/receipt/scanner";
import { formatPoints } from "@/lib/format/point";

export default function Rewards() {
  return (
    <Box>
      <NavigationHeader label="Rewards" />
      <Box className="p-4">
        <p>Points Balance: {formatPoints(0)}</p>
      </Box>
      <ReceiptScanner />
    </Box>
  );
}
