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
   #|   dom.find( sel )    -> dom
   #|   dom.findAll( sel ) -> dom[]
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
   #|   dom.hasClass( name )      -> bool
   #|   dom.addClass( name )      -> this
   #|   dom.removeClass( name )   -> this
   #|
   #|   dom.append( child )       -> this
   #|
   ########################################





   constructor: ( html ) ->

      ########################################
      #|
      #|   @params {string} html
      #|
      ########################################

      @root = cheerio.load( html )('body > *')





   find: ( sel ) =>

      ########################################
      #|
      #|   @params {string} sel
      #|   @return {DOM}    dom - return null when not found.
      #|
      ########################################

      el = @root.find(sel)[0]

      if el
         html = cheerio('<fragment>').append(el).html()
         return new DOM( html )

      else
         return null





   findAll: ( sel ) =>

      ########################################
      #|
      #|   @params {string} sel
      #|   @return {DOM[]}  doms - return [] when not found.
      #|
      ########################################

      doms = []
      els  = @root.find(sel)

      for el in els
          html = cheerio('<fragment>').append(el).html()
          dom  = new DOM( html )
          doms.push(dom)

      return doms





   htmlSelf: ( html ) =>

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
         return cheerio('<fragment>').append( @root ).html()





   html: ( html ) =>

      ########################################
      #|
      #|   SET   @params {string} html
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} html ( inner's )
      #|
      ########################################

      if html?
         @root.html( html )
         return @

      else
         return @root.html()





   attr: ( name, value ) =>

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
         @root.attr( name, value )
         return @

      else
         return @root.attr( name )





   text: ( text ) =>

      ########################################
      #|
      #|   SET   @params {string} text
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} text
      #|
      ########################################

      if text?
         @root.text( text )
         return @

      else
         return @root.text()





   hasClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {boolean}
      #|
      ########################################

      return @root.hasClass( name )





   addClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {DOM}    this
      #|
      ########################################

      @root.addClass( name )
      return @






   removeClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {DOM}    this
      #|
      ########################################

      @root.removeClass( name )
      return @





   append: ( child ) =>

      ########################################
      #|
      #|   @params {DOM|string} child|html|sel
      #|   @return {DOM} this
      #|
      ########################################

      if child

         if typeof(child) is 'string'
            child = new DOM(child)

         @root.append(child.root)

      return @