util = require('./util')





module.exports = class Cover

   ########################################
   #|
   #|   new Cover( html )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="cover">
   #|   -----------------------------------
   #|
   #|   cover.compile() -> html
   #|   cover.render()  -> dom
   #|
   #|   Cover.hide( dom )
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
      @render  = @_render





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

      model = util.dom(@html)
      cover = util.dom('#cover')
      wrap  = util.dom('.wrap')

      logo    = model.find('cover > logo')
      name    = model.find('cover > name')
      descs   = model.findAll('cover > desc')
      items   = model.findAll('cover > item')
      buttons = model.findAll('cover > button')

      wrap.append(@_compileLogo(logo))       if logo
      wrap.append(@_compileName(name))       if name
      wrap.append(@_compileDescs(descs))     if descs.length
      wrap.append(@_compileItems(items))     if items.length
      wrap.append(@_compileButtons(buttons)) if buttons.length

      cover.append(wrap)

      return cover.htmlSelf()





   _compileEmpty: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      return "<div id=\"cover\" style=\"display: none\"/>"





   _compileLogo: ( logo ) =>

      ########################################
      #|
      #|   @params {DOM} logo
      #|   @return {DOM} logo
      #|
      ########################################

      src  = logo.attr('src')
      src  = util.filePath(src)

      logo = util.dom('img.logo')
      logo.attr('src', src)

      return logo





   _compileName: ( name ) =>

      ########################################
      #|
      #|   @params {DOM} name
      #|   @return {DOM} name
      #|
      ########################################

      text    = name.text()
      version = name.attr('version') ? ''

      name    = util.dom('.name').text(text)
      version = util.dom('.version').text(version)

      name.append(version)

      return name





   _compileDescs: ( descs ) =>

      ########################################
      #|
      #|   @params {DOM[]} descs
      #|   @return {DOM}   ul.descs
      #|
      ########################################

      ul = util.dom('ul.descs')

      for desc in descs
          li = util.dom('li').text(desc.text())
          ul.append(li)

      return ul





   _compileItems: ( items ) =>

      ########################################
      #|
      #|   @params {DOM[]} items
      #|   @return {DOM}   ul.items
      #|
      ########################################

      ul = util.dom('ul.items')

      for item in items
          li = util.dom('li').text(item.text())
          ul.append(li)

      return ul





   _compileButtons: ( buttons ) =>

      ########################################
      #|
      #|   @params {DOM[]} buttons
      #|   @return {DOM}   ul.buttons
      #|
      ########################################

      ul = util.dom('ul.buttons')

      for button in buttons

          li = util.dom('li')
          a  = util.dom('a')

          if button.attr('active')?
             li.addClass('active')
             a.addClass('active')

          href = button.attr('href') ? ''
          a.attr('href', href)

          text = button.text()
          a.text(text)

          li.append(a)
          ul.append(li)

      return ul





   _render: =>

      ########################################
      #|
      #|   @return {DOM} cover
      #|
      ########################################

      return util.dom(@_compile())





Cover.hide = ( cover ) =>

   ########################################
   #|
   #|   @params {DOM} cover
   #|
   ########################################

   cover.css('display', 'none')