cheerio = require('cheerio')





module.exports = class DOM

   ########################################
   #|
   #|   new DOM( html )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       querying and operating dom ( html-string )
   #|
   #|    Adapted to the node environment ( build or SSR )
   #|   -----------------------------------
   #|
   #|   dom.find( sel )         -> dom
   #|   dom.findAll( sel )      -> doms
   #|   dom.children()          -> doms
   #|
   #|   dom.htmlSelf( html )    -> dom
   #|   dom.htmlSelf()          -> html
   #|
   #|   dom.html( html )        -> this
   #|   dom.html()              -> html
   #|
   #|   dom.attr( name, value ) -> this
   #|   dom.attr( name )        -> value
   #|
   #|   dom.text( text )        -> this
   #|   dom.text()              -> text
   #|
   #|   dom.hasClass( name )    -> bool
   #|   dom.addClass( name )    -> this
   #|   dom.removeClass( name ) -> this
   #|
   #|   dom.append( child )     -> this
   #|
   ########################################





   constructor: ( html ) ->

      ########################################
      #|
      #|   @params {string} html
      #|
      ########################################

      @_root = cheerio.load( html )('body > *')

      @find        = @_find
      @findAll     = @_findAll
      @children    = @_children
      @htmlSelf    = @_htmlSelf
      @html        = @_html
      @attr        = @_attr
      @text        = @_text
      @hasClass    = @_hasClass
      @addClass    = @_addClass
      @removeClass = @_removeClass
      @append      = @_append





   _find: ( sel ) =>

      ########################################
      #|
      #|   @params {string} sel
      #|   @return {DOM}    dom - return null when not found.
      #|
      ########################################

      el = @_root.find( sel )[0]

      if el
         html = cheerio('<fragment>').append( el ).html()
         return new DOM( html )

      else
         return null





   _findAll: ( sel ) =>

      ########################################
      #|
      #|   @params {string} sel
      #|   @return {DOM[]}  doms - return [] when not found.
      #|
      ########################################

      doms = []
      els  = @_root.find( sel )

      for el in els
          html = cheerio('<fragment>').append( el ).html()
          dom  = new DOM( html )
          doms.push( dom )

      return doms





   _children: ( sel ) =>

      ########################################
      #|
      #|   @return {DOM[]} doms - return [] when not found.
      #|
      ########################################

      doms = []
      els  = @_root.children()

      for el in els
          html = cheerio('<fragment>').append( el ).html()
          dom  = new DOM( html )
          doms.push( dom )

      return doms





   _htmlSelf: ( html ) =>

      ########################################
      #|
      #|   SET   @params {string} html
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} html ( outer's )
      #|
      ########################################

      if html?
         return new DOM( html )

      else
         return cheerio('<fragment>').append( @_root ).html()





   _html: ( html ) =>

      ########################################
      #|
      #|   SET   @params {string} html
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} html ( inner's )
      #|
      ########################################

      if html?
         @_root.html( html )
         return @

      else
         return @_root.html()





   _attr: ( name, value ) =>

      ########################################
      #|
      #|   SET   @params {string} name
      #|         @params {string} value
      #|         @return {DOM}    this
      #|
      #|   GET   @params {string} name
      #|         @return {string} value
      #|
      ########################################

      if value?
         @_root.attr( name, value )
         return @

      else
         return @_root.attr( name )





   _text: ( text ) =>

      ########################################
      #|
      #|   SET   @params {string} text
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} text
      #|
      ########################################

      if text?
         @_root.text( text )
         return @

      else
         return @_root.text()





   _hasClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {boolean}
      #|
      ########################################

      return @_root.hasClass( name )





   _addClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {DOM}    this
      #|
      ########################################

      @_root.addClass( name )
      return @





   _removeClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {DOM}    this
      #|
      ########################################

      @_root.removeClass( name )
      return @





   _append: ( child ) =>

      ########################################
      #|
      #|   @params {DOM|string} dom|html
      #|   @return {DOM} this
      #|
      ########################################

      if child

         if typeof(child) is 'string'
            child = new DOM(child)

         @_root.append(child.root)

      return @