"use strict";

const fs = require("fs");
const net = require("net");
const filename = process.argv[2];

const EventEmitter = require('./event.js');


if (!filename) {
  throw Error(`Error: No filename specified`);
}

const format = {
  "type":"APPOINTMENT_CREATED",
  "userId":'123',
  "message":"Your appointment is booked.",
  "meta":{
    "doctor":"Dr. Aung",
    "time":"10:00AM"
  }
}

new EventEmitter()

net
  .createServer((connection) => {
    console.log("Subscriber connected.");


    connection.write(
      JSON.stringify({ type: "watching", file: filename }) + "\n",
    );


    const watcher = fs.watch(filename, () => {
      connection.write(
        JSON.stringify({ type: "changed", timestamp: Date.now() }) + "\n",
      );
    });

    connection.on("close", () => {
      console.log(`Subscriber disconnected.`);
      watcher.close();
    });
  })
  .listen(60300, () => console.log(`Listening for subscribers.....`));
