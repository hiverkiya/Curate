import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
export const useCreateFile = () => {
  return useMutation(api.files.createFile);
};
export const useCreateFolder = () => {
  return useMutation(api.files.createFolder);
};
