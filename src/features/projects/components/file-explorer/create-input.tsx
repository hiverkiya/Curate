import { ChevronRightIcon } from "lucide-react";
import { FilesIcon, FolderIcon } from "@react-symbols/icons/utils";
import { useState } from "react";
export const CreateInput = ({
  type,
  level,
  onSubmit,
  onCancel,
}: {
  type: "file" | "folder";
  level: number;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}) => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onSubmit(trimmedValue);
    } else {
      onCancel();
    }
  };
  return (
    <div className="w-full flex items-center gap-1 h-5.5 bg-accent/30"></div>
  );
};
