util = require('./util')



module.exports = class Cover

   ########################################
   #/
   #/   Be responsible for rendering cover's dom.
   #/
   ########################################





   constructor: ( html ) ->

      ########################################
      #/
      #/   @params {string} html
      #/
      ########################################

      @html = html





   render: =>

      $model = util.createElement('model', @html)
      $cover = util.createElement('#cover')
      $wrap  = util.createElement('.wrap')

      $logo    = $model.querySelector('logo')
      $name    = $model.querySelector('name')
      $descs   = $model.querySelectorAll('desc')
      $items   = $model.querySelectorAll('item')
      $buttons = $model.querySelectorAll('button')

      $logo    = @_renderLogo( $logo )
      $name    = @_renderName( $name )
      $descs   = @_renderDescs( $descs )
      $items   = @_renderItems( $items )
      $buttons = @_renderButtons( $buttons )

      $wrap.appendChild( $logo )  if $logo
      $wrap.appendChild( $name )  if $name
      $wrap.appendChild( $descs ) if $descs
      $wrap.appendChild( $items ) if $items
      $wrap.appendChild( $buttons ) if $buttons

      $cover.appendChild( $wrap )

      return $cover





   _renderLogo: ( $logo ) =>

      ########################################
      #/
      #/   @params {HTMLElement} $logo
      #/   @return {HTMLElement} $logo
      #/
      ########################################

      if $logo

         src = $logo.getAttribute('src')
         src = util.formatPath(src)

         $logo = util.createElement('img.logo')
         $logo.setAttribute('src', src)

      return $logo





   _renderName: ( $name ) =>

      ########################################
      #/
      #/   @params {HTMLElement} $name
      #/   @return {HTMLElement} $name
      #/
      ########################################

      if $name

         name    = $name.innerText
         version = $name.getAttribute('version') ? ''

         $name    = util.createElement('.name', name)
         $version = util.createElement('.version', version)

         $name.appendChild($version)

      return $name





   _renderDescs: ( $descs ) =>

      ########################################
      #/
      #/   @params {NodeList}    $descs
      #/   @return {HTMLElement} $descs
      #/
      ########################################

      if $descs.length

         $ul = util.createElement('ul.descs')

         for $desc in $descs
             $li = @_renderDesc($desc)
             $ul.appendChild($li)

         return $ul

      else
         return null





   _renderDesc: ( $desc ) =>

      ########################################
      #/
      #/   @params {HTMLElement} $desc
      #/   @return {HTMLElement} $desc
      #/
      ########################################

      return util.createElement('li', $desc.innerText)





   _renderItems: ( $items ) =>

      ########################################
      #/
      #/   @params {NodeList}    $items
      #/   @return {HTMLElement} $items
      #/
      ########################################

      if $items.length

         $ul = util.createElement('ul.items')

         for $item in $items
             $li = @_renderItem($item)
             $ul.appendChild($li)

         return $ul

      else
         return null





   _renderItem: ( $item ) =>

      ########################################
      #/
      #/   @params {HTMLElement} $item
      #/   @return {HTMLElement} $item
      #/
      ########################################

      return util.createElement('li', $item.innerText)





   _renderButtons: ( $buttons ) =>

      ########################################
      #/
      #/   @params {NodeList}    $buttons
      #/   @return {HTMLElement} $buttons
      #/
      ########################################

      if $buttons.length

         $ul = util.createElement('ul.buttons')

         for $button in $buttons
             $li = @_renderButton($button)
             $ul.appendChild($li)

         return $ul

      else
         return null





   _renderButton: ( $button ) =>

      ########################################
      #/
      #/   @params {HTMLElement} $button
      #/   @return {HTMLElement} $button
      #/
      ########################################

      $li = util.createElement('li')
      $a  = util.createElement('a', $button.innerText)

      if $button.hasAttribute('active')
         $li.classList.add('active')
         $a.classList.add('active')

      if href = $button.getAttribute('href')
         $a.setAttribute('href', href)

      $li.appendChild($a)

      return $li





   _onClickButton: ( e ) =>

      href = e.target.getAttribute('href')

      if href[0] is '#'

         @$dom.style.display = 'none'