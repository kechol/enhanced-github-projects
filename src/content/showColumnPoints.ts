import doma from "doma";
import select from "select-dom";

import { WindowWithEGP } from "../interfaces/window";
import { ProjectColumnNode } from "../interfaces/github/node";
import { countPoint } from "../utils/chart";

async function init() {
  const project = (window as WindowWithEGP).__egp.project;

  if (project) {
    project.columns.nodes.map((column: ProjectColumnNode) => {
      const totalPts = countPoint(column);
      const closedPts = countPoint(column, "OPEN");
      const columnDiv = select(`#column-${column.databaseId} > .js-details-container`);
      if (columnDiv) {
        columnDiv.append(doma(`<div class="egp-column-points text-gray pb-2 px-3">${closedPts} Closed / ${totalPts} Total</div>`));
      }
    });
  }
}

export default init;
