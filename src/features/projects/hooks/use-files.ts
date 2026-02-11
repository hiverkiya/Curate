import { useMutation, useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

<<<<<<< HEAD
export const useCreateFile = () => {
  return useMutation(api.files.createFile);
=======
export const useFile = (fileId: Id<"files"> | null) => {
  return useQuery(api.files.getFile, fileId ? { id: fileId } : "skip");
};

export const useFilePath = (fileId: Id<"files"> | null) => {
  return useQuery(api.files.getFilePath, fileId ? { id: fileId } : "skip");
};

export const useUpdateFile = () => {
  return useMutation(api.files.updateFile);
};
 
export const useCreateFile = () => {
  return useMutation(api.files.createFile);
  // TODO: Add optimistic mutation
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
};

export const useCreateFolder = () => {
  return useMutation(api.files.createFolder);
<<<<<<< HEAD
=======
  // TODO: Add optimistic mutation
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
};

export const useRenameFile = () => {
  return useMutation(api.files.renameFile);
<<<<<<< HEAD
=======
  // TODO: Add optimistic mutation
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
};

export const useDeleteFile = () => {
  return useMutation(api.files.deleteFile);
<<<<<<< HEAD
=======
  // TODO: Add optimistic mutation
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
};

export const useFolderContents = ({
  projectId,
  parentId,
  enabled = true,
}: {
  projectId: Id<"projects">;
  parentId?: Id<"files">;
  enabled?: boolean;
}) => {
  return useQuery(
    api.files.getFolderContents,
    enabled ? { projectId, parentId } : "skip",
  );
};
