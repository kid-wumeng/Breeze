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
   #|   Side.open( side )
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





Side.open = ( side ) =>

   ########################################
   #|
   #|   @params {string}   key
   #|   @params {object[]} datas - [{ id, sideing, content, example }]
   #|
   #|   @return {object[]} items - [{ id, sideing, content, example }]
   #|
   ########################################

   key = key.replace('\\', '\\\\')
   key = key.replace(/(?:\s|\n)+/g, '')

   items = Side._match( key, datas )
   items = Side._sortItems( items )

   return items