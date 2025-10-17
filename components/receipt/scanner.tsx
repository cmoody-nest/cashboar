import { Avatar } from "@radix-ui/react-avatar";
import { ScanLine } from "lucide-react";
import { Box } from "../base/box";
import { AvatarFallback } from "../ui/avatar";

function ReceiptScanner() {
  return (
    <Box className="fixed bottom-8 right-8">
      <Avatar>
        <AvatarFallback className="size-16 rounded-full bg-white shadow-lg cursor-pointer bg-gray-200 text-gray-600">
          <ScanLine />
        </AvatarFallback>
      </Avatar>
    </Box>
  );
}

export { ReceiptScanner };
