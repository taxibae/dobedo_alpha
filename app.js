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
    res.send(name + ' is successly received');
});

app.listen(52273, function () {
    console.log('Server Running at 52273');
});
