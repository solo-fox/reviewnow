import { Skeleton } from "@workspace/ui/components/skeleton";
import ProjectCard from "./project-card";
import LoadMoreProjects from "./load-more-projects";
import findAllProjectsAction from "@/actions/project/findall.action";

export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Skeleton className="border min-w-sm max-w-sm h-40" />
      <Skeleton className="border min-w-sm max-w-sm h-40" />
    </div>
  );
}

export default async function Projects() {
  const projects = await findAllProjectsAction({
    limit: 6,
    offset: 0,
    search: null,
  });

  if (projects.success === false) throw new Error(projects.error);

  return (
    <div className="flex flex-col gap-4 w-full h-0 flex-grow overflow-y-auto">
      <div className="grid md:grid-cols-2 gap-4">
        {projects.data.projects.map((project) => (
          <ProjectCard
            id={project.id}
            key={project.id}
            name={project.name}
            description={project.description}
          />
        ))}
      </div>
      {projects.data.nextOffset && (
        <LoadMoreProjects initialOffset={projects.data.nextOffset} />
      )}
    </div>
  );
}
