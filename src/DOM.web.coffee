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
   #|   dom.findAll( sel )       -> doms
   #|   dom.children()           -> doms
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
   #|
   #|   << The following methods exist only in web environment >>
   #|
   #|   dom.element()            -> root's $el
   #|   dom.val( value )         -> this
   #|   dom.val()                -> value
   #|   dom.parent()             -> dom
   #|   dom.css( name, value )   -> this
   #|   dom.width()              -> width
   #|   dom.height()             -> height
   #|   dom.top()                -> top
   #|   dom.bottom()             -> bottom
   #|   dom.isVisible()          -> bool
   #|   dom.scroll( deltaY )     -> this
   #|   dom.on( name, callback ) -> this
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
      @children    = @_children
      @htmlSelf    = @_htmlSelf
      @html        = @_html
      @tag         = @_tag
      @attr        = @_attr
      @text        = @_text
      @hasClass    = @_hasClass
      @addClass    = @_addClass
      @removeClass = @_removeClass
      @append      = @_append

      @element     = @_element
      @val         = @_val
      @parent      = @_parent
      @css         = @_css
      @width       = @_width
      @height      = @_height
      @top         = @_top
      @bottom      = @_bottom
      @isVisible   = @_isVisible
      @scroll      = @_scroll
      @on          = @_on





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





   _find: ( sel ) =>

      ########################################
      #|
      #|   @params {string} sel
      #|   @return {DOM}    dom - return null when not found.
      #|
      ########################################

      $el = @_root.querySelector( sel )

      if $el
         return new DOM( $el )
      else
         return null





   _findAll: ( sel ) =>

      ########################################
      #|
      #|   @params {string} sel
      #|   @return {DOM[]}  doms - return [] when not found.
      #|
      ########################################

      doms = []
      $els = @_root.querySelectorAll( sel )

      for $el in $els
          dom = new DOM( $el )
          doms.push( dom )

      return doms





   _children: =>

      ########################################
      #|
      #|   @return {DOM[]} doms - return [] when not found.
      #|
      ########################################

      doms = []
      $els = @_root.childNodes

      for $el in $els
          if $el.nodeType is 1
             dom = new DOM( $el )
             doms.push( dom )

      return doms





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





   _tag: =>

      ########################################
      #|
      #|   @return {string} value
      #|
      ########################################

      return @_root.tagName.toLowerCase()





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





   _element: =>

      ########################################
      #|
      #|   @return {HTMLElement} root's $el
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      return @_root





   _val: ( value ) =>

      ########################################
      #|
      #|   SET   @params {string} value
      #|         @return {DOM}    this
      #|
      #|   GET   @return {string} value
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      if value?
         @_root.value = value
         return @

      else
         return @_root.value





   _parent: =>

      ########################################
      #|
      #|   @return {DOM} parent - return null when not found.
      #|
      #|   This method only exists in DOM.web
      #|
      ########################################

      $el = @_root.parentNode

      if $el
         return new DOM( $el )
      else
         return null





   _css: ( name, value ) =>

      ########################################
      #|
      #|   @params {string} name
      #|   @params {*}      value
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