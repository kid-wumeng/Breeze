########################################
#|
#|  Be responsible for compile the jade-like text to html.
#|  For example,
#|
#|  item        =>  <item>
#|    name ...  =>    <name>...</name>
#|    type ...  =>    <type>...</type>
#|    desc ...  =>    <desc>...</desc>
#|              =>  </item>
#|
#|  @public
#|     compile( jade )
#|
########################################





exports.compile = ( jade ) =>

   ########################################
   #|
   #|  @params {string} jade
   #|  @return {string} html
   #|
   ########################################

   lines = linesParse(jade)
   nodes = nodesParse(lines)
   tree  = treeParse(nodes)
   html  = htmlParse(tree)

   return html





linesParse = ( jade ) =>

   ########################################
   #|
   #|  @params {string}   jade
   #|  @return {string[]} lines
   #|
   ########################################

   return jade.split(/\n+/g)





nodesParse = ( lines ) =>

   ########################################
   #|
   #|  @params {string[]} lines
   #|  @return {object[]} nodes
   #|
   ########################################

   nodes = []

   for line in lines

      isEmpty = /^\s*$/.test( line )

      if !isEmpty
         node = nodeParse( line )
         nodes.push( node )

   return nodes





nodeParse = ( line ) =>

   ########################################
   #|
   #|  @params {string} line
   #|  @return {object} node { deep, tag, attr, text }
   #|
   ########################################

   { deep, rest } = deepParse( line )
   { tag,  rest } = tagParse( rest )
   { attr, rest } = attrParse( rest )
   { text, rest } = textParse( rest )

   return { deep, tag, attr, text }





deepParse = ( line ) =>

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





tagParse = ( rest ) =>

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





attrParse = ( rest ) =>

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





textParse = ( rest ) =>

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





treeParse = ( nodes ) =>

   ########################################
   #|
   #|  @params {object[]} nodes
   #|  @return {object} tree
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





htmlParse = ( tree ) =>

   ########################################
   #|
   #|  @params {object} tree
   #|  @return {string} html
   #|
   ########################################

   html = ''

   each = ( node ) =>

      { tag, attr, text, children } = node

      if children

         if tag
            html += "<#{tag} #{attr}>\n"

         for child in children
            each(child)

         if tag
            html += "</#{tag}>\n"

      else
         html += "<#{tag} #{attr}>#{text}</#{tag}>\n"

   each( tree )

   return html