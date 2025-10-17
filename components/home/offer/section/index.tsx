"use client";

import { useQuery } from "@tanstack/react-query";
import z from "zod";
import { Flex } from "@/components/base/flex";
import { HomeOffersSectionError } from "@/components/home/offer/section/error";
import { HomeOffersSectionList } from "@/components/home/offer/section/list";
import { HomeOfferSectionPlaceholder } from "@/components/home/offer/section/placeholder";
import { clientApiService } from "@/lib/api/client";
import { OfferSchema } from "@/lib/types/offer";

const OffersResponseSchema = z.object({
  data: z.array(OfferSchema),
});

type Props = {
  section: string;
};

function normalizeSectionName(section: string) {
  return `${section.replace(/-/g, " ")} Offers`;
}

function HomeOfferSection({ section }: Props) {
  const offersQuery = useQuery({
    queryKey: ["offers", section],
    queryFn: async () => {
      const { data } = await clientApiService.GET("/offers", {
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
        {offersQuery.isFetching && <HomeOfferSectionPlaceholder />}
        {offersQuery.data &&
          !offersQuery.isFetching &&
          !offersQuery.isError && (
            <HomeOffersSectionList offers={offersQuery.data} />
          )}
        {offersQuery.isError && <HomeOffersSectionError />}
      </Flex>
    </Flex>
  );
}

export { HomeOfferSection };
