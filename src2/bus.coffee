########################################
#|
#|  Be responsible for managing events.
#|
#|  @public
#|     on( name, callback )
#|     emit( name, params... )
#|
########################################





events = {}





exports.on = ( name, callback ) =>

   ########################################
   #|
   #|  Add an event listener.
   #|
   #|  @params {string}   event's name
   #|  @params {function} callback( params... )
   #|
   ########################################

   if !events[name]
     events[name] = []
   events[name].push(callback)





exports.emit = ( name, params... ) =>

   ########################################
   #|
   #|  Trigger an event.
   #|
   #|  @params {string} event's name
   #|  @params {*...}   params...
   #|
   ########################################

   callbacks = events[name] ? []

   for callback in callbacks
       callback( params... )