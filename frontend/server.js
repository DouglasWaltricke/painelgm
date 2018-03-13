var http = require('http');
var express = require('express');
var app = express();
app.use(express.static('./public'));


// var port = process.env.port || 80;

http.createServer(app).listen(82, function(){
	console.log('servidor on');
});


