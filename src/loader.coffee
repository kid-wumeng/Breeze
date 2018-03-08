exports.get = ( path, done, fail ) =>

   try
      xhr = new XMLHttpRequest()

   catch e
      try
         xhr = new ActiveXObject("Msxml2.XMLHTTP")    # IE 7+
      catch e
         xhr = new ActiveXObject("Microsoft.XMLHTTP") # IE 5+


   xhr.onreadystatechange = ->

      if xhr.readyState is 4

         if xhr.status is 200
            done( xhr.responseText )

         else
            fail( xhr.status )


   xhr.open('GET', path, true)
   xhr.send(null)