util = require('./util')





module.exports = class Nav

   ########################################
   #|
   #|   new Nav( html )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="nav">
   #|   -----------------------------------
   #|
   #|   nav.compile() -> html
   #|
   ########################################





   constructor: ( html ) ->

      ########################################
      #|
      #|   @params {string} html
      #|
      ########################################

      @html = html

      @exist   = @_exist
      @compile = @_compile





   _exist: =>

      ########################################
      #|
      #|   @return {boolean}
      #|
      ########################################

      return !!@html





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      if !@_exist()
         return @_compileEmpty()

      model = util.dom( @html )
      nav   = util.dom('#nav')

      if model.attr('fixed')?
         nav.addClass('fixed')

      menus = model.findAll('nav > menu')

      for menu in menus
          menu = @_compileMenu( menu )
          nav.append( menu )

      return nav.htmlSelf()





   _compileEmpty: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      return "<div id=\"nav\" style=\"display: none\"/>"





   _compileMenu: ( menu ) =>

      ########################################
      #|
      #|   @params {DOM} menu
      #|   @return {DOM} div.menu
      #|
      ########################################

      if menu.attr('href')?
         return @_compileMenuByLink( menu )
      else
         return @_compileMenuByItems( menu )





   _compileMenuByLink: ( menu ) =>

      ########################################
      #|
      #|   @params {DOM} menu
      #|   @return {DOM} div.menu
      #|
      ########################################

      name  = menu.attr('name')
      href  = menu.attr('href')

      h1 = util.dom('h1')
      a  = util.dom('a')
               .attr('href', href)
               .text(name)

      h1.append(a)

      return util.dom('.menu')
                 .append(h1)





   _compileMenuByItems: ( menu ) =>

      ########################################
      #|
      #|   @params {DOM} menu
      #|   @return {DOM} div.menu
      #|
      ########################################

      name  = menu.attr('name')
      items = menu.findAll('menu > item, menu > line')

      h1 = util.dom('h1').text(name).addClass('hint')
      ul = util.dom('ul')

      for item in items
          switch item.tag()
             when 'item' then li = @_compileItem(item)
             when 'line' then li = @_compileLine(item)
          ul.append(li)

      return util.dom('.menu')
                 .append(h1)
                 .append(ul)





   _compileItem: ( item ) =>

      ########################################
      #|
      #|   @params {DOM} item
      #|   @return {DOM} li
      #|
      ########################################

      if item.attr('href')?
         return @_compileItemByLink( item )
      else
         return @_compileItemByHint( item )





   _compileItemByLink: ( item ) =>

      ########################################
      #|
      #|   @params {DOM} item
      #|   @return {DOM} li
      #|
      ########################################

      name = item.attr('name')
      href = item.attr('href')

      li = util.dom('li')
      a  = util.dom('a')
               .attr('href', href)
               .text(name)

      return li.append(a)





   _compileItemByHint: ( item ) =>

      ########################################
      #|
      #|   @params {DOM} item
      #|   @return {DOM} li
      #|
      ########################################

      name = item.attr('name')

      li = util.dom('li.hint')
               .text(name)

      return li





   _compileLine: =>

      ########################################
      #|
      #|   @return {DOM} li
      #|
      ########################################

      return util.dom('li.line')