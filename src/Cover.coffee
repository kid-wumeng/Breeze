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

      $model = util.createElement('cover', @html)

      $logo  = $model.querySelector('logo')
      $name  = $model.querySelector('name')
      $descs = $model.querySelectorAll('desc')
      $items = $model.querySelectorAll('item')
      $links = $model.querySelectorAll('link')

      $logo  = @_renderLogo($logo)
      $name  = @_renderName($name)
      $descs = @_renderDescs($descs)
      $items = @_renderItems($items)
      $links = @_renderLinks($links)

      console.log $links





      $wrap = util.createElement('.wrap')


      # @renderLogo( $model, $wrap )
      # @renderName( $model, $wrap )
      # @renderDescs( $model, $wrap )
      # @renderItems( $model, $wrap )
      # @renderButtons( $model, $wrap )
      #
      # @$dom = util.element('#cover')
      # @$dom.appendChild( $wrap )





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





   _renderLinks: ( $links ) =>

      ########################################
      #/
      #/   @params {NodeList}    $links
      #/   @return {HTMLElement} $links
      #/
      ########################################

      if $links.length

         $ul = util.createElement('ul.links')

         for $link in $links
             $li = @_renderLink($link)
             $ul.appendChild($li)

         return $ul

      else
         return null





   _renderLink: ( $link ) =>

      ########################################
      #/
      #/   @params {HTMLElement} $link
      #/   @return {HTMLElement} $link
      #/
      ########################################

      $li = util.createElement('li')
      $a  = util.createElement('a', $link.innerText)

      if $link.hasAttribute('active')
         $li.classList.add('active')
         $a.classList.add('active')

      if href = $link.getAttribute('href')
         $a.setAttribute('href', href)
         # $a.addEventListener('click', @onClickButton)

      $li.appendChild($a)

      return $li







   renderButtons: ( $model, $wrap ) =>

      $buttons = $model.querySelectorAll('button')

      if $buttons.length

         $ul = util.element('ul.buttons')

         for $button in $buttons

             $li = util.element('li')
             $a  = util.element('a', $button.innerText)

             if $button.hasAttribute('active')
                $li.classList.add('active')
                $a.classList.add('active')

             if href = $button.getAttribute('href')
                $a.setAttribute('href', href)
                $a.addEventListener('click', @onClickButton)

             $li.appendChild($a)
             $ul.appendChild($li)

         $wrap.appendChild($ul)





   onClickButton: ( e ) =>

      href = e.target.getAttribute('href')

      if href[0] is '#'
         @$dom.style.display = 'none'