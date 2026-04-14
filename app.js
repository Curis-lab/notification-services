'use strict';

const fs = require('node:fs');
const http = require('node:http');

const server = http.createServer();

server.on('request',function(req, res){
    res.writeHead(200, {'Content-Type':"text/html"});
    fs.readFile('index.html',function(err, data){
        if(err){
            res.writeHead(404);
            res.write('Error: File Not Found.');
        }else{
            res.write(data);
        }
        res.end();
    });
});


server.listen(3000,function(err){
    if(err){
        throw new Error('Error on start server.')
    }
    else{
        console.log('server initialize.', 3000);
    }
});
