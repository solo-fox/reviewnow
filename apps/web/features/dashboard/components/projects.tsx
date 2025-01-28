import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <div className="flex flex-col gap-6 h-full p-4">
      {/* Header Section */}
      <div className="flex gap-4 max-w-sm">
        <Button size={"sm"}>New project</Button>
        <Input placeholder="Search projects" type="text" />
        <Button
          size={"icon"}
          variant={"outline"}
          className="p-4 border border-dashed"
        >
          <Filter className="size-4" />
        </Button>
      </div>

      {/* Organization Title */}
      <div className="flex gap-2 items-center">
        <p className="text-2xl">Solo-fox's Org</p>
        <Badge variant={"outline"}>free</Badge>
      </div>

      {/* Scrollable Grid Section */}
      <div className="grid grid-cols-2 gap-4 w-full h-0 flex-grow overflow-y-scroll">
        <ProjectCard
          name="reviewnow"
          description="Hard coded example"
        />
      </div>
    </div>
  );
}
