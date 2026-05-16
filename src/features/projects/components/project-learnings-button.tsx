"use client";

import Link from "next/link";
import { BrainIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ProjectLearningsButton = () => {
  return (
    <Link href="/learnings" className="w-full">
      <Button
        variant="outline"
        className="w-full rounded-none border bg-background px-4 py-6 text-sm transition hover:bg-accent"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainIcon className="size-4" />
            <span>What I Learned Building Curate</span>
          </div>

          <span className="text-xs text-muted-foreground">Read →</span>
        </div>
      </Button>
    </Link>
  );
};
