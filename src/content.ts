import select from "select-dom";

import configMenu from "./content/configMenu";
import importIssues from "./content/importIssues";
import showColumnPoints from "./content/showColumnPoints";
import { is404, is500, isLoggedOut, isProjectPage, getProjectName, getProjectPath } from "./utils/page";
import { syncStorage } from "./utils/storage";
import { fetchProject } from "./queries";
import { WindowWithEGP } from "./interfaces/window";

chrome.runtime.sendMessage({}, function() {
  var readyStateCheckInterval = setInterval(async function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      if (is404() || is500() || isLoggedOut() || !isProjectPage()) {
        return;
      }

      if (!(window as WindowWithEGP).__egp) {
        (window as WindowWithEGP).__egp = {};
      }

      document.body.classList.add("enhanced-github-projects");
      configMenu();

      const projectName = getProjectName();
      const projectPath = getProjectPath();
      const options = await syncStorage.getOptions();
      const projectOptions = options.projects[projectPath];

      if (projectOptions) {
        (window as WindowWithEGP).__egp.project = await fetchProject(projectName);
        console.log("importIssues:fetchProject", (window as WindowWithEGP).__egp.project);

        importIssues();
        showColumnPoints();
      }
    }
  }, 10);
});

(window as any).select = select;
