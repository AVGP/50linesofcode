#!/bin/bash
echo "Compiling Markdown to HTML..."
susi ./post-raw ./post page.html
echo "----> Done.\n"

echo "Creating RSS feed..."
node generate_rss.js post-raw/ https://50linesofco.de
echo "----> Done.\n"

echo "Uploading files to server..."
scp -P 1989 -i ~/.ssh/geekonaut-web -r *.html rss.xml post images web@ftp.geekonaut.de:/var/www/50linesofcode
echo "----> Done.\n"

echo "Deployed and ready!"
