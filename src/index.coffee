Page = require('./Page')
util = require('./util')



navigator = ''
pages     = {}




load = =>
   loadNavigator =>
      loadPage()




loadNavigator = ( callback ) =>

   if Breeze?.navigator

      if Breeze.navigator is true
         path = 'NAVIGATOR.md'
      else
         path = Breeze.navigator

      path = util.formatPath(path)

      util.ajax path, ( markdown ) =>
         navigator = markdown
         callback()

   else
      callback()






loadPage = =>

   href = location.href

   if pages[ href ]
      page = pages[ href ]
      page.render()

   else
      page = new Page( navigator )
      pages[ href ] = page

      page.on 'reload', ( hash ) =>
         hash = '#/' + hash
         hash = hash.replace(/\/+/, '/')
         history.pushState(null, null, hash)
         loadPage()





window.addEventListener('load', load)
window.addEventListener('hashchange', loadPage)