import { Button, Container, Section, Text } from "@react-email/components";
import { env } from "@/lib/env";

function WelcomeEmail() {
  return (
    <Container>
      <Section>
        <h1
          style={{ margin: "0 0 16px 0", fontSize: "24px", fontWeight: "bold" }}
        >
          Welcome Aboard!
        </h1>
        <Text style={{ margin: "0 0 16px 0", fontSize: "16px" }}>
          You’re officially part of the herd! Start earning real rewards just by
          shopping the way you already do.
        </Text>
        <ul style={{ paddingLeft: "20px", margin: "0 0 16px 0" }}>
          <li>🛍️ Save offers you like</li>
          <li>📸 Snap a receipt after purchase</li>
          <li>💰 Earn cash</li>
        </ul>
        <Button
          href={env.NEXT_PUBLIC_BASE_URL}
          style={{
            backgroundColor: "#22c55e",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
            display: "inline-block",
          }}
        >
          Start Earning Now
        </Button>
      </Section>
    </Container>
  );
}

export { WelcomeEmail };
