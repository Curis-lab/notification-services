"use strict";
const http = require("node:http");
const url = require("node:url");
const { readFile } = require("node:fs");

const PORT = process.env.PORT || 3000;

class Server {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  handleRequest(req, res) {
    const { pathname } = url.parse(req.url, true);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({message:'name'}));
    res.end("ok");
  }
  
  
  start() {
    this.server.listen(PORT, () => {
      console.log(`server running on port: http://localhost:${PORT}`);
    });
  }
}

const app = new Server();
app.start();

module.exports = app;
