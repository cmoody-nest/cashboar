import { login, signup } from "@/app/login/actions";
import { Box } from "@/components/base/box";
import { LoginForm } from "@/components/login/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Box className="grid min-h-screen place-items-center bg-muted">
      <Card className="max-w-lg mx-auto w-full">
        <CardHeader>
          <CardTitle>CashBoar</CardTitle>
          <CardDescription>
            Welcome back! Please log in to your account or sign up to get
            started.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <LoginForm onLogin={login} onSignup={signup} />
        </CardContent>
      </Card>
    </Box>
  );
}
