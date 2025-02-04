
import ProjectCard from "./project-card";

export default async function Projects() {
  // Simulate a delay of 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));

  return (
    <div className="grid grid-cols-2 gap-4 w-full h-0 flex-grow overflow-y-scroll">
      <ProjectCard name="reviewnow" description="Hard coded example" />
    </div>
  );
}
