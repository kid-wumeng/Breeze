util = require('./util')





module.exports = class Head

   ########################################
   #|
   #|   new Head( nav )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="head">
   #|   -----------------------------------
   #|
   #|   head.compile() -> html
   #|
   #|   Head.hideWhenNothing( head )
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

      hamburger = util.dom('.hamburger')

      left.append( hamburger )
      right.append( @nav ) if @nav

      head.append( left )
      head.append( center )
      head.append( right )

      return head.htmlSelf()





Head.hideWhenNothing = ( head ) =>

   ########################################
   #|
   #|   @params {DOM} head
   #|
   #|   Hide head when only has hamburger ( when H5 )
   #|
   ########################################

   others = head.findAll('#head > * > *:not(.hamburger)')

   if others.length is 0
      head.css('display', 'none')