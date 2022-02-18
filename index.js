const startTestButton = document.getElementById("startTest");
const onOffSwitch = document.getElementById("sliderSwitch");

onOffSwitch.addEventListener('change', function () {
  if (onOffSwitch.checked) {
    chrome.storage.sync.set({ "fccUtilityOn": true });
  } else {
    chrome.storage.sync.set({ "fccUtilityOn": false });
  }
});

startTestButton.addEventListener('click', function (e) {
  onOffSwitch.checked = true;
  chrome.storage.sync.set({ "fccUtilityOn": true });
  chrome.tabs.update({
    url: "https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements"
  });
});


(function () {
  let _onOffSwitch = document.getElementById("sliderSwitch");
  chrome.storage.sync.get("fccUtilityOn", function (items) {
    _onOffSwitch.checked = items.fccUtilityOn || false;
  });
})();
