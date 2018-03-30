DOM    = require('./DOM.web')
Loader = require('./Loader.web')
Router = require('./Router')
App    = require('./App')
Main   = require('./Main')



window.onload = =>

   window.DOM    = DOM
   window.loader = new Loader()
   window.router = new Router( isJIT = true )
   window.app    = new App( isJIT = true )



module.exports = new Main