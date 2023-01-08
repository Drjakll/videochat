var express = require('express');
var app = express();
var body = require('body-parser');
var path = require('path');

var http = require('http');

var server = http.createServer(app);

const socketio = require('socket.io');

let io = socketio(server);

app.use(body.json({ limit: "1000mb" }));
app.use(body.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, '')));

app.get("/", function(req, res){

    var html = `
        <!DOCTYPE html> 
        <html>
            <header>
               <title>Video Chat</title>

               
               <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
               <script src="socket.io/socket.io.js"></script>
               

            </header>
            <body>
               <div id="myDiv">Working</div>
               <video autoPlay={true} id="remote-video"></video>
               <script src = "./static/entry.js">
               </script>
            </body>
        </html>
        `;

    res.send(html);

});

app.get("/video", function (req, res) {

    var html = `
        <!DOCTYPE html> 
        <html>
            <header>
               <title>Video Chat</title>

               
               <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
               <script src="socket.io/socket.io.js"></script>
               <style>
                   //#remote-video {height: 500px; width: 500px;}
                   //#remote-video2 {height: 500px; width: 500px;}
               </style>

            </header>
            <body>
               <div id="myDiv">Working</div>
               <video autoPlay={true} id="remote-video"></video>
               <video autoPlay={true} id="remote-video2"></video>
               <script src = "./static/entry_recieve.js">
               </script>
            </body>
        </html>
        `;

    res.send(html);

});

io.sockets.on('connection', (socket) => {

    socket.on("attach_id", (streamer_id) => {
        console.log(`streamer id is ${streamer_id}`);
        socket.broadcast.emit("catch_id", streamer_id);
    });

});

server.listen(3030, function () { console.log("running 3030"); });