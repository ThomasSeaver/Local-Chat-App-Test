$(function () {
  var socket = io();
  $('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    $('#m').focus();
    return false;
  });
  socket.on('chat message', function(myObj){
    var $div = $("<div>").addClass("messageContainer");
    var $nick = $("<div>").text(myObj.nickname).css('color', myObj.nameColor);
    var $msg = $("<div>").text(": " + myObj.message);
    $div.append($nick);
    $div.append($msg);
    $('#messageBox').append($div);
  });
});

$('#m').on('blur',function () {
    var blurEl = $(this);
    setTimeout(function() {
        blurEl.focus()
    }, 10);
});

$(document).ready(function() {
    $('textarea').shiftenter();
});