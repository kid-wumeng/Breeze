module.exports = ( hash ) =>

   ########################################
   #|
   #|  @params {string} hash
   #|
   ########################################

   if hash
      href = '#' + hash
   else
      href = '/'

   history.replaceState(null, null, href)