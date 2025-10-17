import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function HomeOfferSectionPlaceholder() {
  return (
    <Fragment>
      <Skeleton className="size-64 rounded-lg" />
      <Skeleton className="size-64 rounded-lg" />
      <Skeleton className="size-64 rounded-lg" />
      <Skeleton className="size-64 rounded-lg" />
    </Fragment>
  );
}

export { HomeOfferSectionPlaceholder };
