import { Flex } from "@/components/base/flex";
import { Spinner } from "@/components/ui/spinner";

function OnboardingFinishForm() {
  return (
    <Flex className="items-center space-x-2">
      <Spinner />
      <p>Finishing up...</p>
    </Flex>
  );
}

export { OnboardingFinishForm };
