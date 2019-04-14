import doma from "doma";
import select from "select-dom";

import { WindowWithEGP } from "../interfaces/window";
import { ProjectColumnNode, ProjectNode } from "../interfaces/github/node";
import { countPoint } from "../utils/chart";

function updateCountPoint(column: ProjectColumnNode) {
  const pointDiv = select(`#column-${column.databaseId} .egp-column-points`);
  if (pointDiv) {
    const totalPts = countPoint(column);
    const openPts = countPoint(column, "OPEN");
    pointDiv.textContent = `${openPts} Open / ${totalPts} Total`;
  }
}

async function init() {
  (window as WindowWithEGP).__egp.emitter.once("egp:loadProject:done", (project: ProjectNode) => {
    project.columns.nodes.map((column: ProjectColumnNode) => {
      const columnDetailsDiv = select(`#column-${column.databaseId} > .js-details-container`);
      if (columnDetailsDiv) {
        columnDetailsDiv.append(doma(`<div class="egp-column-points text-gray pb-2 px-3"></div>`));
      }
    });

    project.columns.nodes.map((column: ProjectColumnNode) => updateCountPoint(column));

    (window as WindowWithEGP).__egp.emitter.on("egp:loadProject:done", (project2: ProjectNode) => {
      project2.columns.nodes.map((column: ProjectColumnNode) => updateCountPoint(column));
    });
  });
}

export default init;
