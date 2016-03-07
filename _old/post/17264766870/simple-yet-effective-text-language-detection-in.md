{
  "title": "Simple yet effective text-language detection in PHP",
  "date": "2012-02-08 15:00:05 GMT"
}

---

#Simple yet effective text-language detection in PHP
<p><strong>TL;DR first:</strong></p>&#13;
<p>You can quickly detect a text's language using short lists of significant words for the languages (e.g. for english "I","you","he","she","it","we","they","us","the","at") and check the number of occurences per language. The language that occurs most often is most likely the language the text is written in. (See <a href="http://langdetect.avgp.s1.goincloud.com/" target="_blank">example</a> or <a href="https://gist.github.com/1761291" target="_blank">implementation</a>)</p>&#13;
<p><strong>What language is this?</strong></p>&#13;
<p>I came across the need to identify a text's language automatically. The texts can be of different nature (in terms of topic, length, etc.) but they're all texts consisting of complete sentences (no bullet-point lists or so) and at least 1/2 page long.</p>&#13;
<p>So I thought about how to find out, what's the language in a fast, simple way. </p>&#13;
<p><strong>Method 1:</strong></p>&#13;
<p>I knew that this could be done using <a href="http://en.wikipedia.org/wiki/N-gram" target="_blank">n-grams</a>. n-grams are combinations of n characters (bigrams for example are combinations such as "on" or "ng", trigrams are combinations like "are" "ing" etc.). As every language has a different frequency of the ocurrence of different n-grams, you can guess the language based upon the different n-gram frequencies in the text.</p>&#13;
<p>When you look at <a href="http://phpir.com/language-detection-with-n-grams" target="_self">implementations</a>, you'll find that this is rather lengthy to implement.</p>&#13;
&#13;
<p><strong>Method 2:</strong></p>&#13;
<p>My idea is even simpler: Every language has a small set of very significant words.</p>&#13;
<p>You need to find words, that are most likely to show up in texts and are unique in the set of languages (in the best case you have disjoint sets of words for all the languages you want to recognize).</p>&#13;
<p>I tried that with only 11 words per Language for English and German, which works perfect.</p>&#13;
&#13;
<p><strong>Implementation of Method 2:</strong></p>&#13;
<p>You build the lists of words per language.</p>&#13;
<p>Now you need to check, if (and how often) a word from your list is appearing, but you have to make sure that the matches are on their own and not part of a word (e.g. "the" occurs in "the quick brown fox" [english] but not in "Theorie ist grau." [german]). I did this using a simple RegEx #(?&lt;!\w)WORD(?!\w)#is. Every occurence of a word of a language's list is added to a score for this language.</p>&#13;
<p>If you have matched all words from all language's lists, you have a list of scores.</p>&#13;
<p>The highest score is most likely the one for the language the text is written in.</p>&#13;
&#13;
<p>An implementation in PHP can be found <a href="https://gist.github.com/1761291" target="_blank">here</a> and only needs 29 lines.</p>&#13;
&#13;
<p>I would like you to play around with <a href="http://langdetect.avgp.s1.goincloud.com/" target="_blank">this implementation here</a> by feeding it some URLs of *.txt files to scan. I am interested in how it will perform on different texts. If you append &amp;json to the URL, you can easily use it for your applications, because it returns JSON then.</p> 