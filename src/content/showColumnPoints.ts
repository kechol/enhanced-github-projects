import doma from "doma";
import select from "select-dom";

import { WindowWithEGP } from "../interfaces/window";
import { syncStorage } from "../utils/storage";
import { getProjectPath } from "../utils/page";
import { ProjectColumnNode, ProjectCardNode } from "../interfaces/github/node";

function countPoint(column: ProjectColumnNode, state: "OPEN" | "CLOSED" | undefined = undefined) {
  let total = 0;

  column.cards.nodes.map((card: ProjectCardNode) => {
    if (state && card.content) {
      if (state === card.content.state) {
        total += 1;
      }
    } else {
      total += 1;
    }
  });

  return total;
}

async function init() {
  const project = (window as WindowWithEGP).__egp.project;
  const options = await syncStorage.getOptions();
  const projectPath = getProjectPath();
  const projectOptions = options.projects[projectPath];

  if (project && projectOptions) {
    project.columns.nodes.map((column: ProjectColumnNode) => {
      const totalPts = countPoint(column);
      const closedPts = countPoint(column, "OPEN");
      const columnDiv = select(`#column-${column.databaseId} > .js-details-container`);
      if (columnDiv) {
        columnDiv.append(doma(`<div class="egp-column-points text-gray pb-2 px-3">${closedPts} pts / ${totalPts} pts</div>`));
      }
    });
  }
}

export default init;
