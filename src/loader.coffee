exports.get = ( path, done, fail ) =>

   xhr = new XMLHttpRequest

   xhr.onreadystatechange = ->

      if xhr.readyState is 4

         if xhr.status is 200
            done( xhr.responseText )

         else
            fail( xhr.status )


   xhr.open('GET', path, true)
   xhr.send(null)