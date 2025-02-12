import { Skeleton } from "@workspace/ui/components/skeleton";
import ProjectCard from "./project-card";
import LoadMoreProjects from "./load-more-projects";
import findAllProjectsAction from "@/actions/project/findall.action";

export function ProjectsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-4 p-4 w-full">
      <Skeleton className="border min-w-sm max-w-sm h-48" />
      <Skeleton className="border min-w-sm max-w-sm h-48" />
    </div>
  );
}

interface ProjectsProps {
  searchQuery: string | null;
}

export default async function Projects(props: ProjectsProps) {
  console.log(props.searchQuery);

  const projects = await findAllProjectsAction({
    limit: 6,
    offset: 0,
    search: props.searchQuery,
  });

  if (projects.success === false) throw new Error(projects.error);

  return (
    <div className="flex flex-col gap-4 w-full flex-grow">
      <div className="grid md:grid-cols-2 gap-4 p-4">
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
