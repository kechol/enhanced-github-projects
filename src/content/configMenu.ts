import doma from "doma";
import select from "select-dom";
import delegate from "delegate-it";

import { syncStorage } from "../lib/storage";

interface HTMLDialogElement extends HTMLElement {
  open: boolean;
}

const menuDom = `
  <div class="pl-4 hide-sm">
    <button class="btn-link muted-link project-header-link v-align-middle no-underline no-wrap egp-open-config-dialog" type="button" aria-haspopup="true">
      <svg class="octicon octicon-three-bars" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"></path></svg> <span class="hide-md">EGP Config</span>
    </button>
  </div>
`;

const dialogDom = `
  <details class="details-reset details-overlay details-overlay-dark lh-default text-gray-dark egp-config-dialog">
    <summary aria-haspopup="dialog" aria-label="Close dialog"></summary>
    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast project-dialog" role="dialog">
      <div class="d-flex flex-column flex-auto overflow-hidden">
        <div class="Box-header">
          <h3 class="Box-title">EGP Config</h3>
        </div>
        <div class="Box-body border-0 rounded-0 m-0 py-0 overflow-auto">
          <form action="" class="pb-3">
            <dl class="form-group">
              <dt><label for="personal_token">Personal Token</label></dt>
              <dd>
                <input id="personal_token" name="personal_token" class="form-control" value="" />
              </dd>
            </dl>

            <dl class="form-group">
              <dt><label for="project_label_name">Label Name</label></dt>
              <dd>
                <input id="project_label_name" name="project_label_name" class="form-control" value="" />
              </dd>
            </dl>

            <div class="form-actions d-flex d-sm-block">
              <button class="btn btn-primary flex-auto float-sm-left egp-save-config">Save</button>
            </div>
          </form>
        </div>
      </div>

      <button
        class="Box-btn-octicon m-0 btn-octicon position-absolute right-0 top-0"
        type="button"
        aria-label="Close dialog"
        data-close-dialog=""
      >
        <svg class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
        </svg>
      </button>
    </details-dialog>
  </details>
`;

function closeConfigDialog(e?: Event) {
  if (e) {
    e.preventDefault();
  }

  const configDialog = select(".egp-config-dialog");
  if (configDialog) {
    (configDialog as HTMLDialogElement).open = false;
  }
}

async function openConfigDialog(e?: Event) {
  if (e) {
    e.preventDefault();
  }

  const configDialog = select(".egp-config-dialog");
  const projectPath = location.pathname;

  if (configDialog) {
    (configDialog as HTMLDialogElement).open = true;

    const options = await syncStorage.getOptions();
    (document.getElementById("personal_token") as HTMLInputElement).value = options.personalToken;
    if (options.projects[projectPath]) {
      (document.getElementById("project_label_name") as HTMLInputElement).value = options.projects[projectPath]!.labelName;
    }
  }
}

async function saveConfig(e?: Event) {
  if (e) {
    e.preventDefault();
  }

  const projectPath = location.pathname;
  const personalToken = (document.getElementById("personal_token") as HTMLInputElement).value;
  const projectLabelName = (document.getElementById("project_label_name") as HTMLInputElement).value;

  syncStorage.setOptions({
    personalToken,
    projects: {
      [projectPath]: { labelName: projectLabelName }
    }
  });

  closeConfigDialog();
}

function init() {
  const headerControls = select(".project-header-controls");

  if (headerControls) {
    headerControls.append(doma(menuDom));
    if (!select.exists(".egp-config-dialog")) {
      document.body.append(doma(dialogDom));
    }

    delegate(".egp-open-config-dialog", "click", openConfigDialog);
    delegate(".egp-save-config", "click", saveConfig);
  }
}

export default init;
