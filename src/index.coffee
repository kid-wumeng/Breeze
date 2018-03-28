DOM = require('./DOM.web')
App = require('./App')



window.DOM = DOM
window.onload = => new App( isJIT = true )