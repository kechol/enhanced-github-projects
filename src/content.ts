import select from "select-dom";

import configMenu from "./content/configMenu";
import importIssues from "./content/importIssues";
import { is404, is500, isLoggedOut, isProjectPage } from "./utils/page";

chrome.runtime.sendMessage({}, function() {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      if (is404() || is500() || isLoggedOut() || !isProjectPage()) {
        return;
      }

      document.body.classList.add("enhanced-github-projects");

      // Init each functions
      configMenu();
      importIssues();
    }
  }, 10);
});

(window as any).select = select;
