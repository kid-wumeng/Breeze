events = {}




exports.on = ( name, callback ) =>

   ########################################
   #|
   #|  @params {string}   event's name
   #|  @params {function} callback( args... )
   #|
   ########################################

   if !events[name]
     events[name] = []
   events[name].push(callback)




exports.emit = ( name, args... ) =>

   ########################################
   #|
   #|  @params {string} event's name
   #|  @params {*...}   args..
   #|
   ########################################

   for callback in events[name] ? []
       callback( args... )