var context;
window.addEventListener('load', init, false);

//Event Declaration
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
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
                $('#service_container').append('<p>'+ response + '</p>');
            }
        });
    });
});
