import signUpAction from "../actions/sign-up.action";
import routes from "@/lib/routes";
import AuthForm from "./auth-form";

export default function SignUpPage() {
  return (
    <div className="min-h-svh flex justify-center items-center p-6">
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
