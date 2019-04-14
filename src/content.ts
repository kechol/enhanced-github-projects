import delegate from "delegate-it";
import * as EventEmitter from "eventemitter3";
import throttle from "lodash-es/throttle";

import configMenu from "./content/configMenu";
import importIssuesMenu from "./content/importIssuesMenu";
import showColumnPoints from "./content/showColumnPoints";
import showVelocityChart from "./content/showVelocityChart";
import { is404, is500, isLoggedOut, isProjectPage, getProjectName, getProjectPath } from "./utils/page";
import { syncStorage } from "./utils/storage";
import { debug } from "./utils/debug";
import { fetchProject } from "./queries";
import { WindowWithEGP } from "./interfaces/egp";

document.addEventListener("DOMContentLoaded", () => {
  if (is404() || is500() || isLoggedOut() || !isProjectPage()) {
    return;
  }

  if (!(window as WindowWithEGP).__egp) {
    (window as WindowWithEGP).__egp = {
      project: undefined,
      emitter: new EventEmitter()
    };
  }

  configMenu();
  watchDOMChange();
  importIssuesMenu();
  showColumnPoints();
  showVelocityChart();

  document.body.classList.add("enhanced-github-projects");
  (window as WindowWithEGP).__egp.emitter.on("egp:loadProject:start", loadProject);
  (window as WindowWithEGP).__egp.emitter.emit("egp:loadProject:start");
});

export const loadProject = async () => {
  const projectName = getProjectName();
  const projectPath = getProjectPath();
  const options = await syncStorage.getOptions();
  const projectOptions = options.projects[projectPath];

  if (projectOptions) {
    const project = await fetchProject(projectName);
    (window as WindowWithEGP).__egp.project = project;
    (window as WindowWithEGP).__egp.emitter.emit("egp:loadProject:done", project);
  }
};

export const watchDOMChange = () => {
  const reloadableActions = ["card_update", "card_destroy", "column_reorder", "column_destroyed", "column_create"];

  const reloadProject = throttle((e: CustomEvent) => {
    debug(e.type, e.detail.name, e.detail.data);
    if (reloadableActions.includes(e.detail.data.action)) {
      (window as WindowWithEGP).__egp.emitter.emit("egp:loadProject:start");
    }
  }, 3000);

  delegate(".js-project-columns-container", "socket:message", reloadProject);
  // delegate(".js-project-column", "socket:message", reloadProject);
  // delegate(".js-project-column-card", "socket:message", reloadProject);
};
