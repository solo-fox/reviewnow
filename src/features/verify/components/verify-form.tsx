"use client";

import { useEffect, useState } from "react";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Alert from "@/components/alert";
import { MailCheck } from "lucide-react";
import { useActionState } from "react";
import verifyAction from "../actions/verify.action";

export default function VerifyForm() {
  const [_, formAction, isPending] = useActionState(verifyAction, null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const isButtonDisabled = isPending || countdown > 0;

  return (
    <form action={formAction}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>We've sent you a confirmation email</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center flex-col justify-center gap-6">
          <p className="text-center text-sm text-gray-500">
            A confirmation email has been sent to your email address. <br />
            Please check your inbox and follow the instructions to verify your
            account.
          </p>

          <Alert />

          <Button
            type="submit"
            disabled={isButtonDisabled}
            onClick={() => setCountdown(40)}
          >
            {isPending || countdown > 0 ? <LoadingIcon /> : null}
            {countdown > 0
              ? `Wait ${countdown}s to resend`
              : "Resend Confirmation Email"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
