formatHash = require('./formatHash')



module.exports = ({ $article, html }) =>

   ########################################
   #|
   #|  Render article dom.
   #|
   #|  @params { $article, html }
   #|
   ########################################

   $article.innerHTML = html
   $article.headings  = getHeadings( $article )





getHeadings = ( $article ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $article
   #|  @return {object[]}    headings { text, hash, top }
   #|
   #|  Redirect to a new page or hash.
   #|
   ########################################

   $headings = $article.querySelectorAll('h1, h2, h3')

   headings = []

   for $heading in $headings

      text = $heading.innerText
      top  = $heading.offsetTop

      hash = formatHash( text )

      headings.push({ text, hash, top })

   return headings