
$( "#disconnect" ).hide();
$("#searching").hide();
$("#dis").hide();

function addView(id) {
  {if($("#remoteVideo > div").length === 0){
          $("<div/>", {
            id: "remote_video_panel_" + id,
            class: "video-view",
          }).appendTo("#remoteVideo");

          $("<div/>", {
            id: "remote_video_" + id,
            class: "video-placeholder",
          }).appendTo("#remote_video_panel_" + id);
        
      }
  }}
    

  function removeView(id) {
    $( "#remote_video_"+id ).remove();
  }



// rtc object
var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
  };


  $.ajax({
    url : "/channels",
    async: false
  })
  .then(createChannel)
  .catch(function(){
    console.log("Cannot conect to server");
  })  

  let arr;
  let id;
  function createChannel(ch){
    ch.forEach(e => {
         id = e._id; 
         let arr2 =  e.channels.filter( cc =>{
           return (cc.u1===false && cc.u2 ===true )
         })
         arr = arr2
                  if(arr2.length === 0){
                      ch.forEach(nc=>{
                          let arr3 = e.channels.filter( ncc =>{
                              return (ncc.u1 ===true && ncc.u2 === true)
                          })
                        arr = arr3  
                      })
                    $.post("/channel1/"+id+"/"+arr[0]._id ,{})   
                  }else{
                    $.post("/channel2/"+id+"/"+arr[0]._id ,{})
                  }
    });
    option.channel = arr[0].name;
  }


    // Options for joining a channel
    var option = {
      appID: "ee8d9b7b869f4c66ab5278f1564bb6ec",
      channel: null,
      uid: null,
      token: null
    };  
  



document.getElementById("connect").onclick = () =>{

            $( "#disconnect" ).show();
            $( "#connect" ).hide();
            $( "#searching" ).show("slow");   
            $("#dis").hide();


           // Create a client
            rtc.client = AgoraRTC.createClient({mode: "rtc", codec: "h264"});

            // Initialize the client
            rtc.client.init(option.appID, function () {
            console.log("init success");
            }, (err) => {
            console.error(err);
            });



            // Join a channel
            rtc.client.join(option.token, option.channel, option.uid, function (uid) {
                console.log("join channel: " + option.channel + " success, uid: " + uid);
                rtc.params.uid = uid;

                // Create a local stream
                rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
                });

                // Initialize the local stream
                    rtc.localStream.init(function () {
                        console.log("init local stream success");
                        // play stream with html element id "local_stream"
                        rtc.localStream.play("local_stream");
                        // Publish the local stream
                        rtc.client.publish(rtc.localStream, function (err) {
                            console.log("publish failed");
                            console.error(err);
                        });

                        

                    }, function (err) {
                        console.error("init local stream failed ", err);
                    });

                     

            }, function(err) {
                console.error("client join failed", err);
            });

            

            rtc.client.on("stream-added", function (evt) {  
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                if (id !== rtc.params.uid) {
                rtc.client.subscribe(remoteStream, function (err) {
                    console.log("stream subscribe failed", err);
                });
                }
                console.log("stream-added remote-uid: ", id);
            });
            
            rtc.client.on("stream-subscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                $("#searching").hide();   
                // Add a view for the remote stream.
                addView(id);
                // Play the remote stream.
                remoteStream.play("remote_video_" + id);
                console.log("stream-subscribed remote-uid: ", id);
            });

            rtc.client.on("stream-removed", function (evt) {
            var remoteStream = evt.stream;
            var id = remoteStream.getId();
            // Remove the view of the remote stream. 
            removeView(id);
            // Stop playing the remote stream.
            remoteStream.stop("remote_video_" + id);
            console.log("stream-removed remote-uid: ", id);
            });

            rtc.client.on("peer-leave", function(evt) {
              var peerStream = evt.stream;
              if(peerStream && peerStream.isPlaying()) {
                peerStream.stop()
                $("#remoteVideo").empty();
                $("#disconnect").trigger("click"); 
                $("#dis").show("slow");
                setTimeout(() => window.location.reload(), 2000);
              }
              })


}


document.getElementById("disconnect").onclick = () =>{

                 $.post("/channelClose/"+id+"/"+arr[0]._id ,{}) 
                    // Leave the channel
                rtc.client.leave(function () {
                    // Stop playing the local stream
                    rtc.localStream.stop();
                    // Close the local stream
                    rtc.localStream.close();
                    // Stop playing the remote streams and remove the views
                    while (rtc.remoteStreams.length > 0) {
                    var stream = rtc.remoteStreams.shift();
                    var id = stream.getId();
                    stream.stop();
                    removeView(id);
                    }
                    $("#remoteVideo").empty();
                    console.log("client leaves channel success");

                    $( "#disconnect" ).hide();
                    $( "#connect" ).show();
                    $("#searching").hide();   
        
                }, function (err) {
                    console.log("channel leave failed");
                    console.error(err);
                });
}



