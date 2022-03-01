function isCurrentURLWhitelisted(RESPONSIVE_WEB_DESIGN_CHALLNEGES, url) {
  if (!url) return false;

  for (let i = 0; i < RESPONSIVE_WEB_DESIGN_CHALLNEGES.length; i++) {
    if (url.startsWith(RESPONSIVE_WEB_DESIGN_CHALLNEGES[i].url)) return true;
  }

  return false;
}

// function executeClearScript(tab) {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ['content.js'],
//   });
// }

function isOnAppliedAccesibilitySection(tab) {
  const APPLIED_ACCESSIBILITY_URL =
    'https://www.freecodecamp.org/learn/responsive-web-design/applied-accessibility';

  return tab.url.startsWith(APPLIED_ACCESSIBILITY_URL);
}

function skipAppliedAccesibilitySection() {
  const RESPONSIVE_WEB_DESIGN_PRINCIPLES_URL =
    'https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-principles/create-a-media-query';
  const RESPONSIVE_WEB_DESIGN_PRINCIPLES_INDEX = 124;
  chrome.storage.local.set(
    { CHALLENGE_INDEX: RESPONSIVE_WEB_DESIGN_PRINCIPLES_INDEX },
    () => {
      chrome.tabs.update({
        url: RESPONSIVE_WEB_DESIGN_PRINCIPLES_URL,
      });
    }
  );
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
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
      if (!FCC_UTILITY_ENABLED) return;
      if (isOnAppliedAccesibilitySection(tab)) skipAppliedAccesibilitySection();
      if (
        !isCurrentURLWhitelisted(RESPONSIVE_WEB_DESIGN_CHALLNEGES, tab.url) ||
        !tab.url.startsWith(
          RESPONSIVE_WEB_DESIGN_CHALLNEGES[CHALLENGE_INDEX].url
        )
      ) {
        chrome.tabs.update({
          url: RESPONSIVE_WEB_DESIGN_CHALLNEGES[CHALLENGE_INDEX].url,
        });
      }

      chrome.tabs.sendMessage(tabId, { command: 'CLEAR_HELPERS' });
    }
  );
});

(function () {
  console.log('INIT_BACKGROUND');
  const ResponsiveWebDesignChallengesURL = chrome.runtime.getURL(
    'data/ResponsiveWebDesignChallenges.json'
  );

  fetch(ResponsiveWebDesignChallengesURL)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
      chrome.storage.local.set({
        RESPONSIVE_WEB_DESIGN_CHALLNEGES: json,
        CHALLENGE_INDEX: 0,
        FCC_UTILITY_ENABLED: false,
      });
    });
})();
