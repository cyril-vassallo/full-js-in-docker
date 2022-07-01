'use strict';

import http from 'http';
import app from './app';
import config from  './config';

const port: string = config.port;
console.log('API exposed on: ', config.endpoint);

const server: http.Server = http.createServer(app);

server.listen(port);
