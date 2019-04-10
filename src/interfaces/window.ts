import { ProjectNode } from "./github/node";

export interface WindowWithEGP extends Window {
  __egp: {
    project?: ProjectNode;
  };
}
