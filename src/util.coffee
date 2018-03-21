exports.id = ( order, text = '' ) =>

   ########################################
   #|
   #|  @params {string} order
   #|  @params {string} text
   #|  @return {string} id
   #|
   ########################################

   text = text.replace(/\s+/g, '-')

   if text
      return order + '-' + text
   else
      return order