import Image from "next/image";

import NewProject from "./new-project";
import Search from "./search";

export default function Header() {
  return (
    <div className="sticky top-[3rem] flex flex-col items-center w-full h-48 relative">
      <div className="backdrop-blur-sm absolute inset-0 bg-background/50 dark:bg-background/50"></div>
      <div className="w-full h-20 relative">
        <Image
          src="./dashboard-header.svg"
          width={0}
          height={0}
          alt="Dashboard svg illustration geometry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>
      <div className="relative flex-grow flex flex-col gap-4 w-full pt-2 px-4">
        <div className="max-w-md flex gap-4">
          <NewProject />
          <Search />
        </div>
        <p className="text-2xl">Projects</p>
      </div>
    </div>
  );
}
