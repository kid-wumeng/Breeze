ObservableObject = require('./ObservableObject')



module.exports = class Bus extends ObservableObject

   ########################################
   #/
   #/   This is a common event bus, one page need one bus.
   #/
   #/   summary.select( href )
   #/   article.scroll( href )
   #/
   ########################################



   constructor: -> super()