'use strict';

const controller = require('../controllers/user-controller.js');


class Router{
    constructor(){
        this.routes = {
            GET:[],
            POST:[],
            PUT:[],
            DELETE:[],
            PATCH:[]
        };
        this.setupRoutes();
    }
    setupRoutes(){
        this.get('/api/users', controller);
    }
    
    get(pattern, handler){
        this.routes.GET.push({pattern, handler});
    }
}

module.exports = new Router();