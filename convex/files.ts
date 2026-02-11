import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";
<<<<<<< HEAD
import { Id } from "./_generated/dataModel";
=======
import { Doc, Id } from "./_generated/dataModel";
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2

export const getFiles = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    return await ctx.db
      .query("files")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const getFile = query({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

<<<<<<< HEAD
    if (!file) {
=======
     if (!file) {
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
      throw new Error("File not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    return file;
  },
});

<<<<<<< HEAD
export const getFolderContents = query({
  args: {
=======
/**
 * Builds the full path to a file by traversing up the parent chain.
 *
 * Input:  A file ID (e.g., the ID of "button.tsx")
 * Output: Array of ancestors from root to file: [{ _id, name: "src" }, { _id, name: "components" }, { _id, name: "button.tsx" }]
 *
 * Used for: Breadcrumbs navigation (src > components > button.tsx)
 */
export const getFilePath = query({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) {
      throw new Error("File not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    const path: { _id: string; name: string }[] = [];
    let currentId: Id<"files"> | undefined = args.id;

    while (currentId) {
      const file = (await ctx.db.get("files", currentId)) as 
        | Doc<"files">
        | undefined;
      if (!file) break;

      path.unshift({ _id: file._id, name: file.name });
      currentId = file.parentId;
    }

    return path;
  },
});

export const getFolderContents = query({
  args: { 
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
<<<<<<< HEAD
        q.eq("projectId", args.projectId).eq("parentId", args.parentId),
=======
        q
          .eq("projectId", args.projectId)
          .eq("parentId", args.parentId)
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
      )
      .collect();

    // Sort: folders first, then files, alphabetically within each group
    return files.sort((a, b) => {
      // Folders come before files
      if (a.type === "folder" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "folder") return 1;

<<<<<<< HEAD
      // Within the same type, sort alphabetically by name
=======
      // Within same type, sort alphabetically by name
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
      return a.name.localeCompare(b.name);
    });
  },
});

export const createFile = mutation({
<<<<<<< HEAD
  args: {
=======
  args: { 
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
    name: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    // Check if file with same name already exists in this parent folder
    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
<<<<<<< HEAD
        q.eq("projectId", args.projectId).eq("parentId", args.parentId),
=======
        q
          .eq("projectId", args.projectId)
          .eq("parentId", args.parentId)
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
      )
      .collect();

    const existing = files.find(
<<<<<<< HEAD
      (file) => file.name === args.name && file.type === "file",
=======
      (file) => file.name === args.name && file.type === "file"
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
    );

    if (existing) throw new Error("File already exists");

    const now = Date.now();

    await ctx.db.insert("files", {
      projectId: args.projectId,
      name: args.name,
      content: args.content,
      type: "file",
      parentId: args.parentId,
      updatedAt: now,
    });

    await ctx.db.patch("projects", args.projectId, {
      updatedAt: now,
    });
  },
});

export const createFolder = mutation({
<<<<<<< HEAD
  args: {
=======
  args: { 
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    // Check if folder with same name already exists in this parent folder
    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
<<<<<<< HEAD
        q.eq("projectId", args.projectId).eq("parentId", args.parentId),
=======
        q
          .eq("projectId", args.projectId)
          .eq("parentId", args.parentId)
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
      )
      .collect();

    const existing = files.find(
<<<<<<< HEAD
      (file) => file.name === args.name && file.type === "folder",
=======
      (file) => file.name === args.name && file.type === "folder"
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
    );

    if (existing) throw new Error("Folder already exists");

    const now = Date.now();

    await ctx.db.insert("files", {
      projectId: args.projectId,
      name: args.name,
      type: "folder",
      parentId: args.parentId,
      updatedAt: now,
    });

    await ctx.db.patch("projects", args.projectId, {
      updatedAt: now,
    });
  },
});

export const renameFile = mutation({
  args: {
    id: v.id("files"),
    newName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) throw new Error("File not found");

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    // Check if a file with the new name already exists in the same parent folder
    const siblings = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
<<<<<<< HEAD
        q.eq("projectId", file.projectId).eq("parentId", file.parentId),
=======
        q
          .eq("projectId", file.projectId)
          .eq("parentId", file.parentId)
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
      )
      .collect();

    const existing = siblings.find(
      (sibling) =>
        sibling.name === args.newName &&
        sibling.type === file.type &&
<<<<<<< HEAD
        sibling._id !== args.id,
=======
        sibling._id !== args.id
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
    );

    if (existing) {
      throw new Error(
<<<<<<< HEAD
        `A ${file.type} with this name already exists in this location`,
=======
        `A ${file.type} with this name already exists in this location`
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
      );
    }

    const now = Date.now();

    // Update the file's name
    await ctx.db.patch("files", args.id, {
      name: args.newName,
      updatedAt: now,
    });

    await ctx.db.patch("projects", file.projectId, {
      updatedAt: now,
    });
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
});

export const deleteFile = mutation({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) throw new Error("File not found");

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    // Recursively delete file/folder and all descendants
    const deleteRecursive = async (fileId: Id<"files">) => {
      const item = await ctx.db.get("files", fileId);

      if (!item) {
        return;
      }

      // If it's a folder, delete all children first
<<<<<<< HEAD
      if (item.type === "folder") {
        const children = await ctx.db
          .query("files")
          .withIndex("by_project_parent", (q) =>
            q.eq("projectId", item.projectId).eq("parentId", fileId),
          )
          .collect();

        for (const child of children) {
          await deleteRecursive(child._id);
        }
      }

      // Delete storage file if it exists
      if (item.storageId) {
=======
       if (item.type === "folder") {
         const children = await ctx.db
          .query("files")
          .withIndex("by_project_parent", (q) =>
            q
              .eq("projectId", item.projectId)
              .eq("parentId", fileId)
          )
          .collect();

          for (const child of children) {
            await deleteRecursive(child._id);
          }
       }

       // Delete storage file if it exists
       if (item.storageId) {
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
        await ctx.storage.delete(item.storageId);
      }

      // Delete the file/folder itself
      await ctx.db.delete("files", fileId);
    };

    await deleteRecursive(args.id);

    await ctx.db.patch("projects", file.projectId, {
      updatedAt: Date.now(),
    });
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
});

export const updateFile = mutation({
  args: {
    id: v.id("files"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) throw new Error("File not found");

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized to access this project");
    }

    const now = Date.now();

    await ctx.db.patch("files", args.id, {
      content: args.content,
      updatedAt: now,
    });

    await ctx.db.patch("projects", file.projectId, {
      updatedAt: now,
    });
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 4e0d0bf23a21334c90811c6b00320bd03931f1c2
