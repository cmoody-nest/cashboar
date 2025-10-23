"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { claimOffer } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { Offer } from "@/lib/types/offer";

type Props = Pick<Offer, "id">;

function HomeOfferSectionClaimOfferForm({ id }: Props) {
  const form = useForm();

  const mutation = useMutation({
    mutationKey: ["claim-offer", id],
    mutationFn: async () => {
      const formData = new FormData();

      formData.append("offerId", id);
      formData.append("source", "home_screen");

      await claimOffer(formData);
    },
    onSuccess: () => {
      toast.success("Offer claimed successfully!");
    },
    onError: (error) => {
      console.error("Error claiming offer:", error);
      toast.error("This offer is no longer available.");
    },
  });

  const onSubmit = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={mutation.isPending}
        >
          Claim Offer
        </Button>
      </form>
    </Form>
  );
}

export { HomeOfferSectionClaimOfferForm };
