module.exports = class DOM

   ########################################
   #|
   #|   new DOM( html )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       querying and operating dom ( html-string )
   #|
   #|    Adapted to the web environment ( browser-runtime )
   #|   -----------------------------------
   #|
   #|   dom.find( sel )          -> dom
   #|   dom.findAll( sel )       -> dom[]
   #|   dom.parent()             -> dom
   #|
   #|   dom.htmlSelf( html )     -> dom
   #|   dom.htmlSelf()           -> html
   #|
   #|   dom.html( html )         -> this
   #|   dom.html()               -> html
   #|
   #|   dom.attr( name, value )  -> this
   #|   dom.attr( name )         -> value
   #|
   #|   dom.text( text )         -> this
   #|   dom.text()               -> text
   #|
   #|   dom.hasClass( name )     -> bool
   #|   dom.addClass( name )     -> this
   #|   dom.removeClass( name )  -> this
   #|
   #|   dom.append( child )      -> this
   #|
   #|   dom.css( name, value )   -> this
   #|
   #|   dom.width()              -> width
   #|   dom.height()             -> height
   #|   dom.top()                -> top
   #|   dom.bottom()             -> bottom
   #|   dom.isVisible()          -> bool
   #|
   #|   dom.scroll( deltaY )     -> this
   #|
   #|   dom.on( name, callback ) -> this
   #|
   #|   dom.element()            -> root's $el
   #|
   ########################################





   constructor: ( arg ) ->

      ########################################
      #|
      #|   @params {string|HTMLElement} html|$el
      #|
      ########################################

      @_root = @_resolveRoot( arg )

      @find        = @_find
      @findAll     = @_findAll
      @parent      = @_parent
      @htmlSelf    = @_htmlSelf
      @html        = @_html
      @attr        = @_attr
      @text        = @_text
      @hasClass    = @_hasClass
      @addClass    = @_addClass
      @removeClass = @_removeClass
      @append      = @_append
      @css         = @_css
      @width       = @_width
      @height      = @_height
      @top         = @_top
      @bottom      = @_bottom
      @isVisible   = @_isVisible
      @scroll      = @_scroll
      @on          = @_on
      @element     = @_element





   _resolveRoot: ( arg ) =>

      ########################################
      #|
      #|   @params {string|HTMLElement} html|$el
      #|   @return {HTMLElement}
      #|
      ########################################

      if typeof(arg) is 'string'

         fragment = document.createElement('fragment')
         fragment.innerHTML = html = arg

         return fragment.childNodes[0]

      else
         return $el = arg





   _find: ( selector ) =>

      ########################################
      #|
      #|   @params {string} selector
      #|   @return {DOM}    dom - return null when not found.
      #|
      ########################################

      $el = @_root.querySelector( selector )

      if $el
         return new DOM( $el )
      else
         return null





   _findAll: ( selector ) =>

      ########################################
      #|
      #|   @params {string} selector
      #|   @return {DOM[]}  doms - return [] when not found.
      #|
      ########################################

      doms = []
      $els = @_root.querySelectorAll( selector )

      for $el in $els
          dom = new DOM( $el )
          doms.push( dom )

      return doms





   _parent: =>

      ########################################
      #|
      #|   @return {DOM} parent
      #|
      ########################################

      return new DOM( @_root.parentNode )





   _htmlSelf: ( html ) =>

      ########################################
      #|
      #|   SET   @params {string} html
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} html ( outer's )
      #|
      ########################################

      if html?
         return new DOM( html )

      else
         return @_root.outerHTML





   _html: ( html ) =>

      ########################################
      #|
      #|   SET   @params {string} html
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} html ( inner's )
      #|
      ########################################

      if html?
         @_root.innerHTML = html
         return @

      else
         return @_root.innerHTML





   _attr: ( name, value ) =>

      ########################################
      #|
      #|   SET   @params {string} name
      #|         @params {string} value
      #|         @return {DOM}    this
      #|
      #|   GET   @params {string} name
      #|         @return {string} value
      #|
      ########################################

      if value?
         @_root.setAttribute( name, value )
         return @

      else
         return @_root.getAttribute( name )





   _text: ( text ) =>

      ########################################
      #|
      #|   SET   @params {string} text
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} text
      #|
      ########################################

      if text?
         @_root.innerText = text
         return @

      else
         return @_root.innerText





   _addClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {DOM}    this
      #|
      ########################################

      @_root.classList.add( name )
      return @





   _hasClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {boolean}
      #|
      ########################################

      return @_root.classList.contains( name )





   _removeClass: ( name ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @return {DOM}    this
      #|
      ########################################

      @_root.classList.remove( name )
      return @





   _append: ( child ) =>

      ########################################
      #|
      #|   @params {DOM|string} dom|html
      #|   @return {DOM} this
      #|
      ########################################

      if child

         if typeof(child) is 'string'
            child = new DOM(child)

         @_root.appendChild(child.element())

      return @





   _css: ( name, value ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @params {value}  name
      #|   @return {DOM}    this
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      @_root.style[name] = value

      return @





   _width: =>

      ########################################
      #|
      #|   @return {number} width
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      return @_root.getBoundingClientRect().width





   _height: =>

      ########################################
      #|
      #|   @return {number} height
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      return @_root.getBoundingClientRect().height





   _top: =>

      ########################################
      #|
      #|   @return {number} top
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      return @_root.getBoundingClientRect().top





   _bottom: =>

      ########################################
      #|
      #|   @return {number} top
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      return @_root.getBoundingClientRect().top





   _isVisible: =>

      ########################################
      #|
      #|   @return {boolean}
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      return @width() > 0





   _scroll: ( deltaY ) =>

      ########################################
      #|
      #|   @params {number} delta Y
      #|   @return {DOM}    this
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      @_root.scrollBy(0, deltaY)

      return @





   _on: ( name, callback ) =>

      ########################################
      #|
      #|   @params {string}   name
      #|   @params {function} callback
      #|   @return {DOM}      this
      #|
      #|   add an event listener to root,
      #|   this method only exists in DOM.web
      #|
      ########################################

      @_root.addEventListener name, (e) =>

         dom = new DOM(e.target)
         callback(dom, e)

         e.preventDefault()

      return @





   _element: =>

      ########################################
      #|
      #|   @return {HTMLElement} root's $el
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      return @_root