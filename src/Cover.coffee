util = require('./util')



module.exports = class Cover

   ########################################
   #/
   #/   Be responsible for rendering cover's dom.
   #/
   ########################################





   constructor: ( html ) ->

      ########################################
      #/
      #/   @params {string} html
      #/
      ########################################

      @html = html





   exist: =>

      ########################################
      #/
      #/   @return {boolean}
      #/
      ########################################

      return !!@html





   compile: =>

      ########################################
      #/
      #/   @return {string} html
      #/
      ########################################

      dom   = util.dom(@html)
      cover = util.dom('#cover')
      wrap  = util.dom('.wrap')

      logo    = dom.find('cover > logo')
      name    = dom.find('cover > name')
      descs   = dom.findAll('cover > desc')
      items   = dom.findAll('cover > item')
      buttons = dom.findAll('cover > button')

      wrap.append(@_compileLogo(logo))       if logo
      wrap.append(@_compileName(name))       if name
      wrap.append(@_compileDescs(descs))     if descs.length
      wrap.append(@_compileItems(items))     if items.length
      wrap.append(@_compileButtons(buttons)) if buttons.length

      cover.append(wrap)

      return cover.htmlSelf()





   _compileLogo: ( logo ) =>

      ########################################
      #/
      #/   @params {DOM} logo
      #/   @return {DOM} logo
      #/
      ########################################

      src  = logo.attr('src')
      src  = util.filePath(src)

      logo = util.dom('img.logo')
      logo.attr('src', src)

      return logo





   _compileName: ( name ) =>

      ########################################
      #/
      #/   @params {DOM} name
      #/   @return {DOM} name
      #/
      ########################################

      text    = name.text()
      version = name.attr('version') ? ''

      name    = util.dom('.name').text(text)
      version = util.dom('.version').text(version)

      name.append(version)

      return name





   _compileDescs: ( descs ) =>

      ########################################
      #/
      #/   @params {DOM[]} descs
      #/   @return {DOM}   ul.descs
      #/
      ########################################

      ul = util.dom('ul.descs')

      for desc in descs
          li = util.dom('li').text(desc.text())
          ul.append(li)

      return ul





   _compileItems: ( items ) =>

      ########################################
      #/
      #/   @params {DOM[]} items
      #/   @return {DOM}   ul.items
      #/
      ########################################

      ul = util.dom('ul.items')

      for item in items
          li = util.dom('li').text(item.text())
          ul.append(li)

      return ul





   _compileButtons: ( buttons ) =>

      ########################################
      #/
      #/   @params {DOM[]} buttons
      #/   @return {DOM}   ul.buttons
      #/
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





   render: ( bus ) =>

      ########################################
      #/
      #/   @params {Bus} bus
      #/   @return {DOM} cover
      #/
      ########################################

      cover = util.dom(@compile())

      @_bindEvent( cover )

      return cover





   _bindEvent: ( cover ) =>

      ########################################
      #/
      #/   @params {DOM} cover
      #/
      ########################################

      buttons = cover.findAll('.buttons li')

      for button in buttons
          button.on('click', @_onClickButton.bind(@, cover))





   _onClickButton: ( cover, button ) =>

      ########################################
      #/
      #/   @params {DOM} cover
      #/   @params {MouseEvent} e
      #/
      ########################################

      cover.css('display', 'none')