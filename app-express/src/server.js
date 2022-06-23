'use strict';

const http = require('http');
const app = require('./app');
let { port } = require('./config')

port = process.env.PORT || port;

const server = http.createServer(app);

server.listen(port);
