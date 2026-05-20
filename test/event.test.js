"use strict";

const assert = require("node:assert");
const test = require("node:test");
const EventEmitter = require("events").EventEmitter;
const LDJClient = require("../event.js");

describe("LDJClient", () => {
  let stream;
  let client;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });

  it("should emit a message event from a single data event", (done) => {
    client.on("message", (message) => {
      assert.deepStrictEqual(message, { foo: "bar" });
      done();
    });

    stream.emit("data", '{"foo":"bar"}\n');
  });

  it("should handle split messages across multiple data events", (done) => {
    client.on("message", (message) => {
      assert.deepStrictEqual(message, { hello: "world" });
      done();
    });

    stream.emit("data", '{"hello":');
    stream.emit("data", '"world"}\n');
  });

  it("should handle multiple messages in one data event", (done) => {
    let results = [];

    client.on("message", (message) => {
      results.push(message);

      if (results.length === 2) {
        assert.deepStrictEqual(results[0], { a: 1 });
        assert.deepStrictEqual(results[1], { b: 2 });
        done();
      }
    });

    stream.emit("data", '{"a":1}\n{"b":2}\n');
  });
});
