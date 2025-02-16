import AuthForm from "./auth-form";

import { signIn } from "@/actions/auth/sign-in.action";
import { routes } from "@/lib/routes";

export default function SignInPage() {
  return (
    <div className="min-h-dvh flex justify-center items-center p-6">
      <AuthForm
        action={signIn}
        header={"Sign In"}
        buttonText="Do not have an account?"
        link={routes.auth.signup}
        linkText="Sign Up"
      />
    </div>
  );
}
