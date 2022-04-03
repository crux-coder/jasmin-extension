let modalFound = false;

/**
 * Removes breadcrumb title/navigation from the page.
 */
function removeBreadcrumbTitle() {
  const breadcrumbTitle = document.querySelector(
    '.challenge-title-breadcrumbs'
  );

  breadcrumbTitle?.remove();
}

/**
 * Removes contents of the description div.
 */
function removeDescription() {
  const description = document.querySelector('#description');

  if (description) description.innerHTML = '';
}

/**
 * Removes contents of the instructions div.
 */
function removeInstructions() {
  const instructions = document.querySelector('#instructions');

  if (instructions) instructions.innerHTML = '';
}

/**
 * Removes the "Get Help" button from the page.
 */
function removeHelpButton() {
  const getHelpButton = document.querySelector('#get-help-dropdown');

  getHelpButton?.remove();
}

/**
 * Removes the test cases from the page.
 */
function removeTestCases() {
  const testCases = document.querySelector('.challenge-test-suite');

  testCases?.remove();
}

/**
 * Removes the test output from the page
 */
function removeTestOutput() {
  const output = document.querySelectorAll('.horizontal.reflex-element');

  output[2]?.remove();
}

/**
 * Removes all the helpers from the page.
 */
function removeAllHelpers() {
  removeBreadcrumbTitle();
  removeDescription();
  removeInstructions();
  removeHelpButton();
  removeTestCases();
  removeTestOutput();
}

/**
 * Populates the description div from a challenge object that contains description.
 */
function populateDescription(element) {
  const description = document.querySelector('#description');
  if (description) description.innerHTML = element;
}

/**
 * Populates the instructions div from a challenge object that contains instructions.
 */
function populateInstructions(element) {
  const instructions = document.querySelector('#instructions');
  if (instructions) instructions.innerHTML = element;
}

/**
 * Based on each challenge removes elements from the page.
 */
function removeHelperElements(challenge) {
  if (challenge.remove)
    challenge.remove.forEach((element) => {
      switch (element) {
        case 'ALL_HELPERS':
          removeAllHelpers();
          break;
        case 'BREADCRUMB_TITLE':
          removeBreadcrumbTitle();
          break;
        case 'DESCRIPTION':
          removeDescription();
          break;
        case 'INSTRUCTIONS':
          removeDescription();
          break;
        case 'GET_HELP_BUTTON':
          removeHelpButton();
          break;
        case 'TEST_CASES':
          removeTestCases();
          break;
        case 'TEST_OUTPUT':
          removeTestOutput();
          break;
        default:
          removeAllHelpers();
          break;
      }
    });
}

/**
 * Populates elements that must be populated on the page with content.
 */
function populateElements(challenge) {
  populateDescription(challenge.description);
  populateInstructions(challenge.instructions);
}

function toggleExtensionOnIndicator() {
  const navBar = document.querySelector('nav');

  navBar.style.backgroundColor = 'green';
}

/**
 * Removes saved code from local storage.
 */
function clearCodeSaveFromLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    if (
      localStorage.key(i) === 'fcc-sound' ||
      localStorage.key(i) === 'accessibilityMode' ||
      localStorage.key(i) === 'currentChallengeId'
    )
      continue;
    localStorage.removeItem(localStorage.key(i));
  }
}

function toggleRedHighlight() {
  const codeEditor = document.querySelector('.horizontal .reflex-container');
  codeEditor.style.border = '3px solid #D1534C';
}

function addRunButtonListener() {
  const runButton = document.querySelector(
    '[aria-label="Run the tests use shortcut Ctrl+enter"]'
  );

  if (runButton) runButton.addEventListener('click', toggleRedHighlight);
}

/**
 * Document listener
 */
function addListenerDocument() {
  const logMutations = function (mutations, observer) {
    for (const mutation of mutations) {
      if (modalFound) return;
      if (mutation.type === 'childList') {
        const modal = document.querySelector('[role="dialog"] .modal');
        if (modal) {
          modalFound = true;
          const codeEditor = document.querySelector(
            '.horizontal .reflex-container'
          );
          codeEditor.style.border = '';
          chrome.storage.local.get('CHALLENGE_INDEX', function (items) {
            const { CHALLENGE_INDEX } = items;
            chrome.storage.local.set({
              CHALLENGE_INDEX: CHALLENGE_INDEX + 1,
            });
          });
        }
      }
    }
  };
  const observer = new MutationObserver(logMutations);
  const body = document.querySelector('body');
  observer.observe(body, { childList: true, subtree: true });
}

/**
 * Listens to message from background.js and reacts
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command == 'CLEAR_HELPERS') {
    chrome.storage.local.get(
      ['CHALLENGE_INDEX', 'RESPONSIVE_WEB_DESIGN_CHALLNEGES'],
      function (items) {
        const { CHALLENGE_INDEX, RESPONSIVE_WEB_DESIGN_CHALLNEGES } = items;
        removeHelperElements(RESPONSIVE_WEB_DESIGN_CHALLNEGES[CHALLENGE_INDEX]);
        populateElements(RESPONSIVE_WEB_DESIGN_CHALLNEGES[CHALLENGE_INDEX]);
        clearCodeSaveFromLocalStorage();
        addRunButtonListener();
        toggleExtensionOnIndicator();
      }
    );

    addListenerDocument();
  }
  sendResponse({ result: 'success' });
});
