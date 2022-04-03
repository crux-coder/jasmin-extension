const startTestButton = document.getElementById('startTest');
const resetButton = document.getElementById('resetProgress');
const onOffSwitch = document.getElementById('sliderSwitch');
const challengeSelect = document.getElementById('challenge-select');

challengeSelect.addEventListener('change', function () {
  chrome.storage.local.get(
    'RESPONSIVE_WEB_DESIGN_CHALLNEGES',
    function (items) {
      const { RESPONSIVE_WEB_DESIGN_CHALLNEGES } = items;
      if (challengeSelect.value)
        chrome.tabs.update({
          url: challengeSelect.value,
        });
      chrome.storage.local.set({
        CHALLENGE_INDEX: RESPONSIVE_WEB_DESIGN_CHALLNEGES.findIndex(
          (challenge) => challenge.url == challengeSelect.value
        ),
      });
    }
  );
});

resetButton.addEventListener('click', function () {
  chrome.storage.local.set({ CHALLENGE_INDEX: 0 });
  chrome.storage.local.set({ FCC_UTILITY_ENABLED: true });
  chrome.tabs.update({
    url: 'https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements',
  });
  challengeSelect.value =
    'https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements';
  onOffSwitch.checked = true;
});

onOffSwitch.addEventListener('change', function () {
  if (onOffSwitch.checked) {
    chrome.storage.local.set({ FCC_UTILITY_ENABLED: true });
  } else {
    chrome.storage.local.set({ FCC_UTILITY_ENABLED: false });
  }
  chrome.tabs.reload();
});

startTestButton.addEventListener('click', function (e) {
  onOffSwitch.checked = true;
  chrome.storage.local.set({ FCC_UTILITY_ENABLED: true });
  chrome.tabs.update({
    url: 'https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements',
  });
});

function populateDropdown(RESPONSIVE_WEB_DESIGN_CHALLNEGES) {
  const select = document.getElementById('challenge-select');
  let section;
  let counter = 1;
  for (let i = 0; i < RESPONSIVE_WEB_DESIGN_CHALLNEGES.length; i++) {
    if (!section) {
      section = document.createElement('optgroup');
      section.label = RESPONSIVE_WEB_DESIGN_CHALLNEGES[i].section;
      counter = 1;
    }
    if (
      i >= 1 &&
      RESPONSIVE_WEB_DESIGN_CHALLNEGES[i].section.localeCompare(
        RESPONSIVE_WEB_DESIGN_CHALLNEGES[i - 1].section
      ) != 0
    ) {
      select.appendChild(section);
      section = document.createElement('optgroup');
      section.label = RESPONSIVE_WEB_DESIGN_CHALLNEGES[i].section;
    }
    const option = document.createElement('option');
    option.value = RESPONSIVE_WEB_DESIGN_CHALLNEGES[i].url;
    option.innerText =
      counter + ' - ' + RESPONSIVE_WEB_DESIGN_CHALLNEGES[i].name;
    counter++;
    section.appendChild(option);
  }
  // Last section
  select.appendChild(section);
}

const baseURL = 'https://www.freecodecamp.org/learn/responsive-web-design';

(function () {
  chrome.storage.local.get(
    [
      'CHALLENGE_INDEX',
      'FCC_UTILITY_ENABLED',
      'RESPONSIVE_WEB_DESIGN_CHALLNEGES',
    ],
    function (items) {
      const {
        CHALLENGE_INDEX,
        FCC_UTILITY_ENABLED,
        RESPONSIVE_WEB_DESIGN_CHALLNEGES,
      } = items;
      onOffSwitch.checked = FCC_UTILITY_ENABLED || false;
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (tabs[0]?.url.startsWith(baseURL)) {
          startTestButton.disabled = true;
        }
      });
      populateDropdown(RESPONSIVE_WEB_DESIGN_CHALLNEGES);
      challengeSelect.value =
        RESPONSIVE_WEB_DESIGN_CHALLNEGES[CHALLENGE_INDEX].url || '';
    }
  );
})();
