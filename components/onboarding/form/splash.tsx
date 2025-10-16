"use client";

import { useForm } from "react-hook-form";
import { Flex } from "@/components/base/flex";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type Props = {
  onSubmit: () => void;
};

function OnboardingSplashForm({ onSubmit }: Props) {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" className="items-center gap-2">
          <h1>CashBoar</h1>
          <h2>Turn Points Into Rewards</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Flex>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Get Started
        </Button>
      </form>
    </Form>
  );
}

export { OnboardingSplashForm };
