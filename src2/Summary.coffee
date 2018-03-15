marked = require('marked')
Helper = require('./Helper')





exports.compile = ( summary ) =>

   ########################################
   #|
   #|  Compile summary-markdown to html.
   #|
   #|  @params {string} summary-markdown
   #|  @return {string} summary-html
   #|
   ########################################

   return marked( summary )





exports.parse = ( sections ) =>

   ########################################
   #|
   #|  Create the article's summary by headings.
   #|
   #|  @params {object[]} sections
   #|  @return {string}   summary-markdown
   #|
   ########################################

   summary = ''

   headings = sections.map ( section ) => section.heading
   headings = headings.filter ( heading ) => heading

   for heading in headings
      summary += parseItem( heading )

   return summary





parseItem = ( heading ) =>

   ########################################
   #|
   #|  @params {object} heading - { lv, text }
   #|  @return {string} markdown-item
   #|
   #|  { lv:2, text: 'Quick Start' }
   #|
   #|  => '  * [Quick Start](#Quick-Start)'
   #|
   ########################################

   { lv, text } = heading

   count = lv
   space = ''

   while count > 1
      space += '  '
      count--

   return "#{space}* [#{text}](##{Helper.id(text)})\n"





exports.dom = ( html ) =>

   ########################################
   #|
   #|  @params {string} html
   #|
   ########################################

   $summary = document.createElement('summary')
   $summary.innerHTML = html

   removeLv4($summary)
   setClass($summary)
   bindClickEvent($summary)

   return $summary





removeLv4 = ( $summary ) =>

   ########################################
   #|
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




bindClickEvent = ( $summary ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $summary
   #|
   ########################################

   $links = $summary.querySelectorAll('a')

   for $link in $links

       $link.addEventListener 'click', (e) ->

          href = e.target.getAttribute('href')

          e.preventDefault()