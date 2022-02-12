chrome.tabs.onUpdated.addListener(gotMessage);
function gotMessage() {
  let paragraphs = document.getElementsByTagName("p");
  for (elt of paragraphs) {
    elt.style['background-color'] = '#00CED1';
  }
}