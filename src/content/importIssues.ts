import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";

import { IssuesData } from "../interfaces/github/query";
import { ProjectNode } from "../interfaces/github/node";
import { syncStorage } from "../utils/storage";
import { getProjectPath, getOwnerAndRepo, getProjectName } from "../utils/page";
import { fetchProject, fetchIssuesByLabel, addProjectCard } from "../queries";
import { importIssuesMenuItemTemplate } from "../utils/template";

async function importIssuesByLabel(project: ProjectNode, labelNames: string[]) {
  const issuesData: IssuesData = await fetchIssuesByLabel(labelNames);
  console.log("importIssues:fetchIssuesByLabel", labelNames, issuesData);
  issuesData.repository.issues.nodes.map(async issue => {
    await addProjectCard(issue.id, project.columns.nodes[0].id);
  });
}

async function init() {
  const projectName = getProjectName();
  const projectPath = getProjectPath();
  const options = await syncStorage.getOptions();
  const dropdownMenu = select(".project-column:first-child .details-container .dropdown-menu");

  if (dropdownMenu && projectName && projectPath && options.projects[projectPath]) {
    dropdownMenu.append(doma(importIssuesMenuItemTemplate));
    const project = await fetchProject(projectName);
    console.log("importIssues:fetchProject", project);
    delegate(".egp-import-issues", "click", () => importIssuesByLabel(project, options.projects[projectPath]!.labelNames || []));
  }
}

export default init;
