import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

function HomeOfferSectionClaimOfferButton() {
  const status = useFormStatus();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      disabled={status.pending}
    >
      Claim Offer
    </Button>
  );
}

export { HomeOfferSectionClaimOfferButton };
