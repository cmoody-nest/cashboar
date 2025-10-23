"use client";

import { useQuery } from "@tanstack/react-query";
import z from "zod";
import { Flex } from "@/components/base/flex";
import { HomeOffersSectionError } from "@/components/home/offer/section/error";
import { HomeOffersSectionList } from "@/components/home/offer/section/list";
import { HomeOfferSectionPlaceholder } from "@/components/home/offer/section/placeholder";
import { coresaveApiService } from "@/lib/coresave/api";
import { OfferSchema } from "@/lib/types/offer";

const OffersResponseSchema = z.object({
  data: z.array(OfferSchema),
});

type Props = {
  section: string;
};

function normalizeSectionName(section: string) {
  const normalizedSection = section.replace(/-/g, " ");
  const capitalizedSection = normalizedSection
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `${capitalizedSection} Offers`;
}

function HomeOfferSection({ section }: Props) {
  const coresaveOffers = useQuery({
    queryKey: ["offers", section],
    queryFn: async () => {
      const { data } = await coresaveApiService.GET("/offers", {
        params: { section, limit: 5 },
        schema: OffersResponseSchema,
      });

      return data;
    },
  });

  return (
    <Flex direction="column" className="gap-2">
      <h1 className="text-2xl font-bold">{normalizeSectionName(section)}</h1>
      <Flex direction="row" className="gap-4 overflow-x-auto">
        {coresaveOffers.isFetching && <HomeOfferSectionPlaceholder />}
        {coresaveOffers.data &&
          !coresaveOffers.isFetching &&
          !coresaveOffers.isError && (
            <HomeOffersSectionList offers={coresaveOffers.data} />
          )}
        {coresaveOffers.isError && <HomeOffersSectionError />}
      </Flex>
    </Flex>
  );
}

export { HomeOfferSection };
