"use client"

import OnboardingForm from "./onboarding-form"

export default function OnboardingPage() {
  return (
    <div className="min-h-svh">
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xs">
           <OnboardingForm />
        </div>
      </div>
    </div>
  )
}

