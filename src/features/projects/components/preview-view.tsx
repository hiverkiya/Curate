"use client";

import { useState, useEffect } from "react";
import { Allotment } from "allotment";
import {
  Loader2Icon,
  TerminalSquareIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useWebContainer } from "@/features/preview/hooks/use-webcontainer";
import { PreviewSettingsPopover } from "@/features/preview/components/preview-settings-popover";
import { PreviewTerminal } from "@/features/preview/components/preview-terminal";
import { Button } from "@/components/ui/button";
import { useProject } from "../hooks/use-projects";
import { Id } from "../../../../convex/_generated/dataModel";

export const PreviewView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId);
  const [showTerminal, setShowTerminal] = useState(true);

  const { status, previewUrl, error, restart, terminalOutput } =
    useWebContainer({
      projectId,
      enabled: true,
      settings: project?.settings,
    });

  const isLoading = status === "booting" || status === "installing";

  return (
    <div className="h-full flex flex-col bg-background">
      {/* TOP BAR */}
      <div className="h-8.75 flex items-center border-b bg-sidebar shrink-0">
        <Button
          size="sm"
          variant="ghost"
          className="h-full rounded-none"
          disabled={isLoading}
          onClick={restart}
          title="Restart container"
        >
          <RefreshCwIcon
            className={`size-3 ${isLoading ? "animate-spin" : ""}`}
          />
        </Button>

        <div className="flex-1 h-full flex items-center gap-2 px-2 bg-background border-x text-xs font-mono">
          <div className="flex items-center gap-1 pl-1">
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>

          <div className="flex-1 truncate px-2 py-[2px] bg-muted/40 rounded text-muted-foreground">
            {isLoading && (
              <span className="flex items-center gap-1.5">
                <Loader2Icon className="size-3 animate-spin" />
                {status === "booting"
                  ? "Starting container..."
                  : "Installing dependencies..."}
              </span>
            )}

            {previewUrl && previewUrl}

            {!isLoading && !previewUrl && !error && "Ready to preview"}
          </div>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="h-full rounded-none"
          title="Toggle terminal"
          onClick={() => setShowTerminal((value) => !value)}
        >
          <TerminalSquareIcon className="size-3" />
        </Button>

        <PreviewSettingsPopover
          projectId={projectId}
          initialValues={project?.settings}
          onSave={restart}
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-h-0">
        <Allotment vertical>
          {/* PREVIEW */}
          <Allotment.Pane>
            {/* ERROR */}
            {error && (
              <div className="size-full flex items-center justify-center text-muted-foreground">
                <div className="flex flex-col items-center gap-3 max-w-md mx-auto text-center">
                  <AlertTriangleIcon className="size-7 text-yellow-500" />
                  <p className="text-sm font-medium">{error}</p>

                  <Button size="sm" variant="outline" onClick={restart}>
                    <RefreshCwIcon className="size-4" />
                    Restart container
                  </Button>
                </div>
              </div>
            )}

            {/* TERMINAL BOOT ANIMATION */}
            {isLoading && !error && (
              <div className="size-full flex items-center justify-center">
                <BootAnimation />
              </div>
            )}

            {/* PREVIEW */}
            {previewUrl && (
              <motion.div
                className="size-full relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div className="absolute inset-0 pointer-events-none border border-border/40 rounded-md" />

                <iframe
                  src={previewUrl}
                  className="size-full border-0 rounded-md"
                  title="Preview"
                />
              </motion.div>
            )}
          </Allotment.Pane>

          {/* TERMINAL */}
          {showTerminal && (
            <Allotment.Pane minSize={100} maxSize={500} preferredSize={200}>
              <div className="h-full flex flex-col bg-background border-t">
                <div className="h-7 flex items-center justify-between px-3 text-xs border-b border-border/50 bg-muted/30 shrink-0">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <TerminalSquareIcon className="size-3" />
                    Terminal
                  </div>
                </div>

                <PreviewTerminal output={terminalOutput} />
              </div>
            </Allotment.Pane>
          )}
        </Allotment>
      </div>
    </div>
  );
};

/* ------------------------------------------------ */
/* Boot animation (fake container logs)             */
/* ------------------------------------------------ */

const bootLogs = [
  "Starting Curate dev container...",
  "Initializing sandbox runtime...",
  "Mounting project filesystem...",
  "Installing dependencies...",
  "Resolving packages...",
  "Configuring runtime...",
  "Starting dev server...",
  "Preparing preview...",
];

function BootAnimation() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setVisibleLines((prev) => [...prev, bootLogs[i]]);
      i++;

      if (i >= bootLogs.length) clearInterval(interval);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[520px] max-w-[90%] bg-black/80 rounded-md border border-border text-green-400 font-mono text-xs p-4 shadow-xl">
      <div className="flex items-center gap-2 mb-3 text-gray-400">
        <TerminalSquareIcon className="size-3" />
        container boot
      </div>

      <div className="flex flex-col gap-1">
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            $ {line}
          </motion.div>
        ))}

        <div className="flex items-center">
          <span>$ </span>
          <motion.span
            className="ml-1 w-[6px] h-[12px] bg-green-400 inline-block"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
