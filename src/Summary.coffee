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

      li = util.dom('li').addClass("lv#{lv}")
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
          li.on('click', @_active.bind(@, bus, summary, li))





   _active: ( bus, summary, li, e ) =>

      ########################################
      #|
      #|  @params {Bus} bus
      #|  @params {DOM} summary
      #|  @params {DOM} li
      #|  @params {MouseEvent} e
      #|
      ########################################

      if li.find('a')

         if old = summary.find('li.active')
            old.removeClass('active')

         li.addClass('active')





   scroll: ( id ) =>

      $side = document.querySelector('#side')
      $link = document.querySelector("#summary a[href=\"##{id}\"]")

      if $link

         top    = $link.getBoundingClientRect().top
         bottom = $link.getBoundingClientRect().bottom

         if top + 200 > window.innerHeight
            $side.scrollBy( 0, top + 200 - window.innerHeight )

         else if bottom < 200
            $side.scrollBy( 0, bottom - 200 )





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
      if section.heading.lv <= Breeze.get('summary.maxLevel')
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