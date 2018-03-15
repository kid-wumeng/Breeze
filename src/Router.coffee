exports.redirect = ( href ) =>

   ########################################
   #|
   #|  @params {string} href
   #|
   ########################################

   if href is '#'
      history.replaceState( null, null, '/' )
   else
      history.replaceState( null, null, href )
