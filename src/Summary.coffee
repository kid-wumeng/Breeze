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
   #|   summary.parseSectionItems() -> items
   #|   summary.compile()           -> html
   #|   summary.render()            -> dom
   #|
   #|   Summary.activeTo( summary, id )
   #|   Summary.scrollTo( summary, id )
   #|
   ########################################





   constructor: ( html, sections ) ->

      ########################################
      #|
      #|   @params {string}   html
      #|   @params {object[]} sections - [{ heading, content, example }]
      #|
      ########################################

      @html     = html
      @sections = sections

      @parse   = @_parse
      @compile = @_compile
      @render  = @_render





   _parseSectionItems: ( sections ) =>

      ########################################
      #|
      #|   @params {object[]} sections - [{ heading, content, example }]
      #|   @return {DOM[]}    items
      #|
      ########################################

      sections = sections.filter( @_filterSectionItem )
      items    = sections.map( @_createSectionItem )

      return items





   _filterSectionItem: ( section ) =>

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





   _createSectionItem: ( section ) =>

      ########################################
      #|
      #|   @params {object} section - {object} heading - { lv, text, order }
      #|                              {string} content
      #|                              {string} example
      #|
      #|   @return {DOM} item
      #|
      ########################################

      { lv, text, order } = section.heading

      href = util.id( order, text )

      item = util.dom('item')
                 .attr('lv', lv)
                 .attr('href', '#' + href)
                 .text(text)

      return item





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      model   = util.dom( @html )
      summary = util.dom('#summary')
      ul      = util.dom('ul')

      itemsByUser     = model.findAll('item')
      itemsBySections = @_parseSectionItems( @sections )

      items = itemsByUser.concat( itemsBySections )

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