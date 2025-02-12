import AuthForm from "./auth-form";

import signUpAction from "@/actions/auth/sign-up.action";
import routes from "@/lib/routes";

export default function SignUpPage() {
  return (
    <div className="min-h-dvh flex justify-center items-center p-6">
      <AuthForm
        action={signUpAction}
        header={"Sign Up"}
        buttonText="Already have an account?"
        link={routes.auth.signin}
        linkText="Sign In"
      />
    </div>
  );
}
