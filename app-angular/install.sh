#!/bin/bash

npm install @angular/cli -g
npm --version
node --version
npm install
npm run start

date=$(date)
echo "$date !" >> install.log
echo  "Installation done!" >> install.log