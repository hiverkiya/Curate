"use client";

import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

export const AuthLoadingView = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-20 h-80 w-80 rounded-full bg-chart-2/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-3xl border border-border bg-card/80 p-8 backdrop-blur-xl"
      >
        {/* fake IDE top bar */}
        <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
          <div className="size-3 rounded-full bg-destructive/80" />
          <div className="size-3 rounded-full bg-chart-3/80" />
          <div className="size-3 rounded-full bg-chart-2/80" />

          <div className="ml-4 rounded-md border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            curate.auth
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <Spinner className="size-6 text-primary" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Loading...</h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Initializing your development workspace
          </p>
        </div>
      </motion.div>
    </div>
  );
};
