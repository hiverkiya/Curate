import { cn } from "@/lib/utils";

import { getItemPadding } from "./constants";

export const LoadingRow = ({
  className,
  level = 0,
}: {
  className?: string;
  level?: number;
}) => {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-2 animate-in fade-in duration-150",
        className,
      )}
      style={{ paddingLeft: getItemPadding(level, true) }}
    >
      <div className="size-4 animate-pulse rounded bg-muted" />
      <div className="h-3 w-20 animate-pulse rounded bg-muted" />
    </div>
  );
};
