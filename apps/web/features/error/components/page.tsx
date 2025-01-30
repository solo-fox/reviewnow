"use client";

import { useQueryState } from "nuqs";
import Illustration from "./illustration";
import Footer from "@/_components/footer";
import Alert from "@/_components/alert";
import Link from "next/link";
import routes from "@/lib/routes";
import { encodedRedirect } from "@/lib/utils";

export default function ErrorPage() {
  const [message, _] = useQueryState("message");
  if (!message) return encodedRedirect(routes.home);

  return (
    <>
      <div className="min-h-svh flex flex-col justify-center items-center p-6 gap-6">
        <div className="dotted-background"></div>
        <Illustration />
        <h1 className="mt-6 font-bold tracking-tight sm:text-4xl">
          An unexxxpected error!
        </h1>
        <Alert message={message} isError={true} />
        <div className="flex items-center justif-center p-6 gap-2">
          <Link href={routes.home}>Home</Link>
          <p>•</p>
          <Link href={routes.resources.contact}>Contact</Link>
          <p>•</p>
          <Link href={routes.resources.docs}>Docs</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
