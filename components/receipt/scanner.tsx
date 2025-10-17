import { ScanLine } from "lucide-react";
import { Box } from "@/components/base/box";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function ReceiptScanner() {
  return (
    <Box className="fixed bottom-8 right-8">
      <Avatar>
        <AvatarFallback className="size-16 rounded-full shadow-lg cursor-pointer bg-gray-200 text-gray-600">
          <ScanLine />
        </AvatarFallback>
      </Avatar>
    </Box>
  );
}

export { ReceiptScanner };
