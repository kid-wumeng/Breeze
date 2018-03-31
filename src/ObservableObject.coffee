module.exports = class ObservableObject

   ########################################
   #|
   #|   new ObservableObject()
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       binding and emitting events,
   #|       generally be extended by other classes.
   #|   -----------------------------------
   #|
   #|   observableObject.on( name, callback )
   #|   observableObject.emit( name, params... )
   #|
   ########################################





   constructor: ->

      @_events = {}

      @on   = @_on
      @emit = @_emit





   _on: ( name, callback ) =>

      ########################################
      #|
      #|   Add an event listener.
      #|
      #|   @params {string}   event's name
      #|   @params {function} callback( params... )
      #|
      #|   @return {ObservableObject} this
      #|
      ########################################

      if !@_events[name]
        @_events[name] = []
      @_events[name].push(callback)

      return this





   _emit: ( name, params... ) =>

      ########################################
      #|
      #|   Trigger an event.
      #|
      #|   @params {string} event's name
      #|   @params {*...}   params...
      #|
      #|   @return {ObservableObject} this
      #|
      ########################################

      callbacks = @_events[name] ? []

      for callback in callbacks
         callback( params... )

      return this