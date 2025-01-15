"use client"

import SignUpForm  from "./signup-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xs">
          <SignUpForm />
        </div>
      </div>
    </div>

  );
}
