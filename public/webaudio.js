var audioContext;
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

function onError(error){
    alert(error);
}

function playSound(buffer){
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

//jquery Ajax event
$(document).ready(function () {
    //Click Submit Button
    $('#music_getmusic').submit(function (e) { 
        e.preventDefault();
        //url
        var name = $('#music_musicname').val();
        
        //req define
        var request = new XMLHttpRequest();
        request.open('GET', '/gettingmusic/'+name, true);
        request.responseType = 'arraybuffer';
        
        // Decode asynchronously
        request.onload = function() {
            
            audioContext.decodeAudioData(request.response, function(buffer) {
                receivedAudio = buffer;
            }, onError);
        }
        request.send();
    });

    //Click Play Button
    $('#music_play').click(function (e) { 
        e.preventDefault();
        playSound(receivedAudio);
    });
});
