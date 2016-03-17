#!/bin/bash
echo "Compiling Markdown to HTML..."
susi ./post-raw ./post page.html
echo "----> Done.\n"

echo "Uploading HTML to server..."
scp -P 1989 -i ~/.ssh/geekonaut-web -r index.html post web@img.geekonaut.de:/var/www/50linesofcode
echo "----> Done.\n"

echo "Uploading images to server..."
scp -i ~/.ssh/geekonaut-web -P 1989 -r images/post-images web@img.geekonaut.de:/var/www/50linesofcode/images
echo "----> Done.\n"

echo "Deployed and ready!"
