"use client";

import { Input } from "@workspace/ui/components/input";
import { SearchCheck } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("searchquery", term);
    } else {
      params.delete("searchquery");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <SearchCheck className="h-4 w-4 text-gray-500" />
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-10 pr-4"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
