module.exports = class ObservableObject



   constructor: ->
      @__events = {}





   on: ( name, callback ) =>

      ########################################
      #|
      #|  Add an event listener.
      #|
      #|  @params {string}   event's name
      #|  @params {function} callback( params... )
      #|
      #|  @return {ObservableObject} this
      #|
      ########################################

      if !@__events[name]
        @__events[name] = []
      @__events[name].push(callback)

      return this





   _emit: ( name, params... ) =>

      ########################################
      #|
      #|  Trigger an event.
      #|
      #|  @params {string} event's name
      #|  @params {*...}   params...
      #|
      #|  @return {ObservableObject} this
      #|
      ########################################

      callbacks = @__events[name] ? []

      for callback in callbacks
         callback( params... )

      return this