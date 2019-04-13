import select from "select-dom";

export const is404 = (): boolean => document.title === "Page not found · GitHub";
export const is500 = (): boolean => document.title === "Server Error · GitHub" || document.title === "Unicorn! · GitHub";
export const isLoggedOut = (): boolean => document.body && document.body.classList.contains("logged-out");
export const isProjectPage = (): boolean => document.body && document.body.classList.contains("project-page");

export const getProjectPath = (): string => {
  if (isProjectPage()) {
    return location.pathname.replace(/^[/]|[/]$/g, "");
  }

  return "";
};

export const getProjectName = (): string => {
  if (isProjectPage()) {
    return document.title;
  }

  return "";
};

export const getOwnerAndRepo = (): { ownerName: string; repoName: string } => {
  const [_, ownerName, repoName] = location.pathname.split("/", 3);
  return { ownerName, repoName };
};

export const getSearchText = (): string => {
  const searchTextInput: HTMLInputElement | null = select(".js-project-triage-search-text");

  if (searchTextInput) {
    return searchTextInput.value;
  }

  return "";
};
