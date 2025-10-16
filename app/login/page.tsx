import { login, signup } from "@/app/login/actions";
import { LoginForm } from "@/components/login/form";

export default function LoginPage() {
  return <LoginForm onLogin={login} onSignup={signup} />;
}
