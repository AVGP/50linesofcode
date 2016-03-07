{
  "title": "Finding out all the licenses of your dependencies",
  "date": "2014-01-03 15:22:50 GMT"
}

---

#Finding out all the licenses of your dependencies
A while ago I wondered if, with all the dependencies creeping into software I build, I'm not violating a GPL license hidden somewhere.

I turned to npm and Rubygems on the quest to fix this potential issue only to find that neither ``bundler`` nor ``gem`` or ``npm`` allow me to find out in a painless way.

So I built a small ruby script to parse Gemfiles (and recently added ``package.json`` support for npm) and tell me the licenses.

For NPM this is surprisingly boring and easy, as npm gives you the "MIT" license as the default when creating a new module - but in the Ruby world the journey is more cumbersome as there's no default license.

After running the script against a bunch of projects I incorporated an additional mechanism to try to figure out more licenses and *today I want to invite you to give it a go, too*

You can find the script on the [all-your-licenses Github repository](https://github.com/martin-naumann/all-your-licenses) and install the few dependencies it has with bundler, then run it with

``
$ ruby main.rb -f /path/to/Gemfile_or_package.json
``

Have fun and don't violate any licenses anymore ;-)

*DISCLAIMER*: The tool may output invalid results and does not provide any legally binding information to you. Use it *at your own risk*! No legal claims shall be made as this is *provided as is*!