DOM    = require('./DOM.web')
Router = require('./Router')
App    = require('./App')



window.onload = =>

   window.DOM    = DOM
   window.router = new Router( isJIT = true )
   window.app    = new App( isJIT = true )