"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/auth/use-user";
import { apiService } from "@/lib/api";
import { env } from "@/lib/env";
import type { Offer } from "@/lib/types/offer";

type Props = {
  offer: Offer;
};

function HomeOfferSectionItem({ offer }: Props) {
  const userQuery = useUser();
  const saveOfferMutation = useMutation({
    mutationKey: ["save-offer", offer.id],
    mutationFn: async () => {
      return apiService.POST(
        `/customer-offers/${userQuery.data?.id}/claim/${offer.id}`,
        {
          schema: z.unknown(),
          params: { organizationId: env.NEXT_PUBLIC_CORESAVE_ORGANIZATION_ID },
          body: {},
          presignUrl: true,
        },
      );
    },
    onSuccess: () => {
      toast.success("Offer saved successfully!");
    },
    onError: (error) => {
      console.error("Error saving offer:", error);
      toast.error("Failed to save the offer. Please try again.");
    },
  });

  const onSaveOfferClick = useCallback(() => {
    saveOfferMutation.mutate();
  }, [saveOfferMutation]);

  const isSaveOfferDisabled = useMemo(() => {
    return (
      saveOfferMutation.isPending || userQuery.isLoading || !userQuery.data
    );
  }, [saveOfferMutation, userQuery]);

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
        <Button
          type="button"
          variant="outline"
          disabled={isSaveOfferDisabled}
          onClick={onSaveOfferClick}
        >
          Save Offer
        </Button>
      </CardFooter>
    </Card>
  );
}

export { HomeOfferSectionItem };
