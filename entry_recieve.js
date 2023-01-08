let video = document.getElementById("remote-video");
let video2 = document.getElementById("remote-video2");

let socket = io("ws://localhost:3030/");

let myPeer = new Peer();

myPeer.on("open", (peerId) => {

    socket.emit("attach_id", peerId, (response) => {

    });

});

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {

    socket.on("catch_id", async (id, callback) => {

        let mycall = await myPeer.call(id, stream);

        mycall.on("stream", (mediaStream) => {

            video.srcObject = mediaStream;

        });

        
    });

    myPeer.on("call", (call) => {

        call.answer(stream);

        call.on("stream", (theirStream) => {
            video2.srcObject = theirStream;
        })

    });

}).catch(err => {
    alert(err.message)
});




