"use client";

import { Poppins } from "next/font/google";
import { SquareTerminalIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

import { ProjectsList } from "./projects-list";
import { useCreateProject } from "../hooks/use-projects";
import { ProjectsCommandDialog } from "./projects-command-dialog";
import Image from "next/image";
import { ImportGithubDialog } from "./import-github-dialog";
import { NewProjectDialog } from "./new-project-dialog";
import { ProjectLearningsButton } from "./project-learnings-button";
import { UserButton } from "@clerk/nextjs";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ProjectsView = () => {
  const createProject = useCreateProject();

  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          setCommandDialogOpen(true);
        }
        if (e.key === "i") {
          e.preventDefault();
          setImportDialogOpen(true);
        }
        if (e.key === "j") {
          e.preventDefault();
          setNewProjectDialogOpen(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <ProjectsCommandDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
      />

      <ImportGithubDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />

      <NewProjectDialog
        open={newProjectDialogOpen}
        onOpenChange={setNewProjectDialogOpen}
      />

      <div className="relative min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16 overflow-hidden">
        <div className="fixed right-4 top-4 md:right-6 md:top-6 z-50">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "size-10 rounded-md   bg-card shadow-lg hover:scale-110 transition",
                userButtonPopoverCard:
                  "border border-border bg-card shadow-2xl",
              },
            }}
          />
        </div>
        {/* ANIMATED GRADIENT BLOBS */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              x: [-100, 100, -100],
              y: [-50, 50, -50],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: [100, -100, 100],
              y: [50, -50, 50],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        {/* UI CONTENT */}
        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col gap-4 items-center">
          <div className="flex justify-between gap-4 w-full items-center">
            <div className="flex items-center gap-2 w-full group/logo">
              {/* LOGO ANIMATION */}
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  filter: [
                    "brightness(1.10)",
                    "brightness(1.25)",
                    "brightness(1.10)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/logo.svg"
                  alt="Curate"
                  width={34}
                  height={34}
                  className="md:size-18 brightness-110 contrast-125"
                />
              </motion.div>

              <h1
                className={cn(
                  "text-6xl md:text-6xl font-semibold ",
                  font.className,
                )}
              >
                Curate
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => setNewProjectDialogOpen(true)}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <SquareTerminalIcon className="size-4" />
                  <Kbd className="bg-accent border uppercase">CTRL+J</Kbd>
                </div>

                <div>
                  <span className="text-sm">New Project</span>
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => setImportDialogOpen(true)}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <FaGithub className="size-4" />
                  <Kbd className="bg-accent border uppercase">CTRL+I</Kbd>
                </div>

                <div>
                  <span className="text-sm">GitHub Import</span>
                </div>
              </Button>
            </div>

            <ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
          </div>
          <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
            <div className="w-[calc(100vw-3rem)] max-w-sm rounded-2xl bg-sidebar/80 backdrop-blur-md">
              <ProjectLearningsButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
