#!/bin/bash

set -ev

echo "### Installing pm2 ..."
npm i -g pm2
echo "### Launch deployement ..."
npm run deploy
