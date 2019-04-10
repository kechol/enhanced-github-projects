import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";
import * as Chart from "chart.js";

import { WindowWithEGP } from "../interfaces/window";
import { syncStorage } from "../utils/storage";
import { getProjectPath } from "../utils/page";
import { velocityChartContainerTemplate, velocityMenuItemTemplate } from "../utils/template";

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

function setupVelocityChart() {
  const projectHeaderDiv = select(".project-header");
  if (projectHeaderDiv) {
    projectHeaderDiv.after(doma(velocityChartContainerTemplate));

    new Chart("egp-velocity-chart", {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}

async function init() {
  const project = (window as WindowWithEGP).__egp.project;
  const options = await syncStorage.getOptions();
  const projectPath = getProjectPath();
  const projectOptions = options.projects[projectPath];

  if (project && projectOptions) {
    setupVelocityConfig();
    setupVelocityChart();
  }
}

export default init;
