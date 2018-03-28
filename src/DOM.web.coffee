module.exports = class DOM

   ########################################
   #/
   #/   Be responsible for querying and operating dom ( html-string ).
   #/   Adapted to the web environment ( browser-runtime ).
   #/
   ########################################





   constructor: ( html ) ->

      ########################################
      #/
      #/   @params {string|HTMLElement} html|$el
      #/
      ########################################

      if typeof( html ) is 'string'
         @root = @_getHTMLElement( html )
      else
         @root = html

      @$el = @root  # only exists in DOM.web for better semantics.





   _getHTMLElement: ( html ) =>

      ########################################
      #/
      #/   @params {string}      html
      #/   @return {HTMLElement} root
      #/
      ########################################

      fragment = document.createElement('fragment')
      fragment.innerHTML = html
      return fragment.childNodes[0]





   find: ( selector ) =>

      ########################################
      #/
      #/   @params {string} selector
      #/   @return {DOM}    dom - return null when not found.
      #/
      ########################################

      $el = @root.querySelector( selector )

      if $el
         return new DOM( $el )
      else
         return null





   findAll: ( selector ) =>

      ########################################
      #/
      #/   @params {string} selector
      #/   @return {DOM[]}  doms - return [] when not found.
      #/
      ########################################

      doms = []
      $els = @root.querySelectorAll( selector )

      for $el in $els
          dom = new DOM( $el )
          doms.push( dom )

      return doms





   htmlSelf: ( html ) =>

      ########################################
      #/
      #/   SET   @params {string} html
      #/         @return {DOM}    this
      #/
      #/   GET   @return {string} html ( outer's )
      #/
      ########################################

      if html?
         return new DOM( html )

      else
         return @root.outerHTML





   html: ( html ) =>

      ########################################
      #/
      #/   SET   @params {string} html
      #/         @return {DOM}    this
      #/
      #/   GET   @return {string} html ( inner's )
      #/
      ########################################

      if html?
         @root.innerHTML = html
         return @

      else
         return @root.innerHTML





   attr: ( name, value ) =>

      ########################################
      #/
      #/   SET   @params {string} name
      #/         @params {string} value
      #/         @return {DOM}    this
      #/
      #/   GET   @params {string} name
      #/         @return {string} value
      #/
      ########################################

      if value?
         @root.setAttribute( name, value )
         return @

      else
         return @root.getAttribute( name )





   text: ( text ) =>

      ########################################
      #/
      #/   SET   @params {string} text
      #/         @return {DOM}    this
      #/
      #/   GET   @return {string} text
      #/
      ########################################

      if text?
         @root.innerText = text
         return @

      else
         return @root.innerText





   addClass: ( name ) =>

      ########################################
      #/
      #/   @params {string} name
      #/   @return {DOM}    this
      #/
      ########################################

      @root.classList.add( name )
      return @





   hasClass: ( name ) =>

      ########################################
      #/
      #/   @params {string} name
      #/   @return {boolean}
      #/
      ########################################

      return @root.classList.contains( name )





   removeClass: ( name ) =>

      ########################################
      #/
      #/   @params {string} name
      #/   @return {DOM}    this
      #/
      ########################################

      @root.classList.remove( name )
      return @





   append: ( child ) =>

      ########################################
      #/
      #/   @params {DOM|string} child|html|selector
      #/   @return {DOM} this
      #/
      ########################################

      if child

         if typeof(child) is 'string'
            child = new DOM(child)

         @root.appendChild(child.root)

      return @





   css: ( name, value ) =>

      ########################################
      #/
      #/   @params {string} name
      #/   @params {value}  name
      #/   @return {DOM}    this
      #/
      #/   This method only exists in DOM.web
      #/
      ########################################

      @root.style[name] = value





   on: ( name, callback ) =>

      ########################################
      #/
      #/   @params {string}   name
      #/   @params {function} callback
      #/
      #/   add an event listener to root,
      #/   this method only exists in DOM.web
      #/
      ########################################

      @root.addEventListener name, (e) =>

         dom = new DOM(e.target)
         callback(dom, e)

         e.preventDefault()