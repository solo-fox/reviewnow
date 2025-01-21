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
import verifyAction from "../actions/verify.action";

export default function VerifyForm() {
  const [countdown, setCountdown] = useState(0);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const isPending = pending || countdown > 0;

  async function verify() {
    setPending(true);
    setCountdown(40);
    await verifyAction();
    setPending(false);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Activate your account
        </CardTitle>
        <CardDescription className="text-balance max-w-xs text-sm ">
          A confirmation email has been sent to your email address. Please check
          your inbox and follow the instructions to verify your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center">
        <Alert />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
          onClick={verify}
        >
          {isPending ? <LoadingIcon /> : null}
          {countdown > 0
            ? `Wait ${countdown}s to resend`
            : "Resend Confirmation Email"}
        </Button>
      </CardContent>
    </Card>
  );
}
