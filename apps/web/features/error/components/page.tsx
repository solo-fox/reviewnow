"use client";

import { useQueryState } from "nuqs";
import Link from "next/link";
import { Suspense } from "react";

import Illustration from "./illustration";

import Footer from "@/_components/footer";
import ErrorAlert from "@/_components/error-alert";
import routes from "@/lib/routes";

function ErrorContent() {
  const [message] = useQueryState("message", { defaultValue: "" });

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center p-6 gap-6">
      <div className="dotted-background"></div>
      <Illustration />
      <h1 className="mt-6 font-bold tracking-tight sm:text-4xl">
        An unexpected error!
      </h1>
      <ErrorAlert message={message} />
      <div className="flex items-center justify-center p-6 gap-2">
        <Link href={routes.home}>Home</Link>
        <p>•</p>
        <Link href={routes.resources.contact}>Contact</Link>
        <p>•</p>
        <Link href={routes.resources.docs}>Docs</Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
      <Footer />
    </Suspense>
  );
}
