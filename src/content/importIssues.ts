import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";

import { WindowWithEGP } from "../interfaces/window";
import { IssuesData } from "../interfaces/github/query";
import { ProjectNode } from "../interfaces/github/node";
import { syncStorage } from "../utils/storage";
import { getProjectPath } from "../utils/page";
import { fetchIssuesByLabel, addProjectCard } from "../queries";
import { importIssuesMenuItemTemplate } from "../utils/template";

async function importIssuesByLabel(project: ProjectNode, labelNames: string[]) {
  const issuesData: IssuesData = await fetchIssuesByLabel(labelNames);
  console.log("importIssues:fetchIssuesByLabel", labelNames, issuesData);
  issuesData.repository.issues.nodes.map(async issue => {
    await addProjectCard(issue.id, project.columns.nodes[0].id);
  });
}

async function init() {
  const project = (window as WindowWithEGP).__egp.project;
  const options = await syncStorage.getOptions();
  const projectPath = getProjectPath();
  const projectOptions = options.projects[projectPath];
  const dropdownMenu = select(".project-column:first-child .details-container .dropdown-menu");

  if (dropdownMenu && project && projectOptions) {
    dropdownMenu.append(doma(importIssuesMenuItemTemplate));
    delegate(".egp-import-issues", "click", () => importIssuesByLabel(project, projectOptions.labelNames || []));
  }
}

export default init;
