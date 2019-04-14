import delegate from "delegate-it";
import * as EventEmitter from "eventemitter3";
import throttle from "lodash-es/throttle";

import configMenu from "./content/configMenu";
import importIssues from "./content/importIssues";
import showColumnPoints from "./content/showColumnPoints";
import showVelocityChart from "./content/showVelocityChart";
import { is404, is500, isLoggedOut, isProjectPage, getProjectName, getProjectPath } from "./utils/page";
import { syncStorage } from "./utils/storage";
import { fetchProject } from "./queries";
import { WindowWithEGP } from "./interfaces/window";

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
  importIssues();
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
  const reloadProject = throttle((e: CustomEvent) => {
    console.log(e.type);
    (window as WindowWithEGP).__egp.emitter.emit("egp:loadProject:start");
  }, 3000);

  delegate(".js-socket-channel", "socket:message", reloadProject);
};
