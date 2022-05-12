"use strict";

const express = require("express");

const app = express();

app.route('/').get((request, response) => {
    response.send('<h2>my mid_server_MVC is running</h2>');
});




//          S E R V E R
// --------------------------------------------------------------------
app.listen();

var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});
server.listen();
