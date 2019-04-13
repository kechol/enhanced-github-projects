import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";
import * as Chart from "chart.js";

import { WindowWithEGP } from "../interfaces/window";
import { ProjectNode } from "../interfaces/github/node";
import { velocityChartContainerTemplate, velocityMenuItemTemplate } from "../utils/template";
import { velocityLabels, velocityData, colorOptions, velocityChartOptions } from "../utils/chart";

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
  const projectHeaderDiv = select(".project-header");
  if (projectHeaderDiv) {
    projectHeaderDiv.after(doma(velocityChartContainerTemplate));

    const columnNodes = project.columns.nodes;
    columnNodes.shift(); // Ignore Backlog

    new Chart("egp-velocity-chart", {
      type: "bar",
      data: {
        labels: velocityLabels(columnNodes),
        datasets: [
          {
            label: "CLOSED",
            data: velocityData(columnNodes, "CLOSED"),
            backgroundColor: colorOptions(columnNodes.length, 0.6),
            borderColor: colorOptions(columnNodes.length, 1),
            borderWidth: 1
          },
          {
            label: "OPEN",
            data: velocityData(columnNodes, "OPEN"),
            backgroundColor: colorOptions(columnNodes.length, 0.2),
            borderColor: colorOptions(columnNodes.length, 1),
            borderWidth: 1
          }
        ]
      },
      options: velocityChartOptions()
    });
  }
}

async function init() {
  const project = (window as WindowWithEGP).__egp.project;

  if (project) {
    setupVelocityConfig();
    setupVelocityChart(project);
  }
}

export default init;
