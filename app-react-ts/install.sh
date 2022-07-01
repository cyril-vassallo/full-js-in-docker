#!/bin/bash

npm install
npm run start

date=$(date)
echo "$date !" >> install.log
echo  "Installation done!" >> install.log

