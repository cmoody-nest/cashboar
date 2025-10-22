import { ScanLine } from "lucide-react";
import { Box } from "@/components/base/box";
import { ReceiptScannerForm } from "@/components/receipt/scanner/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ReceiptScanner() {
  return (
    <Dialog>
      <DialogTrigger>
        <Box className="fixed bottom-8 right-8">
          <Avatar className="size-16 rounded-full shadow-lg cursor-pointer bg-white border-2 border-gray-300">
            <AvatarFallback>
              <ScanLine />
            </AvatarFallback>
          </Avatar>
        </Box>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan Your Receipt</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          Use your device's camera to scan receipts and automatically extract
          expense details.
        </DialogDescription>
        <ReceiptScannerForm />
      </DialogContent>
    </Dialog>
  );
}

export { ReceiptScanner };
