var express = require('express');
var app = express();
var http = require('http').Server(app);

var fs = require('fs');
var cors = require('cors')
app.use(cors());
app.use (express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;

//app.use(express.static(__dirname, '../dist/'));



let server = http.listen( 3000, function () {
let host = server.address().address;
let port = server.address().port;
console.log("Server listening on: "+ host + " port: " + port);
});

app.post('/api/auth' ,require('./routes/login'));

app.post('/api/getusers' ,require('./routes/getusers'));

app.post('/api/getgroups' ,require('./routes/getgroups'));

app.post('/api/getgroupsuser' ,require('./routes/getgroupuser'));
