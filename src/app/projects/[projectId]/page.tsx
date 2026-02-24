import { ProjectIdView } from "@/features/projects/components/project-id-view";

import { Id } from "../../../../convex/_generated/dataModel";

// Check for validator types
// Next expects URL params to be strings. To avoid the Next validator error,
// uncomment the alternative implementation below which accepts `projectId` as
// `string` and casts it to `Id<"projects">` at runtime.

const ProjectIdPage = async ({
  params,
}: {
  params: Promise<{ projectId: Id<"projects"> }>;
}) => {
  const { projectId } = await params;

  return <ProjectIdView projectId={projectId} />;
};

export default ProjectIdPage;

/*
// Alternative (uncomment to apply):
// const ProjectIdPage = async ({
//   params,
// }: {
//   params: Promise<{ projectId: string }>;
// }) => {
//   const { projectId: projectIdStr } = await params;
//   const projectId = projectIdStr as Id<"projects">;
//
//   return <ProjectIdView projectId={projectId} />;
// };
//
// export default ProjectIdPage;
*/
