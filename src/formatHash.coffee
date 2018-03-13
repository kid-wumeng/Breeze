module.exports = ( text, prefix = '#' ) =>

   ########################################
   #|
   #|  @params {string} text
   #|  @params {string} prefix
   #|  @return {string} hash
   #|
   #|  'Quick Start' => '#Quick-Start'
   #|
   ########################################

   return prefix + text.replace(/\s+/g, '-')