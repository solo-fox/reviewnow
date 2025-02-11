"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import listProjectsAction from "../actions/list-projects.action";
import ProjectCard from "./project-card";
import { useAction } from "@/hooks/useAction";
import { ProjectView } from "@workspace/database/models/Project";
import ErrorAlert from "@/_components/error-alert";

export default function LoadMoreProjects({
  nextOffset,
}: {
  nextOffset: number;
}) {
  const [projects, setProjects] = useState<ProjectView[]>([]);
  const [offset, setOffset] = useState(nextOffset);

  const {
    data,
    mutate: load,
    error,
    isPending,
  } = useMutation({
    mutationFn: useAction(listProjectsAction),
    onSuccess: () => {
      if (data?.success) {
        setProjects([...projects, ...data.data.projects]);
        setOffset(data?.data.nextOffset);
      }
    },
  });

  return (
    <div>
      <ErrorAlert message={(error as Error).message} />
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
        />
      ))}
      {offset && (
        <button
          onClick={() => load({ limit: 5, offset })}
          disabled={isPending}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {isPending ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
