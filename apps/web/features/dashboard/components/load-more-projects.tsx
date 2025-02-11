"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Project } from "@workspace/database/models/Project";

import ProjectCard from "./project-card";
import { ProjectsSkeleton } from "./projects";

import findAllProjectsAction from "@/actions/project/findall.action";
import { useAction } from "@/hooks/useAction";
import ErrorAlert from "@/_components/error-alert";

import { useInView } from "react-intersection-observer";

export default function LoadMoreProjects({
  initialOffset,
}: {
  initialOffset: number;
}) {
  const fetchProjects = useAction(findAllProjectsAction);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam = initialOffset }) =>
      await fetchProjects({ limit: 4, offset: pageParam, search: null }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextOffset ?? undefined;
    },
    initialPageParam: initialOffset,
  });

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  // Fetch the next page when the observer is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, !isFetchingNextPage, fetchNextPage]);

  if (status === "error") {
    return <ErrorAlert message={(error as Error)?.message} />;
  }

  return (
    <>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {data?.pages.map((page) =>
          page.projects.map((project: Project) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              name={project.name}
              description={project.description}
            />
          )),
        )}
      </div>

      {isFetchingNextPage && <ProjectsSkeleton />}

      <div ref={ref} className="text-foreground h-20 mt-4 flex justify-center">
       
      </div>
    </>
  );
}
