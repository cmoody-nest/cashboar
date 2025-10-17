import { ScanLine } from "lucide-react";
import { Box } from "@/components/base/box";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function ReceiptScanner() {
  return (
    <Box className="fixed bottom-8 right-8">
      <Avatar className="size-16 rounded-full shadow-lg cursor-pointer bg-white border-2 border-gray-300">
        <AvatarFallback>
          <ScanLine />
        </AvatarFallback>
      </Avatar>
    </Box>
  );
}

export { ReceiptScanner };
