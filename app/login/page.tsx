import { login, signup } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <Input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <Input id="password" name="password" type="password" required />
      <Button formAction={login}>Log In</Button>
      <Button formAction={signup}>Sign Up</Button>
    </form>
  );
}
