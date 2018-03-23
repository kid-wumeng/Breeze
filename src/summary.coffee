marked           = require('marked')
ObservableObject = require('./ObservableObject')



module.exports = class Summary extends ObservableObject



   constructor: ( markdown ) ->

      super()

      @markdown = markdown
      @html     = @compile( @markdown )
      @$dom     = @render( @html )





   compile: ( markdown ) =>

      return marked( markdown )





   render: ( html ) =>

      $dom = document.createElement('summary')
      $dom.innerHTML = html

      @removeLv4( $dom )
      @setClass( $dom )
      @bindEvent( $dom )

      return $dom





   removeLv4: ( $dom ) =>

      ########################################
      #|
      #|  @params {HTMLElement} $dom
      #|
      #|  Remove the lv4(~lv6) item.
      #|
      ########################################

      $lv4s = $dom.querySelectorAll('summary > ul > li > ul > li > ul > li > ul')

      for $lv4 in $lv4s
          $lv4.parentNode.removeChild($lv4)





   setClass: ( $dom ) =>

      ########################################
      #|
      #|  @params {HTMLElement} $dom
      #|
      #|  Set class .lv1, .lv2, .lv3 to item.
      #|
      ########################################

      $lv1.classList.add('lv1') for $lv1 in $dom.querySelectorAll('summary > ul')
      $lv2.classList.add('lv2') for $lv2 in $dom.querySelectorAll('summary > ul > li > ul')
      $lv3.classList.add('lv3') for $lv3 in $dom.querySelectorAll('summary > ul > li > ul > li > ul')

      $lv1.classList.add('lv1') for $lv1 in $dom.querySelectorAll('summary > ul > li')
      $lv2.classList.add('lv2') for $lv2 in $dom.querySelectorAll('summary > ul > li > ul > li')
      $lv3.classList.add('lv3') for $lv3 in $dom.querySelectorAll('summary > ul > li > ul > li > ul > li')

      $lv1.classList.add('lv1') for $lv1 in $dom.querySelectorAll('summary > ul > li > a')
      $lv2.classList.add('lv2') for $lv2 in $dom.querySelectorAll('summary > ul > li > ul > li > a')
      $lv3.classList.add('lv3') for $lv3 in $dom.querySelectorAll('summary > ul > li > ul > li > ul > li > a')





   bindEvent: ( $dom ) =>

      ########################################
      #|
      #|  @params {HTMLElement} $dom
      #|
      ########################################

      $links = $dom.querySelectorAll('a')

      for $link in $links
          $link.addEventListener('click', @onSelect)





   onSelect: ( e ) =>

      ########################################
      #|
      #|  @params {MouseEvent} e
      #|
      ########################################

      href = e.target.getAttribute('href')

      if href[0] is '#'
         @emit('select', href.slice(1))
      else
         @emit('reload', href)

      e.preventDefault()





   active: ( id ) =>

      ########################################
      #|
      #|  @params {MouseEvent} e
      #|
      ########################################

      for $el in document.querySelectorAll('summary .active')
          $el.classList.remove('active')

      $link = document.querySelector("summary a[href=\"##{id}\"]")

      if $link
         $link.classList.add('active')                        # <a>
         $link.parentNode.classList.add('active')             # <li>
         $link.parentNode.parentNode.classList.add('active')  # <ul>





   scroll: ( id ) =>

      $side = document.querySelector('side')
      $link = document.querySelector("summary a[href=\"##{id}\"]")

      if $link

         top    = $link.getBoundingClientRect().top
         bottom = $link.getBoundingClientRect().bottom

         if top + 200 > window.innerHeight
            $side.scrollBy( 0, top + 200 - window.innerHeight )

         else if bottom < 200
            $side.scrollBy( 0, bottom - 200 )