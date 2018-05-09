util = require('./util')





module.exports = class Summary

   ########################################
   #|
   #|   new Summary( html )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="summary">
   #|   -----------------------------------
   #|
   #|   summary.compile() -> html
   #|   summary.render()  -> dom
   #|
   #|   Summary.parse( sections ) -> html
   #|   Summary.activeTo( summary, id )
   #|   Summary.scrollTo( summary, id )
   #|
   ########################################





   constructor: ( html ) ->

      @html = html

      @compile = @_compile
      @render  = @_render





   _compile: =>

      ########################################
      #|
      #|   @params {string} html
      #|   @return {string} html
      #|
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
      #|
      #|   @params {DOM} item
      #|   @return {DOM} li
      #|
      ########################################

      name = item.text().trim()
      href = item.attr('href') ? ''
      lv   = item.attr('lv')   ? '1'

      if href
         return @_compileItemByLink( name, href, lv )
      else
         return @_compileItemByHint( name, lv )





   _compileItemByLink: ( name, href, lv ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @params {string} href
      #|   @params {string} lv
      #|
      #|   @return {DOM}    li.lvX
      #|
      ########################################

      li = util.dom('li').attr('href', href).addClass("lv#{lv}")
      a  = util.dom('a').attr('href', href)

      if name
         a.text(name)

      return li.append(a)





   _compileItemByHint: ( name, lv ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @params {string} lv
      #|
      #|   @return {DOM}    li.hint.lvX
      #|
      ########################################

      li = util.dom('li.hint').addClass("lv#{lv}")

      if name
         li.text(name)

      return li





   _render: =>

      ########################################
      #|
      #|   @return {DOM} summary
      #|
      ########################################

      return util.dom(@_compile())





Summary.parse = ( sections ) =>

   ########################################
   #|
   #|   @params {object[]} sections - [{ heading, content, example }]
   #|   @return {string}   html
   #|
   ########################################

   sections = sections.filter( Summary._filterSection )
   sections = sections.map( Summary._mapSection )

   return "<summary>#{sections.join('')}</summary>"





Summary._filterSection = ( section ) =>

   ########################################
   #|
   #|   @params {object} section - {object} heading - { lv, text, order }
   #|                              {string} content
   #|                              {string} example
   #|
   #|   @return {boolean}
   #|
   ########################################

   if section.heading
      if section.heading.lv <= Breeze.config('summary.showLevel')
         return true

   return false





Summary._mapSection = ( section ) =>

   ########################################
   #|
   #|   @params {object} section - {object} heading - { lv, text, order }
   #|                              {string} content
   #|                              {string} example
   #|
   #|   @return {string} html
   #|
   ########################################

   { lv, text, order } = section.heading

   href = util.id( order, text )

   return """
      <item lv="#{ lv }" href="##{ href }">
        #{ text }
      </item>
   """





Summary.activeTo = ( summary, id ) =>

   ########################################
   #|
   #|   @params {DOM}    summary
   #|   @params {string} id
   #|
   ########################################

   if link = Summary._findLink( summary, id )

      if current = summary.find('li.active')
         current.removeClass('active')

      link.parent().addClass('active')





Summary.scrollTo = ( summary, id ) =>

   ########################################
   #|
   #|   @params {DOM}    summary
   #|   @params {string} id
   #|
   ########################################

   if link = Summary._findLink( summary, id )

      side   = summary.parent()
      top    = link.top()
      bottom = link.bottom()

      if top + 200 > window.innerHeight
         side.scroll( top + 200 - window.innerHeight )

      else if bottom < 200
         side.scroll( bottom - 200 )





Summary._findLink = ( summary, id ) =>

   ########################################
   #|
   #|   @params {DOM}    summary
   #|   @params {string} id
   #|   @return {DOM}    link
   #|
   ########################################

   href = '#' + id
   return summary.find("a[href=\"#{href}\"]")