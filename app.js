var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(express.static('public'));

app.get('/gettingmusic/:name', function(req, res) {
    var name = req.params.name;
    fs.readFile('uploaded_data/tricoro.mp3',function (error,data) {
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            //res.writeHead(200, {'Content-Type' : 'audio/mp3'});
            //res.end(data);
            res.send(new Buffer(data).toArrayBuffer());
        }
    });
});

app.listen(52273, function () {
    console.log('Server Running at 52273');
});
