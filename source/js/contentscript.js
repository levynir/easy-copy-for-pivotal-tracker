$(function() {
  chrome.extension.sendMessage({'action': 'pageStart'});
});

$(document).on('click', '.item', function(e){
  var id = $(this).attr('class').replace(/.*?story_(\d+).*/,"$1");
  var name = $(this).find('.story_name').text();
  var link = "https://www.pivotaltracker.com/story/show/" + id;

  var clip;
  if ( e.shiftKey) {
    clip = "[#" + id + "] " + name + "\n(" + link + ")";
  }
  
  if (clip) {
    $('<div id="copy-msg">')
      .css({ color: 'red' })
      .html(clip)
      .prependTo('.status');
    $('.status')
      .fadeIn(10)
      .delay(1000)
      .fadeOut(500, function() {
        $('#copy-msg').remove();
      });

    chrome.extension.sendMessage({'text' : clip});
  }
});
