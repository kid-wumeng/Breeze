util = require('./util')





module.exports = class API

   ########################################
   #|
   #|   new Api()
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div class="api">
   #|   -----------------------------------
   #|
   #|   api.compile() -> html
   #|
   ########################################





   constructor: ( html ) ->

      ########################################
      #|
      #|   @params {string} html
      #|
      ########################################

      @html = html
      @compile = @_compile





   _compile: =>

      ########################################
      #|
      #|   @params {string} html
      #|   @return {string} html
      #|
      ########################################

      dom = util.dom(@html)
      api = util.dom('.api')

      items = dom.findAll('item')

      for item in items
          api.append(@_compileItem( item ))

      return api.htmlSelf()





   _compileItem: ( item ) =>

      ########################################
      #|
      #|   @params {DOM} item
      #|   @return {DOM} item
      #|
      ########################################

      name = item.find('name')
      type = item.find('type')
      desc = item.find('desc')

      left  = util.dom('.left')
      right = util.dom('.right')

      if name
         name = util.dom('.name').text(name.text())
         left.append(name)

      if type
         type = util.dom('.type').text(type.text())
         left.append(type)

      if desc
         desc = util.dom('.desc').text(desc.text())
         right.append(desc)

      item = util.dom('.item').append(left).append(right)

      return item