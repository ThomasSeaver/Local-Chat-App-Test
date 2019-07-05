$(function() {
    var socket = io();
    var last = "";
    var first = true;
    $('form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        $('#m').focus();
        return false;
    });
    socket.on('chat message', function(myObj) {
        var $div = $("<div>").addClass("chatContainer");
        var $nick = $("<div>").text(myObj.nickname + ":").css('color', myObj.nameColor);
        var $msg = $("<div>").text(myObj.message).addClass("messageContainer");
        $div.append($nick);
        $div.append($msg);
        if (first == true) {
          last = myObj.nickname;
          first = false;
        }
        if (myObj.nickname != last) {
          var $breakline = $("<div>").addClass("breakline");
          $("#messageBox").append($breakline);
          last = myObj.nickname;
        }
        $('#messageBox').append($div);
        $('#messageBox').scrollTop($('#messageBox')[0].scrollHeight);
    });
});

$(document).ready(function() {
    $('textarea').shiftenter();
});
