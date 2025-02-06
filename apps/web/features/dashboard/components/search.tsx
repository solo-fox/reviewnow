import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Filter, SearchCheck } from "lucide-react";

export default function Search() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <SearchCheck className="h-4 w-4 text-gray-500" />
        </div>
        <Input
          type="search"
          placeholder="Search..."
          className="w-full pl-10 pr-4"
        />
      </div>
      <Button
        size={"icon"}
        variant={"outline"}
        className="p-4 border border-dashed"
      >
        <Filter className="size-4" />
      </Button>
    </div>
  );
}
