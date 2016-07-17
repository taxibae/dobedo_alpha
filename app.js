var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(express.static('public'));

app.use(function(req, res, next) {
    fs.readFile('index.html', function(error, data){
        if(error){
            res.send(''+error);
        }
        else{
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        }
    });
});

app.listen(52273, function () {
    console.log('Server Running at 52273');
});
