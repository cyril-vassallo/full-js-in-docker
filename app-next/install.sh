#!/bin/bash

npm install
npm run dev

date=$(date)
echo "$date !" >> install.log
echo  "Installation done!" >> install.log