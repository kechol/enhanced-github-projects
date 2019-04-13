import { Connection, IssueNode, ProjectNode, ProjectCardNode, ProjectColumnNode } from "./node";

export interface Error {
  message: string;
}

export interface SearchResultItemData {
  search: Connection<IssueNode>;
}

export interface IssuesData {
  repository: {
    issues: Connection<IssueNode>;
  };
}

export interface ProjectsData {
  repository: {
    projects: Connection<ProjectNode>;
  };
}

interface AddProjectCardInputTypeContent {
  clientMutationId?: string;
  projectColumnId: string;
  contentId: string;
}

interface AddProjectCardInputTypeNote {
  clientMutationId?: string;
  projectColumnId: string;
  note: string;
}

export type AddProjectCardInput = AddProjectCardInputTypeContent | AddProjectCardInputTypeNote;

export interface AddProjectCardMutation {
  cardEdge: {
    cursor: string;
    node: ProjectCardNode;
  };
  clientMutationId: string;
  projectColumn: ProjectColumnNode;
}
