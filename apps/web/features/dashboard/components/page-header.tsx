import NewProject from "./new-project";
import Search from "./search";

export default function PageHeader() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="max-w-md flex gap-4">
        <NewProject />
        <Search />
      </div>
      <p className="text-2xl">Projects</p>
    </div>
  );
}
