DOM    = require('./DOM.web')
Loader = require('./Loader.web')
Router = require('./Router')
App    = require('./App')
Breeze = require('./Breeze')





Breeze = new Breeze
router = new Router( isJIT = true )





window.addEventListener 'load', =>

   window.app    = new App( isJIT = true )





Breeze.DOM           = DOM
Breeze.Loader        = Loader
Breeze.config        = Breeze.config
Breeze.on            = Breeze.on
Breeze.getPath       = router.getPath
Breeze.getQuery      = router.getQuery
Breeze.resolvePath   = router.resolvePath
Breeze.resolveID     = router.resolveID
Breeze.isCurrentPath = router.isCurrentPath
Breeze.isCurrentID   = router.isCurrentID
Breeze.go            = router.go





module.exports = Breeze