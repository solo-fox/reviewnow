import { Button } from "@workspace/ui/components/button";

export default function DashboardPage() {
  return (
    <div className="w-full h-full border border-1 border-muted rounded-md flex flex-col items-center justify-center gap-6">
      <p className="text-2xl font-bold">No Projects were found.</p>
      <Button>Create your first project.</Button>
    </div>
  );
}
