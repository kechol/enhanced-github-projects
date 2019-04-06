import select from "select-dom";
import configMenu from "./content/configMenu";

const is404 = (): boolean => document.title === "Page not found · GitHub";
const is500 = (): boolean => document.title === "Server Error · GitHub" || document.title === "Unicorn! · GitHub";
const isLoggedOut = (): boolean => document.body.classList.contains("logged-out");
const isProjectPage = (): boolean => document.body.classList.contains("project-page");

chrome.runtime.sendMessage({}, function() {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      if (is404() || is500() || isLoggedOut() || !isProjectPage()) {
        return;
      }

      document.body.classList.add("enhanced-github-projects");

      // init
      configMenu();
    }
  }, 10);
});

(window as any).select = select;
