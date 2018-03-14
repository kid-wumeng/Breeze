module.exports = ( hash ) =>

   ########################################
   #|
   #|  @params {string} hash
   #|
   ########################################

   headings = document.querySelector('article').headings

   for heading in headings
      if heading.hash is hash
         window.scrollTo( 0, heading.top )
         return

   window.scrollTo( 0, 0 )