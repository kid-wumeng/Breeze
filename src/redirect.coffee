module.exports = ( href ) =>

   ########################################
   #|
   #|  @params {string} href
   #|
   ########################################

   if !href
       href = '/'

   history.replaceState( null, null, href )