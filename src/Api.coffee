util = require('./util')



module.exports = class API



   constructor: ( $raw ) ->

      @_$raw = $raw




   render: =>

      $api   = util.element('.api')
      $items = @_$raw.querySelectorAll('item')

      for $item in $items
          $item = @renderItem( $item )
          $api.appendChild( $item )

      return $api





   renderItem: ( $item ) =>

      $name = $item.querySelector('name')
      $type = $item.querySelector('type')
      $desc = $item.querySelector('desc')

      $left  = util.element('.left')
      $right = util.element('.right')

      if $name
         $name = util.element('.name', $name.innerHTML)
         $left.appendChild( $name )

      if $type
         $type = util.element('.type', $type.innerHTML)
         $left.appendChild( $type )

      if $desc
         $desc = util.element('.desc', $desc.innerHTML)
         $right.appendChild( $desc )

      $item = util.element('.item')
      $item.appendChild( $left )
      $item.appendChild( $right )

      return $item