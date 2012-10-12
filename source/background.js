chrome.extension.onRequest.addListener(function (request, sender, callback) {
  if(request.action == "pageStart") {
    chrome.pageAction.show(sender.tab.id);
  }
  else {
    var theTextArea = document.getElementById('the_text_area');
    theTextArea.value = request.text;
    theTextArea.select();
    document.execCommand("Copy");
  }
});