########################################
#|
#|  Be responsible for compile and create summary.
#|
#|  @public
#|     compile( markdown )
#|     dom( html )
#|
########################################

marked = require('marked')





exports.compile = ( markdown ) =>

   ########################################
   #|
   #|  @params {string} markdown
   #|  @return {string} html
   #|
   ########################################

   markdown = markdown.replace(/\n+/g, '\n')
   return marked( markdown )





exports.dom = ( html ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {string}      html
   #|  @return {HTMLElement} $summary
   #|
   ########################################

   $summary = document.createElement('summary')
   $summary.innerHTML = html

   removeLv4($summary)
   setClass($summary)
   bindEvent($summary)

   return $summary





removeLv4 = ( $summary ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $summary
   #|
   #|  Remove the lv4(~lv6) item.
   #|
   ########################################

   $lv4s = $summary.querySelectorAll('summary > ul > li > ul > li > ul > li > ul')

   for $lv4 in $lv4s
       $lv4.parentNode.removeChild($lv4)





setClass = ( $summary ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $summary
   #|
   #|  Set class .lv1, .lv2, .lv3 to item.
   #|
   ########################################

   $lv1.classList.add('lv1') for $lv1 in $summary.querySelectorAll('summary > ul')
   $lv2.classList.add('lv2') for $lv2 in $summary.querySelectorAll('summary > ul > li > ul')
   $lv3.classList.add('lv3') for $lv3 in $summary.querySelectorAll('summary > ul > li > ul > li > ul')

   $lv1.classList.add('lv1') for $lv1 in $summary.querySelectorAll('summary > ul > li')
   $lv2.classList.add('lv2') for $lv2 in $summary.querySelectorAll('summary > ul > li > ul > li')
   $lv3.classList.add('lv3') for $lv3 in $summary.querySelectorAll('summary > ul > li > ul > li > ul > li')

   $lv1.classList.add('lv1') for $lv1 in $summary.querySelectorAll('summary > ul > li > a')
   $lv2.classList.add('lv2') for $lv2 in $summary.querySelectorAll('summary > ul > li > ul > li > a')
   $lv3.classList.add('lv3') for $lv3 in $summary.querySelectorAll('summary > ul > li > ul > li > ul > li > a')





bindEvent = ( $summary ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $summary
   #|
   ########################################

   $links = $summary.querySelectorAll('a')

   for $link in $links
       $link.addEventListener('click', redirect)
       $link.addEventListener('click', active)





redirect = ( event ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {MouseEvent}
   #|
   #|  Redirect to a new page or hash.
   #|
   ########################################

   href = event.target.getAttribute('href')
   history.replaceState( null, null, href )

   event.preventDefault()





active = ( event ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {MouseEvent}
   #|
   #|  Add .active to click-link and remove from old.
   #|
   ########################################

   $link = event.target

   for $el in document.querySelectorAll('summary .active')
       $el.classList.remove('active')

   $link.classList.add('active')                        # <a>
   $link.parentNode.classList.add('active')             # <li>
   $link.parentNode.parentNode.classList.add('active')  # <ul>