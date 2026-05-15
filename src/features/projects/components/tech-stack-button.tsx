"use client";

import Link from "next/link";
import { CpuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const TechStackButton = () => {
  return (
    <Link href="/tech-stack" className="w-full">
      <Button
        variant="outline"
        className="w-full rounded-none border bg-background px-4 py-6 text-sm"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <CpuIcon className="size-4" />
            <span>Architecture / Tech Stack</span>
          </div>

          <span className="text-xs text-muted-foreground">View →</span>
        </div>
      </Button>
    </Link>
  );
};
