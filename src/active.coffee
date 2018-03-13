module.exports = ( href ) =>

   $link = document.querySelector("summary a[href=\"#{href}\"]")

   removeClass()

   if $link

      addClass( $link )
      adjustScroll( $link )





removeClass = ( $link ) =>

   ########################################
   #|
   #|  Remove .active from the old-item.
   #|
   ########################################

   for $el in document.querySelectorAll('summary .active')
       $el.classList.remove('active')





addClass = ( $link ) =>

   ########################################
   #|
   #|  Add .active to the new-item.
   #|
   ########################################

   $link.classList.add('active')                        # <a>
   $link.parentNode.classList.add('active')             # <li>
   $link.parentNode.parentNode.classList.add('active')  # <ul>





adjustScroll = ( $link ) =>

   $side  = document.querySelector('side')

   top    = $link.getBoundingClientRect().top
   bottom = $link.getBoundingClientRect().bottom

   if top + 200 > window.innerHeight
      $side.scrollBy( 0, top + 200 - window.innerHeight )

   else if bottom < 200
      $side.scrollBy( 0, bottom - 200 )