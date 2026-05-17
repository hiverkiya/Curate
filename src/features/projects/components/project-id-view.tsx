"use client";

import { useState } from "react";
import { Allotment } from "allotment";

import { cn } from "@/lib/utils";
import { EditorView } from "@/features/editor/components/editor-view";

import { FileExplorer } from "./file-explorer";
import { Id } from "../../../../convex/_generated/dataModel";
import { PreviewView } from "./preview-view";
import { ExportPopover } from "./export-popover";

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 800;
const DEFAULT_SIDEBAR_WIDTH = 350;
const DEFAULT_MAIN_SIZE = 1000;

const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex h-full cursor-pointer items-center gap-2 border-r px-4 text-sm font-medium transition",
        "text-muted-foreground hover:bg-accent/40",
        isActive && "border-transparent bg-background text-foreground",
      )}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
};

export const ProjectIdView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [activeView, setActiveView] = useState<"editor" | "preview">("editor");

  return (
    <div className="h-full flex flex-col">
      <nav className="h-8.75 flex items-center bg-sidebar border-b">
        <Tab
          label="Code"
          isActive={activeView === "editor"}
          onClick={() => setActiveView("editor")}
        />
        <Tab
          label="Preview"
          isActive={activeView === "preview"}
          onClick={() => setActiveView("preview")}
        />
        <div className="ml-4 hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
          <div className="size-2 rounded-full bg-green-500" />
          <span>Refresh preview after code changes</span>
        </div>
        <div className="flex-1 flex justify-end h-full">
          <ExportPopover projectId={projectId} />
        </div>
      </nav>
      <div className="flex-1 relative">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-150",
            activeView === "editor"
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          <Allotment defaultSizes={[DEFAULT_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}>
            <Allotment.Pane
              snap
              minSize={MIN_SIDEBAR_WIDTH}
              maxSize={MAX_SIDEBAR_WIDTH}
              preferredSize={DEFAULT_SIDEBAR_WIDTH}
            >
              <FileExplorer projectId={projectId} />
            </Allotment.Pane>
            <Allotment.Pane>
              <EditorView projectId={projectId} />
            </Allotment.Pane>
          </Allotment>
        </div>
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-150",
            activeView === "preview"
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          <PreviewView projectId={projectId} />{" "}
        </div>
      </div>
    </div>
  );
};
