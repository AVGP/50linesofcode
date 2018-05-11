var fs = require('fs');
var path = require('path');
var striptags = require('striptags');

var url = process.argv.pop(),
    dir = process.argv.pop()

function stripExtension(fileName) {
  return fileName.substr(0, fileName.lastIndexOf('.'))
}

var files = fs.readdirSync(dir).filter(function(file) {
  var stat = fs.lstatSync(dir + '/' + file)
  return stat.isFile()
}).map(function(item) {
  return '<url><loc>' + url + '/' + stripExtension(path.basename(item)) + '</loc></item>'
})

var sitemapContent = fs.readFileSync('sitemap-template.xml', 'utf8')
sitemapContent = sitemapContent.replace('{{items}}', files.join('\n'))

fs.writeFileSync('sitemap.xml', sitemapContent)
