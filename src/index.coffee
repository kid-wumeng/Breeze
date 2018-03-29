DOM  = require('./DOM.web')
App  = require('./App')
Main = require('./Main')



window.DOM = DOM
window.onload = => new App( isJIT = true )



module.exports = new Main