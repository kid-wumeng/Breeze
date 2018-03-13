module.exports = ( href ) =>

   ########################################
   #|
   #|  Active summary's item is related to href.
   #|
   ########################################

   for $el in document.querySelectorAll('summary .active')
       $el.classList.remove('active')


   $link = document.querySelector("summary a[href=\"#{href}\"]")

   if $link
      $link.classList.add('active')                        # <a>
      $link.parentNode.classList.add('active')             # <li>
      $link.parentNode.parentNode.classList.add('active')  # <ul>