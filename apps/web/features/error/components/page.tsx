"use client";

import { useQueryState } from "nuqs";
import Illustration from "./illustration";
import Footer from "@/_components/footer";
import Alert from "@/_components/alert";
import Link from "next/link";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const [message] = useQueryState("message", { defaultValue: "" })
  
  return (
    <div className="min-h-svh flex flex-col justify-center items-center p-6 gap-6">
      <div className="dotted-background"></div>
      <Illustration />
      <h1 className="mt-6 font-bold tracking-tight sm:text-4xl">
        An unexpected error!
      </h1>
      <Alert message={message} isError={true} />
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
