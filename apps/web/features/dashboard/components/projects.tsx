import { Skeleton } from "@workspace/ui/components/skeleton";

import ProjectCard from "./project-card";
import listProjectsAction from "../actions/list-projects.action";
import LoadMoreProjects from "./load-more-projects";

export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-0 flex-grow overflow-y-scroll">
      <Skeleton className="border min-w-sm max-w-sm h-40" />
      <Skeleton className="border min-w-sm max-w-sm h-40" />
    </div>
  );
}

export default async function Projects() {
  const projects = await listProjectsAction({ limit: 5, offset: 0 });

  if (projects.success === false) throw new Error(projects.error);

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full h-0 flex-grow overflow-y-scroll">
      {projects.data.projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
        />
      ))}
      {projects.data.nextOffset && <LoadMoreProjects nextOffset={projects.data.nextOffset} />}
    </div>
  );
}
