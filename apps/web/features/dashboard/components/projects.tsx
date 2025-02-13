import Image from "next/image";
import { Plus } from "lucide-react";

import ProjectCard, { ProjectCardSkeleton } from "./project-card";
import LoadMoreProjects from "./load-more-projects";
import NewProject from "./new-project";

import findAllProjectsAction from "@/actions/project/findall.action";

export function ProjectsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-4 p-4 w-full">
      <ProjectCardSkeleton />
    </div>
  );
}

interface ProjectsProps {
  searchQuery: string | null;
}

export default async function Projects(props: ProjectsProps) {
  const projects = await findAllProjectsAction({
    limit: 6,
    offset: 0,
    search: props.searchQuery,
  });

  if (projects.success === false) throw new Error(projects.error);

  return (
    <div className="w-full flex-grow">
      {projects.data.projects.length === 0 && props.searchQuery && (
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            alt="logo"
            src="/not-found.svg"
            width={0}
            height={0}
            fetchPriority="low"
            className="animate-bounce size-40"
          />
          <h1>
            No Projects Found {props.searchQuery && "props.searchQuery"}
            <span className="rounded-md bg-zinc-800 px-4 border border-zinc-600 bg-card">
              {props.searchQuery && props.searchQuery}
            </span>
          </h1>
        </div>
      )}
      {projects.data.projects.length === 0 && (
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <h1 className="flex items-center fon-semibold text-center text-2xl">
            {" "}
            <Plus size={30} className="inline-block align-middle mx-1" /> Create
            a Project.
          </h1>
          <NewProject />
        </div>
      )}
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
