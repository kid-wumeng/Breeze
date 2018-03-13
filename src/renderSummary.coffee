redirect = require('./redirect')



module.exports = ( $summary, html)  =>

   ########################################
   #|
   #|  Render summary dom.
   #|
   #|  @params {HTTPElement} $summary
   #|  @params {string}      html
   #|
   ########################################

   $summary.innerHTML = html

   removeLv4($summary)
   setClass($summary)
   bindEvent($summary)





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
       $link.addEventListener('click', click)



click = ( event ) =>

   href = event.target.getAttribute('href')
   redirect( href )