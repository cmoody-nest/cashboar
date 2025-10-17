import { Flex } from "@/components/base/flex";
import { NavigationMenu } from "@/components/navigation/menu";
import { NavigationProfile } from "@/components/navigation/profile";

type Props = {
  label?: string;
};

function NavigationHeader({ label = "CashBoar" }: Props) {
  return (
    <header>
      <Flex
        direction="row"
        className="justify-between items-center p-4 bg-gray-800 text-white"
      >
        <NavigationMenu />
        <h1 className="text-xl font-bold">{label}</h1>
        <NavigationProfile />
      </Flex>
    </header>
  );
}

export { NavigationHeader };
