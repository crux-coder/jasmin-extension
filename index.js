const button = document.getElementById("refresh");

button.addEventListener('click', function (e) {
  chrome.tabs.update({
    url: "https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements"
  });
});

