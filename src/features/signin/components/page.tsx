"use client"

import SignInForm  from "./signin-form";

export default function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xs">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
