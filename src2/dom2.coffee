util = require('./util')



$app  = document.createElement('app')
$side = document.createElement('side')
$main = document.createElement('main')



currentHash = ''
headings = []  # [{ top, hash }]



navigator = null






exports.renderSide = ( navigato ) =>

   $side.appendChild( navigato.dom() )

   navigator = navigato

   navigator.on 'scroll', ( distance ) =>

      console.log distance

      $side.scrollBy(0, distance)







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