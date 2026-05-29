"use client";

import { motion } from "framer-motion";
import { CubeLoader } from "@/features/projects/components/cube-loader";

export const AuthLoadingView = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-[-10%] h-80 w-80 rounded-full bg-chart-2/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-3xl border border-border bg-card/80 p-8 backdrop-blur-xl"
      >
        {/* Fake IDE title bar */}
        <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
          <div className="size-3 rounded-full bg-destructive/80" />
          <div className="size-3 rounded-full bg-chart-3/80" />
          <div className="size-3 rounded-full bg-chart-2/80" />

          <div className="ml-4 rounded-md border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            workspace.curate
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          {/* Status badge */}
          <div className="mb-4 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Starting Curate
          </div>

          {/* Loader */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <CubeLoader className="size-7 text-primary" />
          </motion.div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Preparing workspace
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Loading editor, AI services, project context, and workspace state.
          </p>

          {/* Footer status */}
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="size-2 rounded-full bg-primary animate-pulse" />
            Initializing development environment
          </div>
        </div>
      </motion.div>
    </div>
  );
};
