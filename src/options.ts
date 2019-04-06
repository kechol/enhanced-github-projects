function saveOptions(e: Event) {
  e.preventDefault();
  const personalToken = (document.getElementById("personal_token") as HTMLInputElement).value;
  chrome.storage.sync.set({
    personalToken
  });
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      personalToken: ""
    },
    function(items) {
      (document.getElementById("personal_token") as HTMLInputElement).value = items.personalToken;
    }
  );
}

document.addEventListener("DOMContentLoaded", function() {
  restoreOptions();
  (document.getElementById("personal_token") as HTMLInputElement).addEventListener("change", saveOptions);
});
