interface Options {
  personalToken: string
}

export const optionDefaults: Options = {
  personalToken: ""
}

export const syncStorage = {
  setOptions: function(options: Options) {
    chrome.storage.sync.set(options);
  },
  getOptions: function(defaults = optionDefaults): Promise<Options> {
    return new Promise(resolve => {
      chrome.storage.sync.get(defaults, (options) => resolve(options as Options));
    });
  }
};