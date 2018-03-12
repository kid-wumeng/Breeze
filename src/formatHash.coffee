module.exports = ( text ) =>

   ########################################
   #|
   #|  @params {string} text
   #|  @params {string} hash
   #|
   #|  'Quick Start' => 'Quick-Start'
   #|
   ########################################

   return text.replace(/\s+/g, '-')