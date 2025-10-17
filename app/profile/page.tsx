import { Box } from "@/components/base/box";
import { NavigationHeader } from "@/components/navigation/header";
import { ReceiptScanner } from "@/components/receipt/scanner";

export default function Profile() {
  return (
    <Box>
      <NavigationHeader label="Profile" />
      <ReceiptScanner />
    </Box>
  );
}
