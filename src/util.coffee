isH5 = =>

   ########################################
   #|
   #|   @return {boolean}
   #|
   ########################################

   width = document?.documentElement?.clientWidth ? 0
   return width <= 1024





isUrl = ( href ) =>

   ########################################
   #/
   #/   @params {string} href
   #/   @return {boolean}
   #/
   ########################################

   return /^(?:http)|(?:https)|(?:ftp):\/\//.test( href )





filePath = ( href = '' ) =>

   ########################################
   #/
   #/   @params {string} href
   #/   @return {string} path
   #/
   #/   href  ->  basePath/href  ( won't format when href is url )
   #/
   ########################################

   if exports.isUrl( href )
      return href
   else
      path = href

   if basePath = Breeze.config('basePath')
      path = basePath + '/' + path

   if path
      path = path.replace(/\/{2,}/g, '/')

   if path[0] is '/'
      path = path.slice(1)

   return path





id = ( order, text = '' ) =>

   ########################################
   #|
   #|  @params {string} order
   #|  @params {string} text
   #|  @return {string} id
   #|
   ########################################

   text = text.replace(/\s+/g,  '-')
   text = text.replace(/&lt;/g, '<')
   text = text.replace(/&gt;/g, '>')

   if text
      return order + '-' + text
   else
      return order





dom = ( arg ) =>

   ########################################
   #/
   #/   @params {string|HTMLElement} html|sel|$el
   #/   @return {DOM}
   #/
   #/   <html>  ->  DOM
   #/   sel#id  ->  DOM
   #/   $el#id  ->  DOM
   #/
   ########################################

   if typeof(arg) is 'string'

      if arg[0] is '<'
         dom = new Breeze.DOM( html = arg )

      else
         { tag, id, classname } = parseSelector( sel = arg )

         dom = new Breeze.DOM("<#{tag}>")

         dom.attr('id',    id)        if id
         dom.attr('class', classname) if classname

   else
      dom = new Breeze.DOM( $el = arg )

   return dom





parseSelector = ( sel = 'div' ) =>

   ########################################
   #/
   #/   @params {string} sel
   #/   @return {object} - {string} tag
   #/                      {string} id
   #/                      {string} classname
   #/
   #/
   #/   'tag'            -> { tag: 'tag' }
   #/   '#id'            -> { tag: 'div', id: 'id' }
   #/   '.classname'     -> { tag: 'div', classname: 'classname' }
   #/   'tag#id'         -> { tag: 'tag', id: 'id' }
   #/   'tag.classname'  -> { tag: 'tag', classname: 'classname' }
   #/
   #/
   #/   This sel can't includes id and classname at the same time.
   #/   This sel can't includes classname more than two.
   #/
   ########################################

   hasID    = /#/.test( sel )
   hasClass = /\./.test( sel )

   tag       = 'div'
   id        = ''
   classname = ''

   parts = sel.split(/#|\./)
   parts = parts.filter ( part ) => part

   switch parts.length

      when 1
         switch
            when hasID    then id        = parts[0]
            when hasClass then classname = parts[0]
            else               tag       = parts[0]

      when 2
         switch
            when hasID    then ( tag = parts[0] ) and ( id        = parts[1] )
            when hasClass then ( tag = parts[0] ) and ( classname = parts[1] )

   return { tag, id, classname }





exports.isH5          = isH5
exports.isUrl         = isUrl
exports.filePath      = filePath
exports.id            = id
exports.dom           = dom
exports.parseSelector = parseSelector