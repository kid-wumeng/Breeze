$app  = document.createElement('app')
$side = document.createElement('side')
$main = document.createElement('main')




exports.init = =>

   $main.style['min-height'] = window.innerHeight + 'px'

   document.body.appendChild($app)

   $app.appendChild($side)
   $app.appendChild($main)

   for i in [0...60]
     d = document.createElement('div')
     d.innerText = 'item' + i
     $side.appendChild(d)




exports.render404 = =>

   $app.innerHTML = "<not-found>404</not-found>"




exports.renderArticle = ( html ) =>

   $main.innerHTML = html