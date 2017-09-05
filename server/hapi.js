'use strict';

//NodeJS Hapi - module   ( Hapi / static-express )

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost', port: 5659, routes: {
        cors: true
    }
});

//const joi_object1 = { payload: { check: Joi.string().min(3).max(30).allow() } }; (without regex)
//use cors, because http-request come from other doimain than server
//Joi-validation must cointain same name varriable as front-end post-body to know what validate
const joi_object1 = { payload: { check: Joi.string().min(3).max(30).allow().regex(/^[a-zA-Z0-9]{3,30}$/) } };
const joi_object2 = {};
const joi_object3 = {};

// Add the route
server.route([

    //------------------ route 1 --------------------
    {
        method: 'POST',
        path: '/book',
        handler: function (request, reply) {

            let x = request.payload.check;


            console.log("Book handler : " + x);

            //return reply('hello world');
            return reply(JSON.stringify({ body: 'buying book' }));
        },
        //config : { valuez : Joi.string().min(5).max(20) } //validate string between 5 and 20 characters

        /*    
        config: {
            validate: joi_object1,
        },
        */
    },
    //------------------- route 2 -----------------------
    {
        method: 'POST',
        path: '/car',
        handler: function (request, reply) {
            let x = request.payload.check;
            console.log("Book handler : " + x);
            return reply(JSON.stringify({ body: 'buying car !' }));
        },
       // config: {}
    },
    //------------------- route 3 -----------------------
    {
        method: 'POST',
        path: '/dvd',
        handler: function (request, reply) {
            let x = request.payload.check;
            console.log("Book handler : " + x);
            return reply(JSON.stringify({ body: 'trying to buy dvd' }));
        },
       // config: {}
    },




]

);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});