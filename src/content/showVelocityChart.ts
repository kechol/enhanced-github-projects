import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";
import * as Chart from "chart.js";

import { WindowWithEGP } from "../interfaces/window";
import { ProjectNode } from "../interfaces/github/node";
import { velocityChartContainerTemplate, velocityMenuItemTemplate } from "../utils/template";
import { velocityChartOptions, velocityChartData } from "../utils/chart";

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

function setupVelocityChart(project: ProjectNode) {
  const projectHeaderDiv = select(".js-project-header");

  if (projectHeaderDiv) {
    projectHeaderDiv.after(doma(velocityChartContainerTemplate));

    (window as WindowWithEGP).__egp.velocityChart = new Chart("egp-velocity-chart", {
      type: "bar",
      data: velocityChartData(project.columns.nodes),
      options: velocityChartOptions()
    });
  }
}

function updateVelocityChart(project: ProjectNode) {
  const chart = (window as WindowWithEGP).__egp.velocityChart;

  if (chart) {
    chart.data = velocityChartData(project.columns.nodes);
    chart.update();
  }
}

async function init() {
  (window as WindowWithEGP).__egp.emitter.once("egp:loadProject:done", (project: ProjectNode) => {
    setupVelocityConfig();
    setupVelocityChart(project);

    (window as WindowWithEGP).__egp.emitter.on("egp:loadProject:done", updateVelocityChart);
  });
}

export default init;
