formatHash = require('./formatHash')



module.exports = ({ $article, html }) =>

   ########################################
   #|
   #|  Render $article.
   #|
   #|  @params { $article, html }
   #|
   ########################################

   $article.innerHTML = html

   wrapParams( $article )
   bindHeadings( $article )





wrapParams = ( $article ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $article
   #|
   ########################################

   $params = $article.querySelectorAll('params')

   for $param in $params
      wrapParam( $param )





wrapParam = ( $param ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $param
   #|
   ########################################

   $items = $param.querySelectorAll('item')

   for $item in $items
      wrapParamItem( $item )





wrapParamItem = ( $item ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $item
   #|
   ########################################

   $left  = document.createElement('left')
   $right = document.createElement('right')

   $leftChildren  = $item.querySelectorAll('item > :not(desc)')
   $rightChildren = $item.querySelectorAll('item > desc')

   for $child in $leftChildren
      $left.appendChild($child)

   for $child in $rightChildren
      $right.appendChild($child)

   $item.appendChild($left)
   $item.appendChild($right)





bindHeadings = ( $article ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $article
   #|
   ########################################

   $headings = $article.querySelectorAll('h1, h2, h3')

   headings = []

   for $heading in $headings

      text = $heading.innerText
      top  = $heading.parentNode.getBoundingClientRect().top

      hash = formatHash( text )

      headings.push({ text, hash, top })

   $article.headings = headings