{
  "title": "MacOS, XAMPP und OAuth",
  "date": "2011-12-16 09:18:47 GMT"
}

---

#MacOS, XAMPP und OAuth
<p>All I needed yesterday was having the pecl OAuth-Extension for PHP running in my XAMPP on my Macbook (Lion).</p>&#13;
<p>It turned out, that this was pretty hard to get - to preserve you from the pain I went through, here is my advice:</p>&#13;
<p>First off, don't use the regular pecl from your Mac. It will break the module when compiling, so you need to use /Applications/XAMPP/xamppfiles/bin/pecl. To keep it short, I'll assume you noticed this and refer to it as "pecl".</p>&#13;
<p>When using this to install via "pecl install oauth" it first did its thing - but the resulting oauth.so could not be loaded by XAMPP with this notice:</p>&#13;
<blockquote>&#13;
<p>PHP Warning:  PHP Startup: Invalid library (maybe not a PHP library) 'oauth.so' in Unknown on line 0</p>&#13;
</blockquote>&#13;
<p>To overcome this, you just need to correct the Architecture for config.</p>&#13;
<p>To compile it like that, you need to go into /Applications/XAMPP/xamppfiles/temp/pear/download/oauth-&lt;VERSION&gt;/ and type</p>&#13;
<blockquote>&#13;
<p>$ sudo ./configure MACOSX_DEPLOYMENT_TARGET=10.7 CFLAGS="-arch x86_64 -g -Os -pipe -no-cpp-precomp" CCFLAGS="-arch x86_64 -g -Os -pipe" CXXFLAGS="-arch x86_64 -g -Os -pipe" LDFLAGS="-arch x86_64 -arch i386 -bind_at_load"</p>&#13;
&#13;
</blockquote>&#13;
<p>Afterwards, you need to run "make". If everything went fine, you now have modules/oauth.so. Now just copy oauth.so into /Applications/XAMPP/xamppfiles/lib/php/php-&lt;VERSION&gt;/extensions/no-debug-&lt;VERSION&gt;/extensions/ and enable it, adding extension=oauth.so in your php.ini.</p>&#13;
 