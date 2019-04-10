export const configMenuItemTemplate = `
  <div class="pl-4 hide-sm egp-config-menu-item">
    <button class="btn-link muted-link project-header-link v-align-middle no-underline no-wrap egp-open-config-dialog" type="button" aria-haspopup="true">
      <span class="hide-md">[EGP] Config</span>
    </button>
  </div>
`;

export const configDialogTemplate = `
  <details class="details-reset details-overlay details-overlay-dark lh-default text-gray-dark egp-config-dialog">
    <summary aria-haspopup="dialog" aria-label="Close dialog"></summary>
    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast project-dialog" role="dialog">
      <div class="d-flex flex-column flex-auto overflow-hidden">
        <div class="Box-header">
          <h3 class="Box-title">[EGP] Config</h3>
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

export const importIssuesMenuItemTemplate = `
  <hr class="p-0 mt-2 mb-2">
  <button class="dropdown-item btn-link btn-block text-left egp-import-issues" role="menuitem" aria-expanded="false">
    [EGP] Import Issues
  </button>
`;

export const velocityMenuItemTemplate = `
  <div class="pl-4 hide-sm egp-velocity-menu-item">
    <button class="btn-link muted-link project-header-link v-align-middle no-underline no-wrap egp-open-velocity-chart" type="button" aria-haspopup="true">
      <span class="hide-md">[EGP] Velocity</span>
    </button>
  </div>
`;

export const velocityChartContainerTemplate = `
  <div class="p-2 egp-velocity-chart-container">
    <canvas id="egp-velocity-chart"></canvas>
  </div>
`;
