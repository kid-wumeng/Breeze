module.exports = class Jade

########################################
#|
#|  Compile the jade-like to html.
#|  For example,
#|
#|
#|  item        =>  <item>
#|    name ...  =>    <name>...</name>
#|    type ...  =>    <type>...</type>
#|    desc ...  =>    <desc>...</desc>
#|              =>  </item>
#|
########################################



   constructor: ( jade ) ->

      @jade = jade
      @html = ''

      @compile(@parseTree(@parseNodes()))





   parseNodes: =>

      ########################################
      #|
      #|  @return {object[]} nodes
      #|
      ########################################

      nodes = []
      lines = @jade.split(/\n+/g)

      for line in lines

         isEmpty = /^\s*$/.test( line )

         if !isEmpty
            node = @parseNode( line )
            nodes.push( node )

      return nodes





   parseNode: ( line ) =>

      ########################################
      #|
      #|  @params {string} line
      #|  @return {object} node { deep, tag, attr, text }
      #|
      ########################################

      { deep, rest } = @parseDeep( line )
      { tag,  rest } = @parseTag( rest )
      { attr, rest } = @parseAttr( rest )
      { text, rest } = @parseText( rest )

      return { deep, tag, attr, text }





   parseDeep: ( line ) =>

      ########################################
      #|
      #|  @params {string} line
      #|  @return {object} data
      #|          {number} data.deep
      #|          {string} data.rest
      #|
      ########################################

      deep = 0
      deepReg = /^\s+/

      rest = line.replace deepReg, ( match ) =>
         deep = match.length
         return ''

      return { deep, rest }





   parseTag: ( rest ) =>

      ########################################
      #|
      #|  @params {string} rest
      #|  @return {object} data
      #|          {string} data.tag
      #|          {string} data.rest
      #|
      #|  @errors when parse failed.
      #|
      ########################################

      tag    = ''
      tagReg = /^([A-Za-z0-9_\-]+)\s*/

      rest = rest.replace tagReg, ( _, match ) =>
         tag = match
         return ''

      if tag
         return { tag, rest }
      else
         throw "Unknown jade-like syntax: #{@_line}"





   parseAttr: ( rest ) =>

      ########################################
      #|
      #|  @params {string} rest
      #|  @return {object} data
      #|          {string} data.attr
      #|          {string} data.rest
      #|
      ########################################

      attr    = ''
      attrReg = /^\(([^)]*)\)/

      rest = rest.replace attrReg, ( _, match ) =>
         attr = match.trim()
         return ''

      return { attr, rest }




    parseText: ( rest ) =>

      ########################################
      #|
      #|  @params {string} rest
      #|  @return {object} data
      #|          {string} data.text
      #|          {string} data.rest
      #|
      ########################################

      text = rest.trim()
      rest = ''

      return { text, rest }





   parseTree: ( nodes ) =>

      ########################################
      #|
      #|  @params {object[]} nodes
      #|  @return {object}   tree
      #|
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





   compile: ( tree ) =>

      ########################################
      #|
      #|  @params {object} tree
      #|  @return {string} html
      #|
      ########################################

      each = ( node ) =>

         { tag, attr, text, children } = node

         if children

            if tag
               @html += "<#{tag} #{attr}>\n"

            for child in children
               each(child)

            if tag
               @html += "</#{tag}>\n"

         else
            @html += "<#{tag} #{attr}>#{text}</#{tag}>\n"

      each( tree )