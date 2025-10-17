import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Offer } from "@/lib/types/offer";

type Props = {
  offer: Offer;
};

function HomeOfferSectionItem({ offer }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        {offer.imageUrl && (
          <Image
            src={offer.imageUrl}
            alt={offer.name}
            width={256}
            height={128}
            className="h-32 w-full object-cover rounded-md"
            unoptimized
          />
        )}
        <CardTitle>{offer.merchant.name.trim()}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-1">
          {offer.name.trim()}
        </CardDescription>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="default">View Offer</Button>
        <Button variant="outline">Save Offer</Button>
      </CardFooter>
    </Card>
  );
}

export { HomeOfferSectionItem };
