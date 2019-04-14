import doma from "doma";
import select from "select-dom";

import { WindowWithEGP, EgpProjectConfig } from "../interfaces/egp";
import { ProjectColumnNode, ProjectNode } from "../interfaces/github/node";
import { countPoint } from "../utils/chart";
import { getProjectConfig } from "../utils/storage";

function updateCountPoint(projectConfig: EgpProjectConfig, column: ProjectColumnNode) {
  const pointDiv = select(`#column-${column.databaseId} .egp-column-points`);
  if (pointDiv) {
    const totalPts = countPoint(column, { countMethod: projectConfig.countMethod });
    const openPts = countPoint(column, { state: "OPEN", countMethod: projectConfig.countMethod });
    pointDiv.textContent = `${openPts} Open / ${totalPts} Total`;
  }
}

function init() {
  (window as WindowWithEGP).__egp.emitter.once("egp:loadProject:done", async (project: ProjectNode) => {
    const projectConfig = await getProjectConfig();

    project.columns.nodes.map((column: ProjectColumnNode) => {
      const columnDetailsDiv = select(`#column-${column.databaseId} > .js-details-container`);
      if (columnDetailsDiv) {
        columnDetailsDiv.append(doma(`<div class="egp-column-points text-gray pb-2 px-3"></div>`));
        updateCountPoint(projectConfig, column);
      }
    });

    (window as WindowWithEGP).__egp.emitter.on("egp:loadProject:done", (updatedProject: ProjectNode) => {
      updatedProject.columns.nodes.map((column: ProjectColumnNode) => updateCountPoint(projectConfig, column));
    });
  });
}

export default init;
