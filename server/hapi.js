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


function timestamp_function() {

    /*
    let timestamp = new Date().getTime();

    let timestamp_hours = new Date().getHours();
    let timestamp_minutes = new Date().getMinutes();
    let timestamp_seconds = new Date().getSeconds();

    let timestamp_day = new Date().getDay();
    let timestamp_month = new Date().getMonth();
    let timestamp_year = new Date().getFullYear();

    //6.9.2017,10:43:20
    let timestamp_string = timestamp_day + '.' + timestamp_month + '.' + timestamp_year  + ',' + timestamp_hours + ':' + timestamp_minutes + ':' + timestamp_seconds ;
    
    let timestamp_string = [];
    timestamp_string.splice(0, timestamp_string.length);
    
    timestamp_string.push(timestamp_day);
    timestamp_string.push('.');
    timestamp_string.push(timestamp_month);
    timestamp_string.push('.');
    timestamp_string.push(timestamp_year);
  //  timestamp_string.push(',');
    timestamp_string.push(timestamp_hours);
    timestamp_string.push(':');
    timestamp_string.push(timestamp_minutes);
    timestamp_string.push(':');
    timestamp_string.push(timestamp_seconds);
*/
   
    //return ' -> timestamp ' + timestamp_string;

    var server_date_and_time = new Date().toString();

    return ' -> timestamp ' + server_date_and_time ;
}


// Add the route
server.route([

    //------------------ route 1 --------------------
    {
        method: 'POST',
        path: '/book',
        handler: function (request, reply) {

            let x = request.payload.check;
            //let timestamp = new Date().getTime();

            console.log("Book handler, message -> " + x + timestamp_function());

            //return reply('hello world');
            return reply(JSON.stringify({ body: 'buying book'  + timestamp_function() }));
        },
        //config : { valuez : Joi.string().min(5).max(20) } //validate string between 5 and 20 characters


        config: {
            validate: joi_object1,
        },

    },
    //------------------- route 2 -----------------------
    {
        method: 'POST',
        path: '/car',
        handler: function (request, reply) {
            let x = request.payload.check;
            //let timestamp = new Date().getTime();

            console.log("Car handler, message -> " + x + timestamp_function());
            return reply(JSON.stringify({ body: 'buying car' + timestamp_function() }));
        },
        // config: {}
    },
    //------------------- route 3 -----------------------
    {
        method: 'POST',
        path: '/dvd',
        handler: function (request, reply) {
            let x = request.payload.check;
           // let timestamp = new Date().getTime();
            console.log("DVD handler, message -> " + x + timestamp_function());
            return reply(JSON.stringify({ body: 'trying to buy dvd' + timestamp_function() }));
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