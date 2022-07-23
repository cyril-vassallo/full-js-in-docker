#!/bin/bash

npm install

date=$(date)
echo "*** npm version: $npmV ***" 
npm --version
echo "*** node version: $nodeV ***" 
node --version
echo  "Installation Nest.js 14 done at $date !" >> install.log

npm run start:dev



