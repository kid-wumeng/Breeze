module.exports = class Jade

   ########################################
   #/
   #/   Be responsible for compiling the jade-like to html.
   #/   For example,
   #/
   #/   ul(start="1")  =>  <ul start="1">
   #/     li ...       =>    <li>...</li>
   #/                  =>  </ul>
   #/
   ########################################



   constructor: ( text ) ->

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      @text = text





   compile: =>

      ########################################
      #/
      #/   @return {string} html
      #/
      ########################################

      nodes = @_parseNodes( @text )
      tree  = @_parseTree( nodes )
      html  = @_compile( tree )

      return html





   _parseNodes: ( text ) =>

      ########################################
      #/
      #/   @params {string}   text
      #/   @return {object[]} nodes - [{ deep, tag, attr, text }]
      #/
      ########################################

      lines = text.split(/\n+/g)

      nodes = lines.map ( line ) =>
         if line.trim() then @_parseNode(line) else null

      nodes = nodes.filter (node) => node

      return nodes





   _parseNode: ( line ) =>

      ########################################
      #/
      #/   @params {string} line
      #/   @return {object} {number} deep
      #/                    {string} tag
      #/                    {string} attr
      #/                    {string} text
      #/
      ########################################

      { deep, rest } = @_parseDeep( line )
      { tag,  rest } = @_parseTag( rest )
      { attr, rest } = @_parseAttr( rest )
      { text, rest } = @_parseText( rest )

      return { deep, tag, attr, text }





   _parseDeep: ( line ) =>

      ########################################
      #/
      #/   @params {string} line
      #/   @return {object} {number} deep
      #/                    {string} rest
      #/
      ########################################

      deep = 0
      reg  = /^\s+/

      rest = line.replace reg, ( match ) =>
         deep = match.length
         return ''

      return { deep, rest }





   _parseTag: ( rest ) =>

      ########################################
      #/
      #/   @params {string} rest
      #/   @return {object} {string} tag
      #/                    {string} rest
      #/
      #/   @errors when parse failed.
      #/
      ########################################

      tag = ''
      reg = /^([A-Za-z0-9_\-]+)\s*/

      rest = rest.replace reg, ( _, match ) =>
         tag = match
         return ''

      if tag
         return { tag, rest }
      else
         throw "Unknown jade-like syntax: #{@_line}"





   _parseAttr: ( rest ) =>

      ########################################
      #/
      #/   @params {string} rest
      #/   @return {object} {string} attr
      #/                    {string} rest
      #/
      ########################################

      attr = ''
      reg  = /^\(([^)]*)\)/

      rest = rest.replace reg, ( _, match ) =>
         attr = match.trim()
         return ''

      return { attr, rest }





    _parseText: ( rest ) =>

      ########################################
      #/
      #/   @params {string} rest
      #/   @return {object} {string} text
      #/                    {string} rest
      #/
      ########################################

      text = rest.trim()
      rest = ''

      return { text, rest }





   _parseTree: ( nodes ) =>

      ########################################
      #/
      #/   @params {object[]} nodes
      #/   @return {object}   tree
      #/
      ########################################

      root = {}
      tree = root
      deep = -1

      for node in nodes

         if node.deep > deep
            tree.children ?= []
            tree.children.push(node)
            node.parent = tree
            tree = node
            deep = node.deep

         else if node.deep is deep
            tree.parent.children.push(node)
            node.parent = tree

         else if node.deep < deep

            while node.deep <= tree.deep
                  tree = tree.parent

            tree.children.push(node)
            node.parent = tree
            tree = node
            deep = node.deep

      return root





   _compile: ( node ) =>

      ########################################
      #/
      #/   @params {object} node - { tag, attr, text, children }
      #/   @return {string} html
      #/
      ########################################

      { tag, attr, text, children } = node

      start = if tag then "<#{tag} #{attr}>" else ''
      end   = if tag then "</#{tag}>"        else ''

      if children
         html = children.map(@_compile).join('')
         return start + html + end

      else
         return start + text + end