import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";

import { syncStorage } from "../utils/storage";
import { getProjectPath } from "../utils/page";
import { configDialogTemplate, configMenuItemTemplate } from "../utils/template";

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

    const options = await syncStorage.getOptions();
    const projectOptions = options.projects[projectPath];
    (document.getElementById("personal_token") as HTMLInputElement).value = options.personalToken;
    if (projectOptions) {
      (document.getElementById("project_label_name") as HTMLInputElement).value = (projectOptions.labelNames || []).join(",");
    }
  }
}

async function saveConfig(e?: Event) {
  if (e) {
    e.preventDefault();
  }

  const projectPath = getProjectPath();
  const personalToken = (document.getElementById("personal_token") as HTMLInputElement).value;
  const projectLabelNames = (document.getElementById("project_label_name") as HTMLInputElement).value.split(",");

  if (projectPath) {
    syncStorage.setOptions({
      personalToken,
      projects: {
        [projectPath]: { labelNames: projectLabelNames }
      }
    });

    location.reload();
  }
}

function init() {
  const headerControlsDiv = select(".project-header-controls");

  if (headerControlsDiv) {
    headerControlsDiv.append(doma(configMenuItemTemplate));
    document.body.append(doma(configDialogTemplate));

    delegate(".egp-open-config-dialog", "click", openConfigDialog);
    delegate(".egp-save-config", "click", saveConfig);
  }
}

export default init;
