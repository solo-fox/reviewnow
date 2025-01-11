"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignUpForm from "./signup-form"

export function SignUpCard() {
  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Hello, Newcomer!</CardTitle>
          <CardDescription>
            Sign up with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
         <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}
