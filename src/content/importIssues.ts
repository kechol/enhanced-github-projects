import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";

import { IssuesData } from "../interfaces/github/query";
import { ProjectNode } from "../interfaces/github/node";
import { syncStorage } from "../utils/storage";
import { getProjectPath, getOwnerAndRepo, getProjectName } from "../utils/page";
import { fetchProject, fetchIssuesByLabel, addProjectCard } from "../queries";

const menuDom = `
  <hr class="p-0 mt-2 mb-2">
  <button class="dropdown-item btn-link btn-block text-left egp-import-issues" role="menuitem" aria-expanded="false">
    Import Issues
  </button>
`;

async function importIssuesByLabel(project: ProjectNode, labelName: string) {
  const issuesData: IssuesData = await fetchIssuesByLabel(labelName);
  console.log("importIssues:fetchIssuesByLabel", issuesData);
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
    dropdownMenu.append(doma(menuDom));
    const project = await fetchProject(projectName);
    console.log("importIssues:fetchProject", project);
    delegate(".egp-import-issues", "click", () => importIssuesByLabel(project, options.projects[projectPath]!.labelName));
  }
}

export default init;
