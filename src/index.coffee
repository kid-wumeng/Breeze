style = require('./style')
router  = require('./router')
loader  = require('./loader')
dom     = require('./dom')
Article = require('./Article')



window.onload = =>


   window.Breeze ?= {}

   dom.init()

   path = router.formatPath( location.pathname )

   loader.get( path, done, dom.render404 )






done = ( text ) =>
   article = new Article( text )
   dom.renderArticle( article.html )