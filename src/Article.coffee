marked = require('marked')
Prism  = require('prismjs')
Api    = require('./Api')
util   = require('./util')





marked.setOptions({

   gfm:    true
   tables: true

   highlight: ( code, lang ) =>

      if lang = Prism.languages[lang]
         return Prism.highlight(code, lang)
      else
         return code
})





module.exports = class Article

   ########################################
   #|
   #|   new Article( markdown )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="article">
   #|   -----------------------------------
   #|
   #|   article.parse()   -> sections
   #|   article.compile() -> html
   #|   article.render()  -> dom
   #|
   #|   Article.scrollTo( dom, id )
   #|   Article.locateID( dom )        -> id
   #|   Article.getSectionDatas( dom ) -> datas
   #|
   ########################################





   constructor: ( markdown ) ->

      ########################################
      #|
      #|   @params {string} markdown
      #|
      ########################################

      @markdown = markdown
      @renderer = @_createRenderer()

      @parse   = @_parse
      @compile = @_compile
      @render  = @_render





   _parse: =>

      ########################################
      #|
      #|   @return {object[]} sections - [{ heading, content, example }]
      #|
      ########################################

      sections = @_parseSections( @markdown )
      sections = @_parseHeadings( sections )

      return sections





   _parseSections: ( markdown ) =>

      ########################################
      #|
      #|   @params {string}   markdown
      #|   @return {object[]} sections - [{ heading, content, example }]
      #|
      ########################################

      lines        = markdown.split('\n')
      sections     = []
      sectionLines = []
      inExample    = false
      inCode       = false

      for line, i in lines

         sectionLines.push(line)

         { isExampleStart, isExampleEnd, isCode } = @_checkLine(line)

         if isExampleStart then inExample = true
         if isExampleEnd   then inExample = false
         if isCode         then inCode    = !inCode

         next = @_checkLine( lines[i+1] )

         if next.isHeading or next.isEOF
            if not ( inExample or inCode )

               section = @_parseSection(sectionLines)
               sections.push(section)
               sectionLines = []

      return sections





   _parseSection: ( sectionLines ) =>

      ########################################
      #|
      #|   @params {string[]} sectionLines
      #|   @return {object}   section - {string} heading
      #|                                {string} content
      #|                                {string} example
      #|
      ########################################

      heading = ''
      content = ''
      example = ''

      inExample = false

      for line, i in sectionLines

          { isExampleStart, isExampleEnd, isHeading } = @_checkLine(line)

          if isExampleStart
             inExample = true
             continue

          if isExampleEnd
             inExample = false
             continue

          if isHeading and i is 0
             heading = line
             continue

          if inExample
             example += "#{line}\n"
          else
             content += "#{line}\n"

      heading = heading.trim()
      content = content.trim()
      example = example.trim()

      return { heading, content, example }





   _checkLine: ( line ) =>

      ########################################
      #|
      #|   @return {object} - {boolean} isExampleStart
      #|                      {boolean} isExampleEnd
      #|                      {boolean} isCode
      #|                      {boolean} isHeading
      #|                      {boolean} isEOF
      #|
      ########################################

      exampleStart = /^\s*<example>/
      exampleEnd   = /^\s*<\/example>/
      code         = /^\s*```/
      heading      = /^\s*#{1,6}/

      isExampleStart = line and exampleStart.test(line)
      isExampleEnd   = line and exampleEnd.test(line)
      isCode         = line and code.test(line)
      isHeading      = line and heading.test(line)

      isEOF          = line is undefined

      return { isExampleStart, isExampleEnd, isCode, isHeading, isEOF }





   _parseHeadings: ( sections ) =>

      ########################################
      #|
      #|   @params {object[]} sections - [{ heading, content, example }]
      #|   @return {object[]} sections - [{ heading, content, example }]
      #|
      ########################################

      for section, i in sections

          heading = sections[i]?.heading
          prev    = sections[i-1]?.heading

          section.heading = @_parseHeading( heading, prev )

      return sections





   _parseHeading: ( heading, prev ) =>

      ########################################
      #|
      #|   @params {string} heading
      #|   @params {object} prev - {number} lv
      #|                           {string} text
      #|                           {string} order
      #|
      #|   @return {object} heading - {number} lv
      #|                              {string} text
      #|                              {string} order
      #|
      #|   Assume the prev.order is '1.2',
      #|
      #|      '#### Quick Start'  ->  { lv: 4, text: 'Quick Start', order: '1.2.0.1' }
      #|
      ########################################

      if heading

         heading = heading.trim()
         results = heading.match /^(#+)\s*(.*)$/

         lv   = results[1].length
         text = results[2]

         text  = @_replaceSpecialTag( text )
         order = @_parseOrder( lv, prev?.order )

         return { lv, order, text }

      else
         return null





   _encodeEscapedChar: ( text ) =>

      ########################################
      #|
      #|   @params {string} text
      #|   @return {string} text
      #|
      #|   <  =>  &lt;
      #|   >  =>  &gt;
      #|
      ########################################

      text = text.replace(/&/g, '&amp;')
      text = text.replace(/</g, '&lt;')
      text = text.replace(/>/g, '&gt;')
      text = text.replace(/"/g, '&quot;')
      text = text.replace(/'/g, '&#39;')

      return text





   _parseOrder: ( lv, prevOrder ) =>

      ########################################
      #|
      #|   @params {number} lv
      #|   @params {string} prevOrder
      #|   @return {string} order
      #|
      ########################################

      if prevOrder

         # Assume lv = 3, prevOrder = '1.2.3.4'

         order = prevOrder.split('.')           # order = ['1', '2', '3', '4']

         order = order.map (p) => parseInt(p)   # order = [1, 2, 3, 4]

         order.push(0) while order.length < lv  # order = [1, 2, 3, 4]  append 0 if order.length < 3

         order[lv-1] += 1                       # order = [1, 2, 4, 4]

         order = order.slice(0, lv)             # order = [1, 2, 4]

         order = order.join('.')                # order = '1.2.4'

         return order

      else
         return '1'





   _compile: =>

      ########################################
      #|
      #|   Compile article-markdown to html.
      #|
      #|   @return {string} html
      #|
      ########################################

      sections = @_parse()
      sections = sections.map(@_compileSection).join('')

      article = util.dom('#article')
      article.html(sections)

      return article.htmlSelf()





   _compileSection: ( section ) =>

      ########################################
      #|
      #|   @params {object} section - {object} heading
      #|                              {string} content
      #|                              {string} example
      #|   @return {string} section
      #|
      ########################################

      { heading, content, example } = section

      lv    = heading?.lv
      text  = heading?.text
      order = heading?.order

      id = util.id( order, text )

      heading = if heading then @_compileHeading( heading ) else ''
      content = if content then @_compileContent( content ) else ''
      example = if example then @_compileExample( example ) else ''

      section = heading + content + example

      section = util.dom('.section').html(section)
      section.attr('id', id)         if id
      section.attr('href', '#'+id)   if id
      section.addClass('lv'+lv)      if lv
      section.addClass('no-heading') if !text

      return section.htmlSelf()





   _compileHeading: ( heading ) =>

      ########################################
      #|
      #|   @params {object} heading - {number} lv
      #|                              {string} text
      #|                              {string} order
      #|   @params {string} heading
      #|
      ########################################

      { lv, text, order } = heading

      if lv <= Breeze.config('article.showOrderLevel')
         text = "#{order} #{text}"

      text = text.trim()
      text = @_encodeEscapedChar( text )

      return "<h#{ lv } class=\"heading\">#{ text }</h#{ lv }>"





   _compileContent: ( content ) =>

      ########################################
      #|
      #|   @params {string} content ( markdown )
      #|   @return {string} content ( html )
      #|
      ########################################

      content = @_replaceSpecialTag(content)
      content = marked(content, { renderer: @renderer })

      return "<div class=\"content\">#{ content }</div>"





   _compileExample: ( example ) =>

      ########################################
      #|
      #|   @params {string} example ( markdown )
      #|   @return {string} example ( html )
      #|
      ########################################

      example = @_replaceSpecialTag(example)
      example = marked(example, { renderer: @renderer })

      return "<div class=\"example\">#{ example }</div>"





   _replaceSpecialTag: ( text ) =>

      ########################################
      #|
      #|   @params {string} text
      #|   @return {string} text
      #|
      #|   <EXAMPLE>...</EXAMPLE>  =>  <example>...</example>
      #|   <JADE>...</JADE>        =>  <jade>...</jade>
      #|
      ########################################

      keywords = ['EXAMPLE', 'JADE', 'NAV', 'COVER', 'SUMMARY']
      keywords = keywords.map ( keyword ) => '(?:<\/?' + keyword + '>)'
      keywords = keywords.join('|')

      reg = new RegExp( keywords, 'g' )

      text = text.replace reg, ( match ) =>
         switch match
           when '<EXAMPLE>'  then '<example>'
           when '<JADE>'     then '<jade>'
           when '<NAV>'      then '<nav>'
           when '<COVER>'    then '<cover>'
           when '<SUMMARY>'  then '<summary>'
           when '</EXAMPLE>' then '</example>'
           when '</JADE>'    then '</jade>'
           when '</NAV>'     then '</nav>'
           when '</COVER>'   then '</cover>'
           when '</SUMMARY>' then '</summary>'

      return text





   _compilePre: ( html ) =>

      ########################################
      #|
      #|   @params {string} html
      #|   @return {string} html
      #|
      ########################################

      pre = util.dom( html )
      pre.html(pre.html().trim())

      if code = pre.find('code')
         code.html(code.html().trim())

      return pre.htmlSelf()





   _compileApi: ( html ) =>

      ########################################
      #|
      #|   @params {string} html
      #|   @return {string} html
      #|
      ########################################

      api = new Api( html )
      return api.compile()





   _isTag: ( name, html ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @params {string} html
      #|
      #|   @return {boolean}
      #|
      ########################################

      reg = new RegExp("^<\\s*#{name}[^>]*?>(.|\n)*?<\\s*/\\s*#{name}\\s*>$")

      return reg.test( html )





   _render: =>

      ########################################
      #|
      #|   @return {DOM} article
      #|
      ########################################

      return util.dom(@_compile())





   _createRenderer: =>

      ########################################
      #|
      #|   @return {marked.Renderer} renderer
      #|
      ########################################

      renderer = new marked.Renderer()
      renderer.html = @_renderer_html

      return renderer





   _renderer_html: ( html ) =>

      ########################################
      #|
      #|   @params {string} html
      #|   @return {string} html
      #|
      ########################################

      html = html.trim()

      switch
         when @_isTag('pre', html) then @_compilePre( html )
         when @_isTag('api', html) then @_compileApi( html )
         else html





Article.scrollTo = ( article, id ) =>

   ########################################
   #|
   #|   @params {DOM}    article
   #|   @params {string} id
   #|
   ########################################

   section = article.find("[id=\"#{id}\"]")

   if section
      top = section.top()
      window.scrollBy(0, top - Breeze.headHeight + 1)
   else
      window.scrollTo(0, 0)





Article.locateID = ( article ) =>

   ########################################
   #|
   #|   @params {DOM}    article
   #|   @return {string} id
   #|
   ########################################

   sections = article.findAll('.section')

   for section, i in sections
      if section.top() > 0
         break

   if section = sections[i-1]
      if id = section.attr('id')
         return id

   return ''





Article.getSectionDatas = ( article ) =>

   ########################################
   #|
   #|   @params {DOM}      article
   #|   @return {object[]} sectionDatas - [{ id, heading, content, example }]
   #|
   ########################################

   sections     = article.findAll('.section')
   sectionDatas = []

   for section in sections
       sectionData = Article._getSectionData( section )
       sectionDatas.push( sectionData )

   return sectionDatas





Article._getSectionData = ( section ) =>

   ########################################
   #|
   #|   @params {DOM}    section
   #|   @return {object} sectionData - {string} id
   #|                                  {string} heading
   #|                                  {string} content
   #|                                  {string} example
   #|
   ########################################

   id = section.attr('id') ? ''

   heading = Article._getHeadingData( section )
   content = Article._getContentData( section )
   example = Article._getExampleData( section )

   return { id, heading, content, example }





Article._getHeadingData = ( section ) =>

   ########################################
   #|
   #|   @params {DOM}    section
   #|   @return {string} heading
   #|
   ########################################

   sels = [
      '.section > h1'
      '.section > h2'
      '.section > h3'
      '.section > h4'
      '.section > h5'
      '.section > h6'
   ]

   heading = section.find(sels.join(','))

   if heading
      return heading.text()
   else
      return ''





Article._getContentData = ( section ) =>

   ########################################
   #|
   #|   @params {DOM}    section
   #|   @return {string} content
   #|
   ########################################

   content = section.find('.content')

   if content
      return content.text().replace(/(?:\s|\n)+/g, '')
   else
      return ''





Article._getExampleData = ( section ) =>

   ########################################
   #|
   #|   @params {DOM}    section
   #|   @return {string} example
   #|
   ########################################

   example = section.find('.example')

   if example
      return example.text().replace(/(?:\s|\n)+/g, '')
   else
      return ''