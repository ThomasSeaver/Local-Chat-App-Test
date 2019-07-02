var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var nick = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    var socketNick = nick;
    nick++;
    var socketColor = "#000000";
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log(socketNick + ': ' + msg);
    });
    socket.on('chat message', function(msg){
        var emission = {
            message: msg,
            nameColor: socketColor,
            nickname: socketNick
        }
        io.emit('chat message', emission);
        if (msg.charAt(0) == '/') {
            var args = msg.split(" ");
            var cmd = args[0].substr(1);
            args.shift();
            if (cmd == "nick") {
                emission = {
                    nickname: "server",
                    message: ("user " + socketNick + " is now known as " + args[0] + ".")
                }
                io.emit('chat message', emission);
                socketNick = args[0];
            } else if (cmd == "color") {
                if (args[0].charAt(0) != "#") {
                    args[0] = "#" + args[0];
                }
                emission = {
                    nickname: "server",
                    message: ("user " + socketNick + " has color " + args[0] + ".")
                }
                io.emit('chat message', emission);
                socketColor = args[0];
            } else {
                emission = {
                    nickname: "server",
                    message: ("command not found")
                }
                io.emit('chat message', emission);
            }
        }
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});