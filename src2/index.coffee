jade      = require('./jade')
article   = require('./article')
Navigator = require('./Navigator')
dom       = require('./dom')
summary   = require('./summary')
util      = require('./util')



text2 = """
   item1
      name
   desc will convert to string
   item2
      age len
"""




window.onload = =>


   window.Breeze ?= {}

   path = util.formatPath( location.pathname )

   util.read( path, done, => )





done = ( text ) =>

   dom.ready()

   html = article.compile(text)
   $article = article.dom(html)
   dom.renderArticle($article)



   # article = new Article( text )
   #
   # html = summary.compile(article.summary())
   #
   # $summary = summary.dom( html )
   #
   # dom.renderSummary($summary)




window.addEventListener 'scroll', =>

   console.log 12122