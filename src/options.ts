import { syncStorage } from "./lib/storage"

function saveOptions(e: Event) {
  e.preventDefault();
  const personalToken = (document.getElementById("personal_token") as HTMLInputElement).value;
  syncStorage.setOptions({ personalToken });
}

async function restoreOptions() {
  const options = await syncStorage.getOptions();
  (document.getElementById("personal_token") as HTMLInputElement).value = options.personalToken;
}

document.addEventListener("DOMContentLoaded", function() {
  restoreOptions();
  (document.getElementById("personal_token") as HTMLInputElement).addEventListener("change", saveOptions);
});
