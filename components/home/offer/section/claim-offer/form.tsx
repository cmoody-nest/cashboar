import { claimOffer } from "@/app/actions";
import { HomeOfferSectionClaimOfferButton } from "@/components/home/offer/section/claim-offer/button";
import { Input } from "@/components/ui/input";
import type { Offer } from "@/lib/types/offer";

type Props = Pick<Offer, "id">;

function HomeOfferSectionClaimOfferForm({ id }: Props) {
  return (
    <form action={claimOffer}>
      <Input type="hidden" name="offerId" value={id} />
      <HomeOfferSectionClaimOfferButton />
    </form>
  );
}

export { HomeOfferSectionClaimOfferForm };
