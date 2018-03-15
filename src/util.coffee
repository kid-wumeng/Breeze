exports.id = ( text ) =>

   ########################################
   #|
   #|  @params {string} text
   #|  @return {string} hash
   #|
   #|  'Quick Start' => 'Quick-Start'
   #|
   ########################################

   return text.replace(/\s+/g, '-')