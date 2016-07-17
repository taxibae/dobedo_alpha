var context;
var receivedAudio;
window.addEventListener('load', init, false);

//Event Declaration
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
}

//jquery Ajax event

$(document).ready(function () {
    $('#music_getmusic').submit(function (e) { 
        e.preventDefault();
        var musicname = $('#music_musicname').val()
        $.ajax({
            type: "GET",
            url: "/gettingmusic/" + musicname,
            success: function (response) {
                audioContext.decodeAudioData(response, function (buffer) {
                    receivedAudio = buffer;
                }, function(error){
                    alert('Decode Error Occured');
                });
                $('#service_container').append('Audio is Loaded Successfuly.');
            }
        });
    });
});
