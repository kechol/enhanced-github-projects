interface Options {
  personalToken: string;
  projects: {
    [projectPath: string]:
      | {
          labelNames: string[] | undefined;
        }
      | undefined;
  };
}

export const optionDefaults: Options = {
  personalToken: "",
  projects: {}
};

export const syncStorage = {
  setOptions: async function(options: Partial<Options>) {
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
  getOptions: function(defaults = optionDefaults): Promise<Options> {
    return new Promise(resolve => {
      chrome.storage.sync.get(defaults, options => resolve(options as Options));
    });
  }
};
