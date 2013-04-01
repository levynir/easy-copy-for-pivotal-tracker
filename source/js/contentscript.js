chrome.extension.sendMessage({'action': 'pageStart'});

$(document).on('click', '.item', function(e){
  var id = $(this).attr('id').replace(/.*?(\d+).*/,"$1");
  var name = $(this).find('.story_name').text();
  var link = "https://www.pivotaltracker.com/story/show/" + id;

  var clip;
  if (e.metaKey && e.shiftKey) {
    clip = "[" + name + "](" + link + ")";
  } else if (e.metaKey && e.altKey) {
    clip = name + " #" + id;
  } else if (e.altKey) {
    clip = id;
  } else if (e.shiftKey) {
    clip = link;
  } else if (e.metaKey) {
    clip = name;
  }

  if (clip) {
    $('<div id="copy-msg">')
      .css({ color: 'black' })
      .html(clip)
      .prependTo('#status');
    $('#status')
      .fadeIn(10)
      .delay(1000)
      .fadeOut(500, function() {
        $('#copy-msg').remove();
      });

    chrome.extension.sendMessage({'text' : clip});
  }
});
