chrome.extension.sendRequest({'action': 'pageStart'});

$(document).ready(function(){
  $('.item').live('click', function(e){
    var storyId = $(this).attr('id').replace(/.*?(\d+).*/,"$1");
    var clip = {};

    if (e.shiftKey) {
      clip.alert    = "Copied id: ";
      clip.textData = storyId;
    } else if (e.metaKey) {
      clip.alert    = "Copied link: ";
      clip.textData = "https://www.pivotaltracker.com/story/show/" + storyId;
    }

    if (clip.textData) {
      $('<div id="copy-msg">')
        .css({ color: 'black' })
        .html(clip.alert + clip.textData)
        .prependTo('#status');
      $('#status')
        .fadeIn(10)
        .delay(1000)
        .fadeOut(500, function() {
          $('#copy-msg').remove();
        });

      chrome.extension.sendRequest({'text' : clip.textData});
    }
  });
});
