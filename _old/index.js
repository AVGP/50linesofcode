var request = require('request-promise')
var fs = require('fs')

var url = 'https://api.tumblr.com/v2/blog/ox86.tumblr.com/posts/text?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&notes_info=true&filter=raw&type=text'
request.get(url).then(function(response) {
  var numPosts = JSON.parse(response).response.total_posts
  var posts = [], promises = [], i = 0

  for(var i=0; i<=Math.ceil(numPosts/20);i++) {
    var rp = request.get(url + '&offset=' + (i*20)).then(function(response) {
      var postsData = JSON.parse(response).response.posts
      for(var j=0;j<postsData.length; j++) {
	i++
	console.log(i)
        fs.mkdirSync('post/' + postsData[j].id)
        fs.writeFileSync(
		'post/' + postsData[j].id + '/' + postsData[j].post_url.split('/').slice(-1)[0] + '.md',
		'{\n  "title": "' + postsData[j].title + '",\n  "date": "' + postsData[j].date + '"\n}\n\n---\n\n#' + postsData[j].title +'\n' + postsData[j].body)
      }
    })
  }
  console.log(numPosts)
})
