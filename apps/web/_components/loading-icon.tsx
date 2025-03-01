import { LoaderCircle } from "lucide-react";

export default function LoadingIcon() {
  return (
    <div className="flex items-center space-x-2">
      <LoaderCircle className="size-4 animate-spin" />
      <span className="text-sm animate-pulse">
        Please wait
      </span>
    </div>
  );
}
