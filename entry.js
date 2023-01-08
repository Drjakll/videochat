let video = document.getElementById("remote-video");

let myPeer = new Peer();

let socket = io("ws://localhost:3030/");

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {

    myPeer.on("call", (call) => {
        console.log("got a call!");
        call.answer(stream);



        call.on("stream", (mediaData) => {



        });
    });

}).catch(err => {
    alert(err.message)
});

//myPeer.on("open", (id) => {

//    console.log(id);

//    socket.emit("attach_id", id, (response) => {

//    });

//});
