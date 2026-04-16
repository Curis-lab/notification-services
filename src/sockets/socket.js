"use strict";

const net = require('node:net');
const {randomBytes} = require('node:crypto')

//promisify = change call-back base to Promise-base

function promisify(callbackBasedApi){
    return function(...args){
        return new Promise((resolve, reject)=>{
            callbackBasedApi(...args,(err, result)=>{
                if(err) return reject(err);
                resolve(result);
            })
        })
    }
};


const random = promisify(randomBytes)
random(32).then(buffer=>{
    console.log(buffer.toString())
});
