import routes from "@/lib/routes";
import { Card } from "@workspace/ui/components/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string | null;
}

export function ProjectCardSkeleton() {
  return (
      <Skeleton className="p-6 cursor-pointer group w-full md:max-w-sm h-48" />
  );
}
  
export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Link href={routes.protected.project(props.id)}>
      <Card className="p-6 hover:bg-muted/50 cursor-pointer group w-full md:max-w-sm h-48">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">{props.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 truncate">
              {props.description || "No description provided."}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </Card>
    </Link>
  );
}
