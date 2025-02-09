import { Skeleton } from "@workspace/ui/components/skeleton";

import ProjectCard from "./project-card";

export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-0 flex-grow overflow-y-scroll">
      <Skeleton className="border min-w-sm max-w-sm h-40" />
      <Skeleton className="border min-w-sm max-w-sm h-40" />
    </div>
  );
}

export default async function Projects() {
  // Simulate a delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full h-0 flex-grow overflow-y-scroll">
      <ProjectCard name="reviewnow" description="Hard coded example" />
      <ProjectCard name="reviewnow" description="Hard coded example" />
      <ProjectCard name="reviewnow" description="Hard coded example" />
      <ProjectCard name="reviewnow" description="Hard coded example" />
      <ProjectCard name="reviewnow" description="Hard coded example" />
    </div>
  );
}
