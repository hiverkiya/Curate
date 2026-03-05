import { CopyIcon, HistoryIcon, LoaderIcon, PlusIcon } from "lucide-react";
import ky from "ky";
import { toast } from "sonner";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageAction,
  MessageActions,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
} from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { useConversation, useConversations, useCreateConversation, useMessages } from "../hooks/use-conversations";
interface ConversationSidebarProps {
  projectId: Id<"projects">;
}
export const ConversationSidebar = ({
  projectId,
}: ConversationSidebarProps) => {
  return <div>Sidebar</div>;
};
