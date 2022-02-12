// function refresh() {
//   const title = document.querySelector('.challenge-title-breadcrumbs');
//   const description = document.querySelector('.challenge-title-wrap');
//   const helpButtons = document.querySelector('.tool-panel-group button-group');
//   const testCases = document.querySelector('.challenge-test-suite');


//   console.log(title, description, helpButtons, testCases);
//   chrome.tabs.getCurrent(function (tab) { console.log(tab.url); });
// }
function refresh() {
  const title = document.querySelector('.challenge-title-breadcrumbs');
  const description = document.querySelector('#description');
  const helpButtons = document.querySelector('#get-help-dropdown');
  const testCases = document.querySelector('.challenge-test-suite');
  const output = document.getElementsByClassName('horizontal reflex-element');
  console.log('LOL', title, description, helpButtons, testCases, output);

  title?.remove();
  description?.remove();
  helpButtons?.remove();
  testCases?.remove();
  output[2]?.remove();
}

const button = document.getElementById("refresh");

button.addEventListener('click', function (e) {
  chrome.tabs.executeScript({
    code: '(' + refresh + ')();' //argument here is a string but function.toString() returns function's code
  });
});

function log() {
  console.log('changeInfo');
}
chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    alert('lol');
  }
)

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   console.log('changeInfo');
//   chrome.tabs.executeScript({
//     code: '(' + log + ')();' //argument here is a string but function.toString() returns function's code
//   });
// })
