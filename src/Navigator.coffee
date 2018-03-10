marked           = require('marked')
ObservableObject = require('./ObservableObject')



module.exports = class Navigator extends ObservableObject



   constructor: ( summary ) ->

      ########################################
      #|
      #|  @params {string} summary
      #|
      ########################################

      super()

      @_summary = summary

      @_$dom    = null

      @tops     = []





   innerHTML: =>

      ########################################
      #|
      #|  @return {string} innerHTML
      #|
      ########################################

      summary = @_summary.replace(/\n+/g, '\n')

      return marked(summary, {

      })





   html: =>

      ########################################
      #|
      #|  @return {string} html
      #|
      ########################################

      return '<nav>' + @innerHTML() + '</nav>'





   dom: =>

      $nav = document.createElement('nav')
      $nav.innerHTML = @innerHTML()

      @_removeLv4_6( $nav )

      @_setClass( $nav )

      @_bindEvent( $nav )

      @_$nav = $nav

      return $nav




   _removeLv4_6: ( $nav ) =>

      $lv4s = $nav.querySelectorAll('nav > ul > li > ul > li > ul > li > ul')

      for $lv4 in $lv4s
          $lv4.parentNode.removeChild($lv4)





   _setClass: ( $nav ) =>

      $lv1.classList.add('lv1') for $lv1 in $nav.querySelectorAll('nav > ul')
      $lv2.classList.add('lv2') for $lv2 in $nav.querySelectorAll('nav > ul > li > ul')
      $lv3.classList.add('lv3') for $lv3 in $nav.querySelectorAll('nav > ul > li > ul > li > ul')

      $lv1.classList.add('lv1') for $lv1 in $nav.querySelectorAll('nav > ul > li')
      $lv2.classList.add('lv2') for $lv2 in $nav.querySelectorAll('nav > ul > li > ul > li')
      $lv3.classList.add('lv3') for $lv3 in $nav.querySelectorAll('nav > ul > li > ul > li > ul > li')

      $lv1.classList.add('lv1') for $lv1 in $nav.querySelectorAll('nav > ul > li > a')
      $lv2.classList.add('lv2') for $lv2 in $nav.querySelectorAll('nav > ul > li > ul > li > a')
      $lv3.classList.add('lv3') for $lv3 in $nav.querySelectorAll('nav > ul > li > ul > li > ul > li > a')





   _bindEvent: ( $nav ) =>

      $links = $nav.querySelectorAll('a')
      click  = @_click.bind(@, $nav)

      for $link in $links
          $link.addEventListener('click', click)





   _click: ( $nav, e ) =>

      $this = e.target

      for $el in $nav.querySelectorAll('.active')
          $el.classList.remove('active')

      $this.classList.add('active')                        # <a>
      $this.parentNode.classList.add('active')             # <li>
      $this.parentNode.parentNode.classList.add('active')  # <ul>



   getTops: =>

      @_tops = []

      $links = @_$nav.querySelectorAll('a')

      for $link in $links
         hash = $link.getAttribute('href').slice(1)
         top  = $link.getBoundingClientRect().top

         @_tops.push({ hash, top })





   active: ( hash ) =>

      for $el in @_$nav.querySelectorAll('.active')
          $el.classList.remove('active')

      $link = @_$nav.querySelector("a[href=\"##{hash}\"]")

      $link.classList.add('active')                        # <a>
      $link.parentNode.classList.add('active')             # <li>
      $link.parentNode.parentNode.classList.add('active')  # <ul>


      top    = $link.getBoundingClientRect().top
      bottom = $link.getBoundingClientRect().bottom

      if top > window.innerHeight

         @_emit('scroll', top - window.innerHeight)

      if bottom < 0
         @_emit('scroll', bottom - 80)