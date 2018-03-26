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
      #/   @params {string} html
      #/
      ########################################

      @root = @_getRoot( html )





   _getRoot: ( html ) =>

      ########################################
      #/
      #/   @params {string}      html
      #/   @return {HTMLElement} root
      #/
      ########################################

      fragment = document.createElement('fragment')
      fragment.innerHTML = html
      return fragment.childNodes[0]





   find: ( sel ) =>

      ########################################
      #/
      #/   @params {string} sel
      #/   @return {DOM}    dom - return null when not found.
      #/
      ########################################

      el = @root.querySelector(sel)

      if el
         el = el.cloneNode(true)

         fragment = document.createElement('fragment')
         fragment.appendChild(el)

         html = fragment.innerHTML
         return new DOM( html )

      else
         return null





   findAll: ( sel ) =>

      ########################################
      #/
      #/   @params {string} sel
      #/   @return {DOM[]}  doms - return [] when not found.
      #/
      ########################################

      doms = []
      els  = @root.querySelectorAll(sel)

      for el in els
          el = el.cloneNode(true)

          fragment = document.createElement('fragment')
          fragment.appendChild(el)

          html = fragment.innerHTML
          doms.push(new DOM( html ))

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

      if html
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

      if html
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

      if value
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

      if text
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
      #/   @params {DOM} child
      #/   @return {DOM} this
      #/
      ########################################

      @root.appendChild(child.root.cloneNode(true))
      return @