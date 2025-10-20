import Link from "next/link";
import { Flex } from "@/components/base/flex";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

function WelcomeEmail() {
  return (
    <Flex direction="column">
      <h1>Welcome Aboard!</h1>
      <Flex direction="column">
        <p>
          You’re officially part of the herd! Start earning real rewards just by
          shopping the way you already do.
        </p>
        <ul>
          <li>🛍️ Save offers you like</li>
          <li>📸 Snap a receipt after purchase</li>
          <li>💰 Earn cash</li>
        </ul>
      </Flex>
      <Link href={env.NEXT_PUBLIC_BASE_URL}>
        <Button>Start Earning Now</Button>
      </Link>
    </Flex>
  );
}

export { WelcomeEmail };
