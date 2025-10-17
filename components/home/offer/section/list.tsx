import { HomeOfferSectionEmpty } from "@/components/home/offer/section/empty";
import { HomeOfferSectionItem } from "@/components/home/offer/section/item";
import type { Offer } from "@/lib/types/offer";

type Props = {
  offers: Offer[];
};

function HomeOffersSectionList({ offers }: Props) {
  if (offers.length === 0) {
    return <HomeOfferSectionEmpty />;
  }

  return offers.map((offer) => (
    <HomeOfferSectionItem key={offer.id} offer={offer} />
  ));
}

export { HomeOffersSectionList };
