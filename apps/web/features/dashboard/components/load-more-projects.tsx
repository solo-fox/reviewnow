"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Tables } from "@workspace/database/types";
import { useInView } from "react-intersection-observer";

import ProjectCard from "./project-card";
import { ProjectsSkeleton } from "./projects";

import { paginateProjectsAction } from "@/actions/project/paginate-project.action";
import { useServerAction } from "@/hooks/useServerAction";
import ErrorAlert from "@/_components/error-alert";

export default function LoadMoreProjects({
  initialOffset,
}: {
  initialOffset: number;
}) {
  const fetchProjects = useServerAction(paginateProjectsAction);

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
      await fetchProjects({
        orgId: "",
        options: { limit: 4, offset: pageParam, search: null },
      }),
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
    async function fetchData() {
      if (inView && hasNextPage && !isFetchingNextPage) {
        await fetchNextPage();
      }
    }
    //eslint-disable-next-line
    fetchData();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "error") {
    return <ErrorAlert message={error?.message} />;
  }

  return (
    <>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {data?.pages.map((page) =>
          page.projects.map((project: Tables<"projects">) => (
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

      <div
        ref={ref}
        className="text-foreground h-20 mt-4 flex justify-center"
      ></div>
    </>
  );
}
