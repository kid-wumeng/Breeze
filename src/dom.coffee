util = require('./util')



$app  = document.createElement('app')
$side = document.createElement('side')
$main = document.createElement('main')



currentHash = ''
headings = []  # [{ top, hash }]



navigator = null



exports.init = =>

   $main.style['min-height'] = window.innerHeight + 'px'

   document.body.appendChild($app)

   $app.appendChild($side)
   $app.appendChild($main)




exports.render404 = =>

   $app.innerHTML = "<not-found>404</not-found>"





exports.renderMain = ( article ) =>

   $main.innerHTML = article.html()

   initHeadingTops()





exports.renderSide = ( navigato ) =>

   $side.appendChild( navigato.dom() )

   navigator = navigato

   navigator.on 'scroll', ( distance ) =>

      console.log distance

      $side.scrollBy(0, distance)






initHeadingTops = =>

   headings = []

   $headings = document.querySelectorAll('content h1, content h2, content h3')

   for $heading in $headings

      text = $heading.innerText
      top  = $heading.offsetTop

      hash = util.hash( text )

      headings.push({
         hash: hash
         top:  top
      })





onScroll = ( event ) =>

   top = document.documentElement.scrollTop or document.body.scrollTop

   if top < headings[0].top
      return

   hash = ''

   for heading in headings
      if top >= heading.top
         hash = heading.hash
      else
         break

   if currentHash isnt hash
      currentHash = hash
      history.replaceState( null, null, "##{hash}" )
      navigator.active( hash )



window.addEventListener('scroll', onScroll)