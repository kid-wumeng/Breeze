########################################
#|
#|  Be responsible for managing dom tree.
#|
#|  @public
#|     ready()
#|     renderSummary( $summary )
#|     renderArticle( $article )
#|
########################################

$app     = document.createElement('app')
$side    = document.createElement('side')
$main    = document.createElement('main')
$summary = document.createElement('summary')
$article = document.createElement('article')






exports.ready = =>

   ########################################
   #|
   #|  @web-only
   #|  Initialize the dom tree.
   #|
   ########################################

   $app.appendChild($main)
   $app.appendChild($side)

   $side.appendChild($summary)
   $main.appendChild($article)

   document.body.appendChild($app)





exports.renderSummary = ( $newSummary ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $newSummary
   #|
   ########################################

   $side.replaceChild( $newSummary, $summary )
   $summary = $newSummary





exports.renderArticle = ( $newArticle ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $newArticle
   #|
   ########################################

   $main.replaceChild( $newArticle, $article )
   $article = $newArticle