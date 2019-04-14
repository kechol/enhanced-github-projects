import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";

import { WindowWithEGP } from "../interfaces/egp";
import { IssueNode, ProjectNode } from "../interfaces/github/node";
import { getSearchText } from "../utils/page";
import { fetchAllIssuesByLabel, addProjectCard } from "../queries";
import { importIssuesMenuItemTemplate } from "../utils/template";

async function importIssuesByLabel(columnId: string) {
  const searchText = getSearchText();
  if (searchText != "") {
    const issues: Array<IssueNode> = await fetchAllIssuesByLabel(searchText);
    issues.map(async issue => {
      await addProjectCard(issue.id, columnId);
    });
  }
}

function init() {
  (window as WindowWithEGP).__egp.emitter.once("egp:loadProject:done", (project: ProjectNode) => {
    project.columns.nodes.map(column => {
      const dropdownMenuDiv = select(`#column-${column.databaseId} > .js-details-container .dropdown-menu`);
      if (dropdownMenuDiv) {
        dropdownMenuDiv.append(doma(importIssuesMenuItemTemplate(column.id)));
      }
    });

    delegate(".egp-import-issues", "click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.dataset.columnId) {
        importIssuesByLabel(target.dataset.columnId);
      }
    });
  });
}

export default init;
