style     = require('./style')
dom       = require('./dom')
JadeLike  = require('./JadeLike')
Article   = require('./Article')
Navigator = require('./Navigator')
util      = require('./util')



text = """
   item1
      name
   desc will convert to string
   item2
      age len
"""



jadeLike = new JadeLike(text)



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