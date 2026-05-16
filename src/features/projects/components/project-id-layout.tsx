"use client";

import { Allotment } from "allotment";

import { Navbar } from "./navbar";
import { Id } from "../../../../convex/_generated/dataModel";
import { ConversationSidebar } from "@/features/conversations/components/conversation-sidebar";

const MIN_SIDEBAR_WIDTH = 240;
const MAX_SIDEBAR_WIDTH = 700;
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 320;
const DEFAULT_MAIN_SIZE = 1180;

export const ProjectIdLayout = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: Id<"projects">;
}) => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-[-10%] bottom-20 h-96 w-96 rounded-full bg-chart-2/5 blur-3xl" />
      </div>

      <Navbar projectId={projectId} />

      <div className="flex-1 overflow-hidden border-t border-border">
        <Allotment
          className="flex-1"
          defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
        >
          <Allotment.Pane
            snap
            minSize={MIN_SIDEBAR_WIDTH}
            maxSize={MAX_SIDEBAR_WIDTH}
            preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
          >
            <div className="h-full border-r border-border bg-sidebar/60 backdrop-blur-xl">
              <ConversationSidebar projectId={projectId} />
            </div>
          </Allotment.Pane>

          <Allotment.Pane>
            <div className="h-full bg-background">{children}</div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
};
