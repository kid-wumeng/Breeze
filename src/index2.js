;(function(){


   function ajax( path, callback )
   {
      var xhr = new XMLHttpRequest()

      xhr.open('GET', path, true)
      xhr.send()

      xhr.onreadystatechange = function()
      {
         if( xhr.readyState === 4 && xhr.status === 200 )
            callback(xhr.responseText)
      }
   }


   ajax('../docs/README.md', function(data){
      console.log(data);
   })


   


})()