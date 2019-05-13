var fs = require('fs');
var striptags = require('striptags');
var md = require('marked');

var url = process.argv.pop(),
    dir = process.argv.pop()

md.setOptions({
  renderer: new md.Renderer(),
  gfm:         true,
  tables:      true,
  breaks:      true,
  pedantic:    false,
  sanitize:    false,
  smartLists:  true,
  smartypants: false
});

var files = fs.readdirSync(dir).filter(function(file) {
  var stat = fs.lstatSync(dir + '/' + file)
  return stat.isFile()
})
var items = []

for(var i=0; i<files.length;i++) {
  var content = fs.readFileSync(dir + '/' + files[i], 'utf8')
  console.log(files[i])
  var title = content.match(/<\!\-\-([^<]+)\-\->/)[1].trim()
  var desc  = content.match(/##[^\n]+\n\n([^#]+)(?=\n\n)/)[1]
  if(!content.match(/<!-- DRAFT -->/)) {
    items.push({title: title, description: striptags(md(desc)), link: url + '/' + files[i].slice(0, -3)})
  }
}

items = items.reverse().map(function(item) {
  return '<item>\n\t<title>' + htmlEntities(item.title) + '</title>\n\t<link>' + item.link + '</link>\n\t<description>' + htmlEntities(item.description) + '</description>\n\t<guid isPermaLink="true">' + item.link + '</guid>\n</item>'
})

var feedContent = fs.readFileSync('rss-template.xml', 'utf8')
feedContent = feedContent.replace('{{date}}', new Date().toUTCString())
feedContent = feedContent.replace('{{items}}', items.join('\n'))

fs.writeFileSync('rss.xml', feedContent)

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}