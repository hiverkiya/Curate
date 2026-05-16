"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CloudCheckIcon, Loader2Icon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { formatDistanceToNow } from "date-fns";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Id } from "../../../../convex/_generated/dataModel";
import { useProject, useRenameProject } from "../hooks/use-projects";
import { CubeLoader } from "./cube-loader";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId);
  const renameProject = useRenameProject();

  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState("");

  const handleStartRename = () => {
    if (!project) return;
    setName(project.name);
    setIsRenaming(true);
  };

  const handleSubmit = () => {
    if (!project) return;
    setIsRenaming(false);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === project.name) return;
    renameProject({ id: projectId, name: trimmedName });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
    }
  };

  return (
    <nav className="flex justify-between items-center gap-x-2 h-12 px-4 bg-sidebar/80 backdrop-blur-xl border-b">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-1!">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1.5" asChild>
                <Button
                  variant="secondary"
                  className="w-fit! p-1.5! h-8!"
                  asChild
                >
                  <Link href="/">
                    <Image
                      src="/curate.svg"
                      alt="Curate logo"
                      width={20}
                      height={20}
                    />
                    <span className={cn("text-sm font-medium", font.className)}>
                      Curate
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0! mr-1" />
            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  onBlur={handleSubmit}
                  onKeyDown={handleKeyDown}
                  className=" h-6 w-48    rounded-md    border    border-border    bg-card    px-3     text-sm     font-medium     text-foreground shadow-sm     outline-none  transition placeholder:text-muted-foreground"
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className="text-sm cursor-pointer font-medium max-w-48 truncate  rounded-md px-2  py-1 transition hover:bg-accent"
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {project?.importStatus === "importing" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-5 w-5 items-center justify-center">
                <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Importing...</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <CloudCheckIcon className="size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Saved{" "}
              {project?.updatedAt
                ? formatDistanceToNow(project.updatedAt, { addSuffix: true })
                : "Loading..."}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-2">
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "size-9 rounded-lg  bg-card shadow-sm transition hover:scale-110 hover:shadow-md",
              userButtonPopoverCard: " bg-card shadow-2xl rounded-xl",
              userButtonPopoverActionButton: "hover:bg-accent transition",
              userButtonPopoverFooter: "hidden",
            },
          }}
        />
      </div>
    </nav>
  );
};
