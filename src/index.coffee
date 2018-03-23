Page = require('./Page')



pages = {}



load = =>

   href = location.href

   if pages[ href ]
      page = pages[ href ]
      page.render()

   else
      page = new Page
      pages[ href ] = page

      page.on 'reload', ( hash ) =>
         hash = '#/' + hash
         hash = hash.replace(/\/+/, '/')
         history.pushState(null, null, hash)
         load()



window.addEventListener('load', load)
window.addEventListener('hashchange', load)