"use client";

import * as React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Badge } from "@workspace/ui/components/badge";
import { Tables } from "@workspace/database/types";
import LoadingIcon from "@/_components/loading-icon";

interface OrgDropdownProps {
  organizations: Tables<"organizations">[];
  placeholder?: string;
}

export default function OrgDropdown({ organizations }: OrgDropdownProps) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname(); 
  const orgIdFromUrl = params?.id as string;

  const [selectedValue, setSelectedValue] = React.useState(orgIdFromUrl || "");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); 


  const selectedOrg = organizations.find((org) => org.id === selectedValue);

  React.useEffect(() => {
    if (orgIdFromUrl) {
      setSelectedValue(orgIdFromUrl);
    }
  }, [orgIdFromUrl]);


  React.useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleSelect = (orgId: string) => {
    setIsLoading(true); // Start loading
    setSelectedValue(orgId);
    router.replace(`/dashboard/${orgId}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          disabled={isLoading} 
        >
          {isLoading ? (
            <LoadingIcon  /> 
          ) : (
            <>
              {selectedOrg ? selectedOrg.name : "Select organization..."}
              <Badge>{selectedOrg ? selectedOrg.plan : "free"}</Badge>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Search organizations..." />
          <CommandList>
            <CommandEmpty>No organizations found.</CommandEmpty>
            <CommandGroup>
              {organizations.map((org) => (
                <CommandItem
                  key={org.id}
                  value={org.id}
                  onSelect={() => handleSelect(org.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === org.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {org.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}