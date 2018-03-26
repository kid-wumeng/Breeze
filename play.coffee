DOM = require('./src/DOM.node')



html ="""
   <div class="wrap" abc>
      www
      <h1 age="18">KID</h1>
      <h1>KID2</h1>
   </div>
"""

html2 ="""
   <del>gffff</del>
"""


dom = new DOM( html )
dom2 = new DOM( html2 )


console.log dom.html('<p></p>').append(dom2).htmlSelf()

console.log dom2.htmlSelf()