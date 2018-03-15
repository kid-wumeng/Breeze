module.exports = ( $article ) =>

   top      = document.documentElement.scrollTop or document.body.scrollTop
   headings = $article.headings
   hash     = ''

   for heading in headings
      if top >= heading.top
         hash = heading.hash
      else
         break

   return hash