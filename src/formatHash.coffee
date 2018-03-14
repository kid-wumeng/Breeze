module.exports = ( text ) =>

   ########################################
   #|
   #|  @params {string} text
   #|  @params {string} prefix
   #|  @return {string} hash
   #|
   #|  'Quick Start' => '#Quick-Start'
   #|
   ########################################

   if text
      return '#' + text.replace(/\s+/g, '-')
   else
      return '/'