"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Page() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  return (
    <div>
      Add a project <br />
      <Button
        onClick={() => createProject({ name: "New Project" })}
        variant="default"
      >
        Add a project
      </Button>
      <div>
        {projects?.map((project) => (
          <h6 key={project.ownerId}>
            {project.name} <span>{project.ownerId}</span>
          </h6>
        ))}
      </div>
    </div>
  );
}
