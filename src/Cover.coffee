ObservableObject = require('./ObservableObject')
util             = require('./util')



module.exports = class Cover extends ObservableObject



   constructor: ( html ) ->

      super()

      @html = html
      @$dom = null

      @render()





   render: =>

      $raw  = util.element('cover', @html)
      $wrap = util.element('.wrap')

      @renderLogo( $raw, $wrap )
      @renderName( $raw, $wrap )
      @renderDescs( $raw, $wrap )
      @renderItems( $raw, $wrap )
      @renderButtons( $raw, $wrap )

      @$dom = util.element('#cover')
      @$dom.appendChild( $wrap )





   renderLogo: ( $raw, $wrap ) =>

      $logo = $raw.querySelector('logo')

      if $logo

         src = $logo.getAttribute('src')

         $logo = util.element('img.logo')
         $logo.setAttribute('src', src)

         $wrap.appendChild($logo)





   renderName: ( $raw, $wrap ) =>

      $name = $raw.querySelector('name')

      if $name

         name    = $name.innerText
         version = $name.getAttribute('version') ? ''

         $name    = util.element('.name', name)
         $version = util.element('.version', version)

         $name.appendChild($version)
         $wrap.appendChild($name)





   renderDescs: ( $raw, $wrap ) =>

      $descs = $raw.querySelectorAll('desc')

      if $descs.length

         $ul = util.element('ul.descs')

         for $desc in $descs
             $li = util.element('li', $desc.innerText)
             $ul.appendChild($li)

         $wrap.appendChild($ul)





   renderItems: ( $raw, $wrap ) =>

      $items = $raw.querySelectorAll('item')

      if $items.length

         $ul = util.element('ul.items')

         for $item in $items
             $li = util.element('li', $item.innerText)
             $ul.appendChild($li)

         $wrap.appendChild($ul)





   renderButtons: ( $raw, $wrap ) =>

      $buttons = $raw.querySelectorAll('button')

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