import Image from "next/image";
import { Poppins } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useFile, useUpdateFile } from "@/features/projects/hooks/use-files";

import { CodeEditor } from "./code-editor";
import { useEditor } from "../hooks/use-editor";
import { TopNavigation } from "./top-navigation";
import { FileBreadcrumbs } from "./file-breadcrumbs";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300"],
});

const DEBOUNCE_MS = 200;

export const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const { activeTabId } = useEditor(projectId);
  const activeFile = useFile(activeTabId);
  const updateFile = useUpdateFile();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActiveFileBinary = activeFile && activeFile.storageId;
  const isActiveFileText = activeFile && !activeFile.storageId;

  const codeSymbols = ["{ }", "<>", "()", "</>", "[]"];

  const [particles] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 6,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
    })),
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeTabId]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center">
        <TopNavigation projectId={projectId} />
      </div>

      {activeTabId && <FileBreadcrumbs projectId={projectId} />}

      <div className="flex-1 min-h-0 bg-background">
        {/* EMPTY STATE */}
        {!activeFile && (
          <div className="size-full flex items-center justify-center relative overflow-hidden">
            {/* MINI CODE PARTICLES */}
            {particles.map((p, i) => (
              <motion.span
                key={i}
                className="absolute text-xs text-muted-foreground/40 font-mono"
                style={{
                  left: `${p.left}%`,
                  top: "-10px",
                }}
                animate={{
                  y: ["0vh", "70vh"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {p.symbol}
              </motion.span>
            ))}

            {/* LOGO + TEXT */}
            <motion.div
              className="flex items-center"
              animate={{
                y: [0, -6, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/logo-alt.svg"
                alt="Curate"
                width={50}
                height={50}
                className="opacity-25"
              />

              {/* TEXT + CURSOR */}
              <span
                style={{ color: "#4e5158" }}
                className={cn(
                  font.className,
                  "text-3xl md:text-4xl font-semibold flex items-center",
                )}
              >
                urate
                {/* blinking cursor */}
                <motion.span
                  className="ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  _
                </motion.span>
              </span>
            </motion.div>
          </div>
        )}

        {/* TEXT EDITOR */}
        {isActiveFileText && (
          <CodeEditor
            key={activeFile._id}
            fileName={activeFile.name}
            initialValue={activeFile.content}
            onChange={(content: string) => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }

              timeoutRef.current = setTimeout(() => {
                updateFile({ id: activeFile._id, content });
              }, DEBOUNCE_MS);
            }}
          />
        )}

        {/* BINARY FILE MESSAGE */}
        {isActiveFileBinary && (
          <div className="size-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2.5 max-w-md text-center">
              <AlertTriangleIcon className="size-10 text-yellow-500" />
              <p className="text-sm">
                The file is not displayed in the text editor because it is
                either binary or uses an unsupported text encoding.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
