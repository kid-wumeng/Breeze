module.exports = class ObservableObject



   constructor: ->
      @events = {}





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

      if !@events[name]
        @events[name] = []
      @events[name].push(callback)

      return this





   emit: ( name, params... ) =>

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

      callbacks = @events[name] ? []

      for callback in callbacks
         callback( params... )

      return this