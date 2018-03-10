style     = require('./style')
dom       = require('./dom')
Article   = require('./Article')
Navigator = require('./Navigator')
util      = require('./util')





window.onload = =>


   window.Breeze ?= {}

   dom.init()

   path = util.formatPath( location.pathname )

   util.read( path, done, dom.render404 )





done = ( text ) =>

   article = new Article( text )
   summary = article.summary()

   navigator = new Navigator( summary )

   dom.renderMain( article )
   dom.renderSide( navigator )