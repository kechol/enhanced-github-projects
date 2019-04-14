import { EgpConfig, EgpProjectConfig } from "../interfaces/egp";
import { getProjectPath } from "./page";

export const configDefaults: EgpConfig = {
  personalToken: "",
  projects: {}
};

export const syncStorage = {
  setOptions: async function(options: Partial<EgpConfig>) {
    const currents = await syncStorage.getOptions();
    chrome.storage.sync.set({
      ...currents,
      ...options,
      projects: {
        ...currents.projects,
        ...options.projects
      }
    });
  },
  getOptions: function(defaults = configDefaults): Promise<EgpConfig> {
    return new Promise(resolve => {
      chrome.storage.sync.get(defaults, options => resolve(options as EgpConfig));
    });
  }
};

export const getProjectConfig = async (): Promise<EgpProjectConfig> => {
  const projectPath = getProjectPath();
  const options = await syncStorage.getOptions();
  return (projectPath && options.projects[projectPath]) || {};
};
