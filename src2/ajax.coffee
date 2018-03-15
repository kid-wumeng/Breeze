module.exports = ( path, done, fail ) =>

   ########################################
   #|
   #|  @params {string}   path
   #|  @params {function} done(text)
   #|  @params {function} fail(status)
   #|
   ########################################

   xhr = new XMLHttpRequest

   xhr.open('GET', path, true)
   xhr.send(null)

   xhr.onreadystatechange = =>

      if xhr.readyState is 4

         if xhr.status is 200
            done( xhr.responseText )

         else
            fail( xhr.status )