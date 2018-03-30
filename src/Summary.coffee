marked = require('marked')
util   = require('./util')



module.exports = class Summary

   ########################################
   #/
   #/   Be responsible for rendering summary's dom.
   #/
   ########################################





   constructor: ( html ) ->

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
      #/   @params {string} html
      #/   @return {string} html
      #/
      ########################################

      model   = util.dom(@html)
      summary = util.dom('#summary')
      ul      = util.dom('ul')

      items = model.findAll('item')

      for item in items
          li = @_compileItem( item )
          ul.append(li)

      summary.append(ul)

      return summary.htmlSelf()





   _compileItem: ( item ) =>

      ########################################
      #/
      #/   @params {DOM} item
      #/   @return {DOM} li
      #/
      ########################################

      name = item.find('name')
      href = item.attr('href')
      lv   = item.attr('lv')

      if href
         return @_compileItemByLink( name, href, lv )
      else
         return @_compileItemByHint( name, href, lv )





   _compileItemByLink: ( name, href, lv = '1' ) =>

      ########################################
      #/
      #/   @params {DOM}    name
      #/   @params {string} href
      #/   @params {string} lv
      #/
      #/   @return {DOM}    li.lvX
      #/
      ########################################

      li = util.dom('li').attr('href', href).addClass("lv#{lv}")
      a  = util.dom('a').attr('href', href)

      if name
         a.text(name.text())

      return li.append(a)





   _compileItemByHint: ( name, href, lv = '1' ) =>

      ########################################
      #/
      #/   @params {DOM}    name
      #/   @params {string} href
      #/   @params {string} lv
      #/
      #/   @return {DOM}    li.label.lvX
      #/
      ########################################

      li = util.dom('li.hint').addClass("lv#{lv}")

      if name
         li.text(name.text())

      return li





   render: ( bus ) =>

      ########################################
      #/
      #/   @params {Bus} bus
      #/   @return {DOM} summary
      #/
      ########################################

      summary = util.dom(@compile())

      @_bindEvent( bus, summary )

      return summary





   _bindEvent: ( bus, summary ) =>

      ########################################
      #/
      #/   @params {DOM} summary
      #/
      ########################################

      items = summary.findAll('li')

      for li in items
          li.on('click', @_onClickItem.bind(@, bus, summary, li))

      bus.on('article.scroll', @_onArticleScroll.bind(@, summary))





   _onClickItem: ( bus, summary, li ) =>

      ########################################
      #/
      #/   @params {Bus} bus
      #/   @params {DOM} summary
      #/   @params {DOM} li
      #/
      ########################################

      @_active( summary, li )

      if href = li.attr('href')
         bus.emit('summary.select', href)





   _onArticleScroll: ( summary, href ) =>

      ########################################
      #/
      #/   @params {DOM}    summary
      #/   @params {string} href
      #/
      ########################################

      li = summary.find("li[href=\"#{href}\"]")

      if li
         @_active( summary, li )
         @_scroll( summary, li )





   _active: ( summary, li ) =>

      ########################################
      #/
      #/   @params {DOM} summary
      #/   @params {DOM} li
      #/
      ########################################

      if li.find('a')

         if old = summary.find('li.active')
            old.removeClass('active')

         li.addClass('active')





   _scroll: ( summary, li ) =>

      ########################################
      #/
      #/   @params {DOM} summary
      #/   @params {DOM} li
      #/
      ########################################

      side = util.dom(document.querySelector('#side'))

      top    = li.top()
      bottom = li.bottom()

      if top + 200 > window.innerHeight
         side.scroll(top + 200 - window.innerHeight)

      else if bottom < 200
         side.scroll(bottom - 200)





Summary.parse = ( sections ) =>

   ########################################
   #/
   #/   @params {object[]} sections - [{ heading, content, example }]
   #/   @return {string}   html
   #/
   ########################################

   sections = sections.filter( Summary._filterSection )
   sections = sections.map( Summary._mapSection )

   return "<summary>#{sections.join('')}</summary>"





Summary._filterSection = ( section ) =>

   ########################################
   #/
   #/   @params {object} section - {object} heading - { lv, text, order }
   #/                              {string} content
   #/                              {string} example
   #/
   #/   @return {boolean}
   #/
   ########################################

   if section.heading
      if section.heading.lv <= Breeze.config('summary.showLevel')
         return true

   return false





Summary._mapSection = ( section ) =>

   ########################################
   #/
   #/   @params {object} section - {object} heading - { lv, text, order }
   #/                              {string} content
   #/                              {string} example
   #/
   #/   @return {string} html
   #/
   ########################################

   { lv, text, order } = section.heading

   href = util.id( order, text )

   return """
      <item lv="#{ lv }" href="##{ href }">
         <name>#{ text }</name>
      </item>
   """