let previousUrl = '';

function clearHelpers() {
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
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // TODO: Prevent from changin url by hand OR switching tabs
  // if (changeInfo.url) {
  //   if (
  //     !changeInfo.url.startsWith(
  //       'https://www.freecodecamp.org/learn/responsive-web-design/'
  //     )
  //   ) {
  //     alert('What are you doing? Hmm...');
  //     chrome.tabs.update({
  //       url: previousUrl,
  //     });
  //   } else {
  //     previousUrl = changeInfo.url;
  //   }
  // }
  chrome.tabs.executeScript({
    code: '(' + clearHelpers + ')();', //argument here is a string but function.toString() returns function's code
  });
});
