"use client";

import VerifyForm from "./verify-form";

export default function VerifyPage() {
  return (
    <div className="min-h-svh">
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <VerifyForm />
        </div>
      </div>
    </div>
  );
}
