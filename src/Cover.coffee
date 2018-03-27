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





   format: =>

      ########################################
      #/
      #/   @return {string} html
      #/
      ########################################

      dom   = util.dom(@html)
      wrap  = util.dom('.wrap')
      cover = util.dom('#cover')

      logo    = dom.find('cover > logo')
      name    = dom.find('cover > name')
      descs   = dom.findAll('cover > desc')
      items   = dom.findAll('cover > item')
      buttons = dom.findAll('cover > button')

      wrap.append(@_formatLogo(logo))       if logo
      wrap.append(@_formatName(name))       if name
      wrap.append(@_formatDescs(descs))     if descs.length
      wrap.append(@_formatItems(items))     if items.length
      wrap.append(@_formatButtons(buttons)) if buttons.length

      cover.append(wrap)

      return cover.htmlSelf()





   _formatLogo: ( logo ) =>

      ########################################
      #/
      #/   @params {DOM} logo
      #/   @return {DOM} logo
      #/
      ########################################

      src = logo.attr('src')
      src = util.formatPath(src)

      logo = util.dom('img.logo')
      logo.attr('src', src)

      return logo





   _formatName: ( name ) =>

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





   _formatDescs: ( descs ) =>

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





   _formatItems: ( items ) =>

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





   _formatButtons: ( buttons ) =>

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

          if href = button.attr('href')
             a.attr('href', href)

          text = button.text()
          a.text(text)

          li.append(a)
          ul.append(li)

      return ul





   render: =>

      ########################################
      #/
      #/   @return {HTMLElement} $cover
      #/
      ########################################

      html  = @format()
      cover = util.dom( html )

      @_bindButtonEvent( cover )

      return cover.$el





   _bindButtonEvent: ( cover ) =>

      ########################################
      #/
      #/   @params {DOM} cover
      #/
      ########################################

      for button in cover.findAll('.buttons li')
          button.on('click', => cover.css('display', 'none'))