import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";

import { syncStorage, getProjectConfig } from "../utils/storage";
import { getProjectPath } from "../utils/page";
import { configDialogTemplate, configMenuItemTemplate } from "../utils/template";
import { debug } from "../utils/debug";
import { CountMethodEnum } from "../interfaces/egp";

interface HTMLDialogElement extends HTMLElement {
  open: boolean;
}

export function closeConfigDialog(e?: Event) {
  if (e) {
    e.preventDefault();
  }

  const configDialog = select(".egp-config-dialog");
  if (configDialog) {
    (configDialog as HTMLDialogElement).open = false;
  }
}

export async function openConfigDialog(e?: Event) {
  if (e) {
    e.preventDefault();
  }

  const configDialog = select(".egp-config-dialog");
  const projectPath = getProjectPath();

  if (configDialog && projectPath) {
    (configDialog as HTMLDialogElement).open = true;
  }
}

async function saveConfig(e?: Event) {
  if (e) {
    e.preventDefault();
  }

  const projectPath = getProjectPath();
  const personalToken = (document.getElementById("personal_token") as HTMLInputElement).value;
  const countMethodKey = (document.getElementById("velocity_calculation") as HTMLInputElement).value as keyof typeof CountMethodEnum;

  if (projectPath) {
    const newOptions = {
      personalToken,
      projects: {
        [projectPath]: {
          countMethod: CountMethodEnum[countMethodKey]
        }
      }
    };

    syncStorage.setOptions(newOptions);
    location.reload();
  }
}

async function init() {
  const headerControlsDiv = select(".project-header-controls");

  if (headerControlsDiv) {
    const personalToken = (await syncStorage.getOptions()).personalToken;
    const projectConfig = await getProjectConfig();

    debug("configMenu:init", { personalToken }, projectConfig);

    headerControlsDiv.append(doma(configMenuItemTemplate));
    document.body.append(doma(configDialogTemplate(personalToken, projectConfig)));

    delegate(".egp-open-config-dialog", "click", openConfigDialog);
    delegate(".egp-save-config", "click", saveConfig);
  }
}

export default init;
