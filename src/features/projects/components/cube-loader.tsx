"use client";

import { cn } from "@/lib/utils";

interface CubeLoaderProps {
  className?: string;
}

export const CubeLoader = ({ className }: CubeLoaderProps) => {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center [perspective:800px]",
        className,
      )}
    >
      <div className="relative h-6 w-6 animate-[cube-spin_2.2s_linear_infinite] [transform-style:preserve-3d]">
        {/* front */}
        <div className="absolute inset-0 border border-border bg-primary/15 backdrop-blur-sm [transform:translateZ(12px)]" />

        {/* back */}
        <div className="absolute inset-0 border border-border bg-primary/5 [transform:rotateY(180deg)_translateZ(12px)]" />

        {/* right */}
        <div className="absolute inset-0 border border-border bg-primary/10 [transform:rotateY(90deg)_translateZ(12px)]" />

        {/* left */}
        <div className="absolute inset-0 border border-border bg-primary/10 [transform:rotateY(-90deg)_translateZ(12px)]" />

        {/* top */}
        <div className="absolute inset-0 border border-border bg-primary/20 [transform:rotateX(90deg)_translateZ(12px)]" />

        {/* bottom */}
        <div className="absolute inset-0 border border-border bg-primary/5 [transform:rotateX(-90deg)_translateZ(12px)]" />
      </div>
    </div>
  );
};
