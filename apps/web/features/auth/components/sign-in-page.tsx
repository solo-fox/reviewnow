import AuthForm from "./auth-form";

import signInAction from "@/actions/auth/sign-in.action";
import routes from "@/lib/routes";

export default function SignInPage() {
  return (
    <div className="min-h-svh flex justify-center items-center p-6">
      <AuthForm
        action={signInAction}
        header={"Sign In"}
        buttonText="Do not have an account?"
        link={routes.auth.signup}
        linkText="Sign Up"
      />
    </div>
  );
}
