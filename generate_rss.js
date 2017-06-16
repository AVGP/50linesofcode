var fs = require('fs');
var striptags = require('striptags');

var url = process.argv.pop(),
    dir = process.argv.pop()

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
    items.push({title: title, description: striptags(desc), link: url + '/' + files[i].slice(0, -3) + '.html'})
  }
}

items = items.reverse().map(function(item) {
  return '<item>\n\t<title>' + item.title + '</title>\n\t<link>' + item.link + '</link>\n\t<description>' + item.description + '</description>\n\t<guid isPermaLink="true">' + item.link + '</guid>\n</item>'
})

var feedContent = fs.readFileSync('rss-template.xml', 'utf8')
feedContent = feedContent.replace('{{date}}', new Date().toUTCString())
feedContent = feedContent.replace('{{items}}', items.join('\n'))

fs.writeFileSync('rss.xml', feedContent)
