#!/usr/bin/env bash
rm -rf build/

# build using npm run
npm run build

# copy json files to build
cp -r src/*.json build/static/js

aws s3 sync build/ s3://random-questions