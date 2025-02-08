import Image from "next/image";
import Link from "next/link";
import routes from "@/lib/routes";

export default function Logo() {
  return (
    <Link href={routes.home}>
      <Image
        alt="logo"
        src="/logo.png"
        width={25}
        height={12.5}
        priority
        fetchPriority="high"
        unoptimized
      />
    </Link>
  );
}
