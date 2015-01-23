var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});
console.log("listening to port 3000");
app.listen(3000);