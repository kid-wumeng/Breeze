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

      @tops = []





   innerHTML: =>

      ########################################
      #|
      #|  @return {string} innerHTML
      #|
      ########################################

      summary = @_summary.replace(/\n+/g, '\n')

      return marked(summary)




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