"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./signup-form";

export function SignUpCard() {
  return (
    <Card className="w-full md:w-1/2 sm:w-3/4">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Hello, Newcomer!</CardTitle>
        <CardDescription>
          Sign up with your GitHub account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
