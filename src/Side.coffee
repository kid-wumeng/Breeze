util = require('./util')





module.exports = class Side

   ########################################
   #|
   #|   new Side( search, summary )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="side">
   #|   -----------------------------------
   #|
   #|   side.compile() -> html
   #|
   #|   Side.setTop( side )
   #|   Side.open( side )
   #|   Side.close( side )
   #|
   ########################################





   constructor: ( search, summary ) ->

      ########################################
      #|
      #|   @params {string} search-html
      #|   @params {string} summary-html
      #|
      ########################################

      @search  = search
      @summary = summary

      @compile = @_compile





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      side  = util.dom('#side')
      navPH = util.dom('#h5-nav-placeholder')

      side.append( @search )
      side.append( navPH )
      side.append( @summary )

      return side.htmlSelf()





Side.setTop = ( side ) =>

   ########################################
   #|
   #|   @params {DOM} side
   #|
   ########################################

   side.css('paddingTop', Breeze.headHeight + 'px')





Side.open = ( side ) =>

   ########################################
   #|
   #|   @params {DOM} side
   #|
   ########################################

   side.addClass('open')





Side.close = ( side ) =>

   ########################################
   #|
   #|   @params {DOM} side
   #|
   ########################################

   side.removeClass('open')