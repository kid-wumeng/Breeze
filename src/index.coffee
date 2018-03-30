DOM    = require('./DOM.web')
Loader = require('./Loader.web')
Router = require('./Router')
App    = require('./App')
Breeze = require('./Breeze')


Breeze = new Breeze
router = new Router( isJIT = true )


window.onload = =>

   window.loader = new Loader()
   window.app    = new App( isJIT = true )



Breeze.DOM           = DOM
Breeze.config        = Breeze.config
Breeze.on            = Breeze.on
Breeze.getPath       = router.getPath
Breeze.getQuery      = router.getQuery
Breeze.isCurrentPath = router.isCurrentPath
Breeze.isCurrentID   = router.isCurrentID
Breeze.go            = router.go



module.exports = Breeze