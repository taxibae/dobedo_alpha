var audioContext;
var receivedAudio = new Array();
var source = new Array();
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

// UI Event Define
function addList(name){
    var output;
    output+= '<p>' + name + '<input type="checkbox">';
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
            if(!request.response){
                alert('No Audio File');
            }
            else{
                audioContext.decodeAudioData(request.response, function(buffer) {
                    receivedAudio.push(buffer);
                }, function (error){
                    alert(error);
                });
            }
            console.log('Decode End');
        }
        request.send();
    });

    //Click Play Button
    $('#music_play').click(function (e) { 
        e.preventDefault();
        var i =0;
        receivedAudio.forEach(function(element) {
            source[i] = audioContext.createBufferSource();
            source.buffer = receivedAudio;
            source.connect(audioContext.destination);
            i++;
        }, this);

        source.start(0);
    });
    $('#music_stop').click(function (e) { 
        e.preventDefault();
        source.stop(0);
    });
});
