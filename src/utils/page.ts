export const is404 = (): boolean => document.title === "Page not found · GitHub";
export const is500 = (): boolean => document.title === "Server Error · GitHub" || document.title === "Unicorn! · GitHub";
export const isLoggedOut = (): boolean => document.body && document.body.classList.contains("logged-out");
export const isProjectPage = (): boolean => document.body && document.body.classList.contains("project-page");

export const getProjectPath = (): string | null => {
  if (isProjectPage()) {
    return location.pathname.replace(/^[/]|[/]$/g, "");
  }

  return null;
};

export const getProjectName = (): string | null => {
  if (isProjectPage()) {
    return document.title;
  }

  return null;
};

export const getOwnerAndRepo = (): { ownerName: string; repoName: string } => {
  const [_, ownerName, repoName] = location.pathname.split("/", 3);
  return { ownerName, repoName };
};
