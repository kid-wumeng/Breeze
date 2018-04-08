util = require('./util')





module.exports = class Head

   ########################################
   #|
   #|   new Head( nav-html )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="head">
   #|   -----------------------------------
   #|
   #|   head.compile() -> html
   #|
   #|   Head.renderHamburger( head )
   #|
   ########################################





   constructor: ( nav ) ->

      ########################################
      #|
      #|   @params {string} nav-html
      #|
      ########################################

      @nav = nav
      @compile = @_compile





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      head   = util.dom('#head')

      left   = util.dom('.left')
      center = util.dom('.center')
      right  = util.dom('.right')

      right.append( @nav )

      head.append( left )
      head.append( center )
      head.append( right )

      return head.htmlSelf()





Head.renderHamburger = ( head ) =>

   ########################################
   #|
   #|   @params {string}   key
   #|   @params {object[]} datas - [{ id, heading, content, example }]
   #|
   #|   @return {object[]} items - [{ id, heading, content, example }]
   #|
   ########################################

   key = key.replace('\\', '\\\\')
   key = key.replace(/(?:\s|\n)+/g, '')

   items = Head._match( key, datas )
   items = Head._sortItems( items )

   return items