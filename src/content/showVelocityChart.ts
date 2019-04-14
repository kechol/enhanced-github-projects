import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";
import * as Chart from "chart.js";

import { WindowWithEGP, EgpProjectConfig } from "../interfaces/egp";
import { ProjectNode } from "../interfaces/github/node";
import { velocityChartContainerTemplate, velocityMenuItemTemplate } from "../utils/template";
import { velocityChartOptions, velocityChartData } from "../utils/chart";
import { getProjectConfig } from "../utils/storage";

function setupVelocityConfig() {
  const headerControlsDiv = select(".project-header-controls");

  if (headerControlsDiv) {
    headerControlsDiv.append(doma(velocityMenuItemTemplate));
    delegate(".egp-open-velocity-chart", "click", (e: Event) => {
      e.preventDefault();

      const containerDiv = select(".egp-velocity-chart-container");
      if (containerDiv) {
        containerDiv.classList.toggle("open");
      }
    });
  }
}

async function setupVelocityChart(projectConfig: EgpProjectConfig, project: ProjectNode) {
  const projectHeaderDiv = select(".js-project-header");

  if (projectHeaderDiv) {
    projectHeaderDiv.after(doma(velocityChartContainerTemplate));

    (window as WindowWithEGP).__egp.velocityChart = new Chart("egp-velocity-chart", {
      type: "bar",
      data: velocityChartData(project.columns.nodes, { countMethod: projectConfig.countMethod }),
      options: velocityChartOptions()
    });
  }
}

function updateVelocityChart(projectConfig: EgpProjectConfig, project: ProjectNode) {
  const chart = (window as WindowWithEGP).__egp.velocityChart;

  if (chart) {
    chart.data = velocityChartData(project.columns.nodes, { countMethod: projectConfig.countMethod });
    chart.update();
  }
}

function init() {
  (window as WindowWithEGP).__egp.emitter.once("egp:loadProject:done", async (project: ProjectNode) => {
    const projectConfig = await getProjectConfig();

    setupVelocityConfig();
    setupVelocityChart(projectConfig, project);

    (window as WindowWithEGP).__egp.emitter.on("egp:loadProject:done", (updatedProject: ProjectNode) => {
      updateVelocityChart(projectConfig, updatedProject);
    });
  });
}

export default init;
