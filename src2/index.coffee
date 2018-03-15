formatPath     = require('./formatPath')
ajax           = require('./ajax')
redirect       = require('./redirect')
activeSummary  = require('./activeSummary')
compileArticle = require('./compileArticle')
compileSummary = require('./compileSummary')
renderArticle  = require('./renderArticle')
renderSearch   = require('./renderSearch')
renderSummary  = require('./renderSummary')
getArticleHash = require('./getArticleHash')



$app     = null
$side    = null
$main    = null
$search  = null
$summary = null
$article = null



router =
   hash: if location.hash then location.hash else ''



window.onload = =>

   if document.querySelector('body > app')
      start()
   else
      ready()



window.onscroll = (e) =>

   # hash = getArticleHash($article)
   #
   # if router.hash isnt hash
   #    router.hash = hash
   #
   #    redirect( hash )
   #    activeSummary( hash )
   #
   # e.preventDefault()



ready = =>

   createElement()

   path = formatPath( location.pathname )

   ajax( path, compile, => )



compile = ( markdown ) =>

   { html, headings, sections } = compileArticle({ markdown })

   renderArticle({ $article, html })

   { html } = compileSummary({ headings })

   renderSummary($summary, html)
   renderSearch($search, sections)

   redirect( router.hash )





createElement = =>

   $app     = document.createElement('app')
   $side    = document.createElement('side')
   $main    = document.createElement('main')
   $search  = document.createElement('search')
   $summary = document.createElement('summary')
   $article = document.createElement('article')

   $app.appendChild($side)
   $app.appendChild($main)

   $side.appendChild($search)
   $side.appendChild($summary)
   $main.appendChild($article)

   document.body.appendChild($app)



start = =>
