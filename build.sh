#!/bin/bash
mkdir -p dist
pug index.pug -o dist
uglifyjs node_modules/jquery/dist/jquery.min.js node_modules/bootstrap/dist/js/bootstrap.min.js node_modules/moment/min/moment-with-locales.min.js index.js --compress --mangle > dist/build.js
uglifycss node_modules/bootstrap/dist/css/bootstrap.min.css node_modules/font-awesome/css/font-awesome.min.css index.css > dist/build.css
mkdir -p dist/images
rsync -av images/ dist/images/
mkdir -p dist/fonts
rsync -av node_modules/font-awesome/fonts/ dist/fonts/