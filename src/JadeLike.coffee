module.exports = class JadeLike


  ########################################
  #|
  #|  Be responsible for parsing the jade-like text to html.
  #|
  ########################################



   constructor: ( text ) ->

      @_text = text
      @_tree = {}
      @_html = ''

      @_line = ''

      @_treeParse()
      @_htmlParse()

      console.log @_html
      console.log @_tree




   _htmlParse: =>

      each = ( node ) =>

         { tag, attr, text, children } = node

         if children

            if tag
               @_html += "<#{tag} #{attr}>\n"

            for child in children
               each(child)

            if tag
               @_html += "</#{tag}>\n"

         else
            @_html += "<#{tag} #{attr}>#{text}</#{tag}>\n"

      each(@_tree)





   _treeParse: =>

      tree = @_tree
      deep = -1

      nodes = @_nodesParse()

      for node in nodes

         if node.deep > deep
            tree.children ?= []
            tree.children.push(node)

         else if node.deep is deep
            tree.parent.children.push(node)

         else if node.deep < deep

            while node.deep <= tree.deep
               tree = tree.parent

            tree.children.push(node)

         node.parent = tree
         tree = node
         deep = node.deep





   _nodesParse: =>

      ########################################
      #|
      #|  @return {object[]} nodes [{deep, tag, attrs, text}, ...]
      #|
      ########################################

      nodes = []
      lines = @_text.split(/\n+/g)

      for line in lines

         isEmpty = /^\s*$/.test(line)

         if !isEmpty
            node = @_lineParse(line)
            nodes.push(node)

      return nodes





   _lineParse: ( line ) =>

      ########################################
      #|
      #|  @params {string} line
      #|  @return {object} node {deep, tag, attr, text}
      #|
      ########################################

      @_line = line

      deep = @_deepParse()
      tag  = @_tagParse()
      attr = @_attrParse()
      text = @_textParse()

      return { deep, tag, attr, text }




   _deepParse: =>

      ########################################
      #|
      #|  @return {number} deep
      #|
      ########################################

      deep = 0

      @_line = @_line.replace /^\s+/, (match) =>
         deep = match.length
         return ''

      return deep




   _tagParse: =>

      ########################################
      #|
      #|  @return {string} tag
      #|
      ########################################

      tag = ''

      @_line = @_line.replace /^([A-Za-z0-9_\-]+)\s*/, ( _, match ) =>
         tag = match
         return ''

      if tag
         return tag
      else
         throw "Unknown jade-like syntax: #{@_line}"





   _attrParse: =>

      ########################################
      #|
      #|  @return {string} attr
      #|
      ########################################

      attr = ''

      @_line = @_line.replace /^\(([^)]*)\)/, ( _, match ) =>

         attr = match.replace(/(^\s+)|(\s+$)/g, '')

      return attr





   _textParse: =>

      ########################################
      #|
      #|  @return {string} text
      #|
      ########################################

      return @_line.replace(/(^\s+)|(\s+$)/g, '')