var Breeze = (function () {
'use strict';

var DOM;

var DOM_web = DOM = class DOM {
  //#######################################
  //|
  //|   new DOM( html )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       querying and operating dom ( html-string )
  //|
  //|    Adapted to the web environment ( browser-runtime )
  //|   -----------------------------------
  //|
  //|   dom.find( sel )          -> dom
  //|   dom.findAll( sel )       -> doms
  //|   dom.children()           -> doms
  //|
  //|   dom.htmlSelf( html )     -> dom
  //|   dom.htmlSelf()           -> html
  //|
  //|   dom.html( html )         -> this
  //|   dom.html()               -> html
  //|
  //|   dom.attr( name, value )  -> this
  //|   dom.attr( name )         -> value
  //|
  //|   dom.text( text )         -> this
  //|   dom.text()               -> text
  //|
  //|   dom.hasClass( name )     -> bool
  //|   dom.addClass( name )     -> this
  //|   dom.removeClass( name )  -> this
  //|
  //|   dom.append( child )      -> this
  //|
  //|
  //|   << The following methods exist only in web environment >>
  //|
  //|   dom.element()            -> root's $el
  //|   dom.val( value )         -> this
  //|   dom.val()                -> value
  //|   dom.parent()             -> dom
  //|   dom.css( name, value )   -> this
  //|   dom.width()              -> width
  //|   dom.height()             -> height
  //|   dom.top()                -> top
  //|   dom.bottom()             -> bottom
  //|   dom.isVisible()          -> bool
  //|   dom.scroll( deltaY )     -> this
  //|   dom.on( name, callback ) -> this
  //|
  //#######################################
  constructor(arg) {
    this._resolveRoot = this._resolveRoot.bind(this);
    this._find = this._find.bind(this);
    this._findAll = this._findAll.bind(this);
    this._children = this._children.bind(this);
    this._htmlSelf = this._htmlSelf.bind(this);
    this._html = this._html.bind(this);
    this._tag = this._tag.bind(this);
    this._attr = this._attr.bind(this);
    this._text = this._text.bind(this);
    this._addClass = this._addClass.bind(this);
    this._hasClass = this._hasClass.bind(this);
    this._removeClass = this._removeClass.bind(this);
    this._append = this._append.bind(this);
    this._element = this._element.bind(this);
    this._val = this._val.bind(this);
    this._parent = this._parent.bind(this);
    this._css = this._css.bind(this);
    this._width = this._width.bind(this);
    this._height = this._height.bind(this);
    this._top = this._top.bind(this);
    this._bottom = this._bottom.bind(this);
    this._isVisible = this._isVisible.bind(this);
    this._scroll = this._scroll.bind(this);
    this._on = this._on.bind(this);
    //#######################################
    //|
    //|   @params {string|HTMLElement} html|$el
    //|
    //#######################################
    this._root = this._resolveRoot(arg);
    this.find = this._find;
    this.findAll = this._findAll;
    this.children = this._children;
    this.htmlSelf = this._htmlSelf;
    this.html = this._html;
    this.tag = this._tag;
    this.attr = this._attr;
    this.text = this._text;
    this.hasClass = this._hasClass;
    this.addClass = this._addClass;
    this.removeClass = this._removeClass;
    this.append = this._append;
    this.element = this._element;
    this.val = this._val;
    this.parent = this._parent;
    this.css = this._css;
    this.width = this._width;
    this.height = this._height;
    this.top = this._top;
    this.bottom = this._bottom;
    this.isVisible = this._isVisible;
    this.scroll = this._scroll;
    this.on = this._on;
  }

  _resolveRoot(arg) {
    var $el, fragment, html;
    //#######################################
    //|
    //|   @params {string|HTMLElement} html|$el
    //|   @return {HTMLElement}
    //|
    //#######################################
    if (typeof arg === 'string') {
      fragment = document.createElement('fragment');
      fragment.innerHTML = html = arg;
      return fragment.childNodes[0];
    } else {
      return $el = arg;
    }
  }

  _find(sel) {
    var $el;
    //#######################################
    //|
    //|   @params {string} sel
    //|   @return {DOM}    dom - return null when not found.
    //|
    //#######################################
    $el = this._root.querySelector(sel);
    if ($el) {
      return new DOM($el);
    } else {
      return null;
    }
  }

  _findAll(sel) {
    var $el, $els, dom, doms, i, len;
    //#######################################
    //|
    //|   @params {string} sel
    //|   @return {DOM[]}  doms - return [] when not found.
    //|
    //#######################################
    doms = [];
    $els = this._root.querySelectorAll(sel);
    for (i = 0, len = $els.length; i < len; i++) {
      $el = $els[i];
      dom = new DOM($el);
      doms.push(dom);
    }
    return doms;
  }

  _children() {
    var $el, $els, dom, doms, i, len;
    //#######################################
    //|
    //|   @return {DOM[]} doms - return [] when not found.
    //|
    //#######################################
    doms = [];
    $els = this._root.childNodes;
    for (i = 0, len = $els.length; i < len; i++) {
      $el = $els[i];
      if ($el.nodeType === 1) {
        dom = new DOM($el);
        doms.push(dom);
      }
    }
    return doms;
  }

  _htmlSelf(html) {
    //#######################################
    //|
    //|   SET   @params {string} html
    //|         @return {DOM}    this
    //|
    //|   GET   @return {string} html ( outer's )
    //|
    //#######################################
    if (html != null) {
      return new DOM(html);
    } else {
      return this._root.outerHTML;
    }
  }

  _html(html) {
    //#######################################
    //|
    //|   SET   @params {string} html
    //|         @return {DOM}    this
    //|
    //|   GET   @return {string} html ( inner's )
    //|
    //#######################################
    if (html != null) {
      this._root.innerHTML = html;
      return this;
    } else {
      return this._root.innerHTML;
    }
  }

  _tag() {
    //#######################################
    //|
    //|   @return {string} value
    //|
    //#######################################
    return this._root.tagName.toLowerCase();
  }

  _attr(name, value) {
    //#######################################
    //|
    //|   SET   @params {string} name
    //|         @params {string} value
    //|         @return {DOM}    this
    //|
    //|   GET   @params {string} name
    //|         @return {string} value
    //|
    //#######################################
    if (value != null) {
      this._root.setAttribute(name, value);
      return this;
    } else {
      return this._root.getAttribute(name);
    }
  }

  _text(text) {
    //#######################################
    //|
    //|   SET   @params {string} text
    //|         @return {DOM}    this
    //|
    //|   GET   @return {string} text
    //|
    //#######################################
    if (text != null) {
      this._root.innerText = text;
      return this;
    } else {
      return this._root.innerText;
    }
  }

  _addClass(name) {
    //#######################################
    //|
    //|   @params {string} name
    //|   @return {DOM}    this
    //|
    //#######################################
    this._root.classList.add(name);
    return this;
  }

  _hasClass(name) {
    //#######################################
    //|
    //|   @params {string} name
    //|   @return {boolean}
    //|
    //#######################################
    return this._root.classList.contains(name);
  }

  _removeClass(name) {
    //#######################################
    //|
    //|   @params {string} name
    //|   @return {DOM}    this
    //|
    //#######################################
    this._root.classList.remove(name);
    return this;
  }

  _append(child) {
    //#######################################
    //|
    //|   @params {DOM|string} dom|html
    //|   @return {DOM} this
    //|
    //#######################################
    if (child) {
      if (typeof child === 'string') {
        child = new DOM(child);
      }
      this._root.appendChild(child.element());
    }
    return this;
  }

  _element() {
    //#######################################
    //|
    //|   @return {HTMLElement} root's $el
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    return this._root;
  }

  _val(value) {
    //#######################################
    //|
    //|   SET   @params {string} value
    //|         @return {DOM}    this
    //|
    //|   GET   @return {string} value
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    if (value != null) {
      this._root.value = value;
      return this;
    } else {
      return this._root.value;
    }
  }

  _parent() {
    var $el;
    //#######################################
    //|
    //|   @return {DOM} parent - return null when not found.
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    $el = this._root.parentNode;
    if ($el) {
      return new DOM($el);
    } else {
      return null;
    }
  }

  _css(name, value) {
    //#######################################
    //|
    //|   @params {string} name
    //|   @params {*}      value
    //|   @return {DOM}    this
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    this._root.style[name] = value;
    return this;
  }

  _width() {
    //#######################################
    //|
    //|   @return {number} width
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    return this._root.getBoundingClientRect().width;
  }

  _height() {
    //#######################################
    //|
    //|   @return {number} height
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    return this._root.getBoundingClientRect().height;
  }

  _top() {
    //#######################################
    //|
    //|   @return {number} top
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    return this._root.getBoundingClientRect().top;
  }

  _bottom() {
    //#######################################
    //|
    //|   @return {number} top
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    return this._root.getBoundingClientRect().top;
  }

  _isVisible() {
    //#######################################
    //|
    //|   @return {boolean}
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    return this.width() > 0;
  }

  _scroll(deltaY) {
    //#######################################
    //|
    //|   @params {number} delta Y
    //|   @return {DOM}    this
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    this._root.scrollBy(0, deltaY);
    return this;
  }

  _on(name, callback) {
    //#######################################
    //|
    //|   @params {string}   name
    //|   @params {function} callback
    //|   @return {DOM}      this
    //|
    //|   add an event listener to root,
    //|   this method only exists in DOM.web
    //|
    //#######################################
    this._root.addEventListener(name, (e) => {
      var dom;
      dom = new DOM(e.target);
      callback(dom, e);
      return e.preventDefault();
    });
    return this;
  }

};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {
var dom, filePath, id, isUrl, parseSelector;

isUrl = (href) => {
  //#######################################
  ///
  ///   @params {string} href
  ///   @return {boolean}
  ///
  //#######################################
  return /^(?:http)|(?:https)|(?:ftp):\/\//.test(href);
};

filePath = (href = '') => {
  var basePath, path;
  //#######################################
  ///
  ///   @params {string} href
  ///   @return {string} path
  ///
  ///   href  ->  basePath/href  ( won't format when href is url )
  ///
  //#######################################
  if (exports.isUrl(href)) {
    return href;
  } else {
    path = href;
  }
  if (basePath = Breeze.config('basePath')) {
    path = basePath + '/' + path;
  }
  if (path) {
    path = path.replace(/\/{2,}/g, '/');
  }
  if (path[0] === '/') {
    path = path.slice(1);
  }
  return path;
};

id = (order, text = '') => {
  //#######################################
  //|
  //|  @params {string} order
  //|  @params {string} text
  //|  @return {string} id
  //|
  //#######################################
  text = text.replace(/\s+/g, '-');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  if (text) {
    return order + '-' + text;
  } else {
    return order;
  }
};

dom = (arg) => {
  var $el, classname, html, sel, tag;
  //#######################################
  ///
  ///   @params {string|HTMLElement} html|sel|$el
  ///   @return {DOM}
  ///
  ///   <html>  ->  DOM
  ///   sel#id  ->  DOM
  ///   $el#id  ->  DOM
  ///
  //#######################################
  if (typeof arg === 'string') {
    if (arg[0] === '<') {
      dom = new Breeze.DOM(html = arg);
    } else {
      ({tag, id, classname} = parseSelector(sel = arg));
      dom = new Breeze.DOM(`<${tag}>`);
      if (id) {
        dom.attr('id', id);
      }
      if (classname) {
        dom.attr('class', classname);
      }
    }
  } else {
    dom = new Breeze.DOM($el = arg);
  }
  return dom;
};

parseSelector = (sel = 'div') => {
  var classname, hasClass, hasID, parts, tag;
  //#######################################
  ///
  ///   @params {string} sel
  ///   @return {object} - {string} tag
  ///                      {string} id
  ///                      {string} classname
  ///
  ///
  ///   'tag'            -> { tag: 'tag' }
  ///   '#id'            -> { tag: 'div', id: 'id' }
  ///   '.classname'     -> { tag: 'div', classname: 'classname' }
  ///   'tag#id'         -> { tag: 'tag', id: 'id' }
  ///   'tag.classname'  -> { tag: 'tag', classname: 'classname' }
  ///
  ///
  ///   This sel can't includes id and classname at the same time.
  ///   This sel can't includes classname more than two.
  ///
  //#######################################
  hasID = /#/.test(sel);
  hasClass = /\./.test(sel);
  tag = 'div';
  id = '';
  classname = '';
  parts = sel.split(/#|\./);
  parts = parts.filter((part) => {
    return part;
  });
  switch (parts.length) {
    case 1:
      switch (false) {
        case !hasID:
          id = parts[0];
          break;
        case !hasClass:
          classname = parts[0];
          break;
        default:
          tag = parts[0];
      }
      break;
    case 2:
      switch (false) {
        case !hasID:
          (tag = parts[0]) && (id = parts[1]);
          break;
        case !hasClass:
          (tag = parts[0]) && (classname = parts[1]);
      }
  }
  return {tag, id, classname};
};

exports.isUrl = isUrl;

exports.filePath = filePath;

exports.id = id;

exports.dom = dom;

exports.parseSelector = parseSelector;
});
var util_1 = util.isUrl;
var util_2 = util.filePath;
var util_3 = util.id;
var util_4 = util.dom;
var util_5 = util.parseSelector;

var Loader, util$1;

util$1 = util;

var Loader_web = Loader = class Loader {
  //#######################################
  //|
  //|   new Loader()
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       loading the normal and common pages.
  //|
  //|    Adapted to the web environment ( browser-runtime )
  //|   -----------------------------------
  //|
  //|   loader.load( path, done, fail )
  //|
  //#######################################
  constructor() {
    this._load = this._load.bind(this);
    this._findOrReadCommon = this._findOrReadCommon.bind(this);
    this._readCommon = this._readCommon.bind(this);
    this._formatNormalPath = this._formatNormalPath.bind(this);
    this._formatCommonPaths = this._formatCommonPaths.bind(this);
    this._read = this._read.bind(this);
    this._cache = {};
    this.load = this._load;
  }

  _load(path, done, fail) {
    var commonPaths, normalPath;
    //#######################################
    //|
    //|   @params {string}   path
    //|   @params {function} done( text = common + normal )
    //|   @params {function} fail()
    //|
    //#######################################
    normalPath = this._formatNormalPath(path);
    commonPaths = this._formatCommonPaths(path);
    return this._read(normalPath, (normal) => {
      if (normal != null) {
        return this._findOrReadCommon(commonPaths, (common) => {
          return done(common + normal);
        });
      } else {
        return fail();
      }
    });
  }

  _findOrReadCommon(paths, done) {
    var path;
    //#######################################
    //|
    //|   @params {string[]} paths
    //|   @return {function} done( common )
    //|
    //#######################################
    path = paths.pop();
    return this._readCommon(path, (common) => {
      if (common != null) {
        return done(common);
      } else {
        if (paths.length) {
          return this._findOrReadCommon(paths, done);
        } else {
          return done('');
        }
      }
    });
  }

  _readCommon(path, done) {
    var common;
    //#######################################
    //|
    //|   @params {string}   path
    //|   @return {function} done( common )
    //|
    //#######################################
    common = this._cache[path];
    if (common === void 0) {
      return this._read(path, (common) => {
        return done(this._cache[path] = common);
      });
    } else {
      return done(common);
    }
  }

  _formatNormalPath(path) {
    //#######################################
    //|
    //|   @params {string} path
    //|   @return {string} path
    //|
    //#######################################
    path = util$1.filePath(path);
    if (path === '') {
      path = 'README';
    }
    if (path[path.length - 1] === '/') {
      path += 'README';
    }
    return path + '.md';
  }

  _formatCommonPaths(path) {
    var part, parts, paths, queue;
    //#######################################
    //|
    //|   @params {string}   path
    //|   @return {string[]} paths
    //|
    //|   basePath = '/docs'
    //|   path     = '/api/math'  =>  ['@.md', 'docs/@.md', 'docs/api/@.md']
    //|
    //#######################################
    paths = [];
    queue = [];
    path = util$1.filePath(path); // path  = 'docs/api/math'
    parts = path.split('/'); // parts = ['docs', 'api', 'math']
    parts.pop(); // parts = ['docs', 'api']
    while (parts.length) {
      part = parts.shift(); // part  = 'docs'        | part  = 'api'
      queue.push(part); // queue = ['docs']      | queue = ['docs', 'api']
      path = queue.join('/') + '/@.md'; // path  = 'docs/@.md'   | path  = 'docs/api/@.md'
      paths.push(path); // paths = ['docs/@.md'] | paths = ['docs/@.md', 'docs/api/@.md']
    }
    paths.unshift('@.md'); // paths = ['@.md', 'docs/@.md', 'docs/api/@.md']
    return paths;
  }

  _read(path, done) {
    var xhr;
    //#######################################
    //|
    //|   @params {string}   path
    //|   @params {function} done( text ) - text = null if not found,
    //|                                     when use, should check by << text? >> ( a coffeescript syntactic sugar )
    //|
    //#######################################
    xhr = new XMLHttpRequest;
    xhr.open('GET', path, true);
    xhr.send(null);
    return xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return done(xhr.responseText);
        } else {
          return done(null);
        }
      }
    };
  }

};

var Router, util$2;

util$2 = util;

var Router_1 = Router = class Router {
  //#######################################
  //|
  //|   new Router( isJIT )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       managing the singleton router.
  //|   -----------------------------------
  //|
  //|   router.getPath()             -> path
  //|   router.getQuery()            -> query
  //|   router.resolvePath( href )   -> path
  //|   router.resolveID( href )     -> id
  //|   router.isCurrentPath( href ) -> bool
  //|   router.isCurrentID( href )   -> bool
  //|   router.go( href )
  //|
  //|   @events('reload')
  //|
  //#######################################
  constructor(isJIT = false) {
    this._getFullPath = this._getFullPath.bind(this);
    this._getPath = this._getPath.bind(this);
    this._getQueryString = this._getQueryString.bind(this);
    this._getQuery = this._getQuery.bind(this);
    this._formatFullPath = this._formatFullPath.bind(this);
    this._formatPath = this._formatPath.bind(this);
    this._formatQueryString = this._formatQueryString.bind(this);
    this._resolvePath = this._resolvePath.bind(this);
    this._resolveID = this._resolveID.bind(this);
    this._isCurrentPath = this._isCurrentPath.bind(this);
    this._isCurrentID = this._isCurrentID.bind(this);
    this._go = this._go.bind(this);
    this._goUrl = this._goUrl.bind(this);
    this._goPath = this._goPath.bind(this);
    this._goID = this._goID.bind(this);
    //#######################################
    //|
    //|   @params {boolean} isJIT - is the 'Just In Time' mode ?
    //|
    //#######################################
    this._isJIT = isJIT;
    this.getPath = this._getPath;
    this.getQuery = this._getQuery;
    this.resolvePath = this._resolvePath;
    this.resolveID = this._resolveID;
    this.isCurrentPath = this._isCurrentPath;
    this.isCurrentID = this._isCurrentID;
    this.go = this._go;
    window.addEventListener('popstate', () => {
      return Breeze.emit('reload');
    });
  }

  _getFullPath() {
    var path;
    //#######################################
    //|
    //|   @return {string} fullPath
    //|
    //|   when JIT,
    //|      host:port                       ->  '/'
    //|      host:port/#/                    ->  '/'
    //|      host:port/#/?id=abc             ->  '/?id=abc'
    //|      host:port/#/path/subPath?id=abc ->  '/path/subPath?id=abc'
    //|
    //|   when no-JIT,
    //|      host:port                       ->  '/'
    //|      host:port?id=abc                ->  '/?id=abc'
    //|      host:port/path/subPath?id=abc   ->  '/path/subPath?id=abc'
    //|
    //#######################################
    if (this._isJIT) {
      path = location.hash.slice(1);
    } else {
      path = location.pathname;
    }
    if (path[0] !== '/') {
      path = '/' + path;
    }
    return path;
  }

  _getPath() {
    var path;
    //#######################################
    //|
    //|   @return {string} path
    //|
    //|   /path/subPath?id=abc  ->  '/path/subPath'
    //|
    //#######################################
    path = this._getFullPath();
    path = path.replace(/\?.*$/, '');
    return decodeURI(path);
  }

  _getQueryString() {
    var match, path;
    //#######################################
    //|
    //|   @return {string} queryString
    //|
    //|   /path/subPath?id=abc  ->  'id=abc'
    //|
    //#######################################
    path = this._getFullPath();
    if (match = path.match(/\?.+$/)) {
      return decodeURI(match[0].slice(1));
    } else {
      return '';
    }
  }

  _getQuery() {
    var field, fields, i, len, name, parts, query, queryString, ref, value;
    //#######################################
    //|
    //|   @return {object} query ?= {}
    //|
    //|   /path/subPath?id=abc       ->  { id: 'abc' }
    //|   /path/subPath?id=abc&flag  ->  { id: 'abc', flag: true }
    //|
    //#######################################
    queryString = this._getQueryString();
    query = {};
    fields = queryString.split('&');
    fields = fields.filter((field) => {
      return field;
    });
    for (i = 0, len = fields.length; i < len; i++) {
      field = fields[i];
      parts = field.split('=');
      name = parts[0];
      value = (ref = parts[1]) != null ? ref : true;
      query[name] = value;
    }
    return query;
  }

  _formatFullPath(path = '', query = {}) {
    var queryString;
    //#######################################
    //|
    //|   @params {string} path
    //|   @params {object} query
    //|
    //|   @return {string} fullPath
    //|
    //|   when JIT,
    //|      ''   ->  /#/...
    //|      '/'  ->  /...
    //|
    //|   when no-JIT,
    //|      ''   ->  /...
    //|      '/'  ->  /...
    //|
    //#######################################
    path = this._formatPath(path);
    queryString = this._formatQueryString(query);
    if (this._isJIT && path !== '/') {
      return '/#' + path + queryString;
    } else {
      return path + queryString;
    }
  }

  _formatPath(path = '') {
    //#######################################
    //|
    //|   @params {string} path
    //|   @return {string} path
    //|
    //|   Assume current is at /path/subPath
    //|
    //|   ''        ->  '/path/subPath'
    //|   '/'       ->  '/'
    //|   'path'    ->  '/path'
    //|   '/path'   ->  '/path'
    //|   '/path/'  ->  '/path/'
    //|
    //#######################################
    if (path) {
      if (path[0] !== '/') {
        path = '/' + path;
      }
    } else {
      path = this._getPath();
    }
    return path;
  }

  _formatQueryString(query = {}) {
    var fields, name, value;
    //#######################################
    //|
    //|   @params {object} qyery
    //|   @return {string} queryString
    //|
    //|   {}                         ->  ''
    //|   { id: 'abc', flag: true }  ->  '?id=abc&flag'
    //|
    //#######################################
    fields = [];
    for (name in query) {
      value = query[name];
      if (value === true) {
        fields.push(name);
      } else {
        fields.push(name + '=' + value);
      }
    }
    if (fields.length) {
      return '?' + fields.join('&');
    } else {
      return '';
    }
  }

  _resolvePath(href = '') {
    var path;
    //#######################################
    //|
    //|   @params {string} href
    //|   @return {string} path
    //|
    //|   'path/subPath#id'  ->  '/path/subPath'
    //|   'path#id'          ->  '/path'
    //|   'path'             ->  '/path'
    //|   '#id'              ->  ''
    //|   '/'                ->  '/'
    //|   ''                 ->  ''
    //|
    //#######################################
    path = href.split('#')[0];
    if (path && path[0] !== '/') {
      path = '/' + path;
    }
    return path;
  }

  _resolveID(href = '') {
    var parts;
    //#######################################
    //|
    //|   @params {string} href
    //|   @return {string} id
    //|
    //|   'path#id'  ->  'id'
    //|   '#id'      ->  'id'
    //|   '#'        ->  ''
    //|   'path'     ->  ''
    //|   '/'        ->  ''
    //|   ''         ->  ''
    //|
    //#######################################
    parts = href.split('#');
    if (parts.length === 2) {
      return parts[1];
    } else {
      return '';
    }
  }

  _isCurrentPath(href = '') {
    var path;
    //#######################################
    //|
    //|   @params {string} href
    //|   @return {boolean}
    //|
    //|   Assume current is at /path/subPath?id=abc
    //|
    //|   _isCurrentPath('')           ->  true
    //|   _isCurrentPath('#')          ->  true
    //|   _isCurrentPath('#abc')       ->  true
    //|   _isCurrentPath('path')       ->  true
    //|   _isCurrentPath('path#abc')   ->  true
    //|   _isCurrentPath('path#abc2')  ->  true
    //|   _isCurrentPath('/')          ->  false
    //|   _isCurrentPath('path2#abc')  ->  false
    //|
    //#######################################
    path = this._resolvePath(href);
    if (!path || path === this._getPath()) {
      return true;
    } else {
      return false;
    }
  }

  _isCurrentID(href = '') {
    var currentID, id;
    //#######################################
    //|
    //|   @params {string} href
    //|   @return {boolean}
    //|
    //|   Assume current is at /path/subPath?id=abc
    //|
    //|   _isCurrentID('#abc')       ->  true
    //|   _isCurrentID('path#abc')   ->  true
    //|   _isCurrentID('')           ->  false
    //|   _isCurrentID('#')          ->  false
    //|   _isCurrentID('path')       ->  false
    //|   _isCurrentID('path#abc2')  ->  false
    //|   _isCurrentID('/')          ->  false
    //|   _isCurrentID('path2#abc')  ->  false
    //|
    //#######################################
    id = this._resolveID(href);
    currentID = this._getQuery().id;
    if (!id && !currentID) {
      return true;
    } else if (id === currentID) {
      return true;
    } else {
      return false;
    }
  }

  _go(href = '') {
    //#######################################
    //|
    //|   @params {string} href
    //|
    //|   when JIT,
    //|      _go('/path/subPath#abc')  ->  /#/path/subPath?id=abc
    //|
    //|   when no-JIT,
    //|      _go('/path/subPath#abc')  ->  /path/subPath?id=abc
    //|
    //#######################################
    if (util$2.isUrl(href)) {
      return this._goUrl(href);
    } else {
      if (href[0] === '#') {
        if (!this._isCurrentID(href)) {
          return this._goID(href);
        }
      } else {
        if (!this._isCurrentPath(href)) {
          return this._goPath(href);
        }
      }
    }
  }

  _goUrl(url) {
    //#######################################
    //|
    //|   @params {string} url
    //|
    //|   _goUrl('http://google.com')  ->  http://google.com ( open in new tab )
    //|
    //#######################################
    return window.open(url, '_blank');
  }

  _goPath(href) {
    var fullPath, id, path, query;
    //#######################################
    //|
    //|   @params {string} href
    //|
    //|   @events('reload') - only emit when JIT
    //|
    //|   Assume current is at '/path/subPath?id=abc&flag'
    //|
    //|      _goPath('subPath2')      ->  /path/subPath2?flag
    //|      _goPath('subPath2#def')  ->  /path/subPath2?id=def&flag
    //|      _goPath('/')             ->  /?flag
    //|      _goPath('/#def')         ->  /?id=def&flag
    //|
    //#######################################
    path = this._resolvePath(href);
    id = this._resolveID(href);
    query = this._getQuery();
    if (id) {
      query.id = id;
    } else {
      delete query.id;
    }
    fullPath = this._formatFullPath(path, query);
    if (this._isJIT) {
      history.pushState(null, null, fullPath);
      return Breeze.emit('reload');
    } else {
      return location.href = fullPath;
    }
  }

  _goID(href) {
    var fullPath, id, path, query;
    //#######################################
    //|
    //|   @params {string} href
    //|
    //|   Assume current is at '/path/subPath?id=abc&flag'
    //|
    //|      _goID('#')     ->  /?flag
    //|      _goID('#def')  ->  /?id=def&flag
    //|
    //#######################################
    id = this._resolveID(href);
    path = this._getPath();
    query = this._getQuery();
    if (id) {
      query.id = id;
    } else {
      delete query.id;
    }
    fullPath = this._formatFullPath(path, query);
    return history.replaceState(null, null, fullPath);
  }

};

var Jade;

var Jade_1 = Jade = class Jade {
  //#######################################
  //|
  //|   new Jade( text )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       compiling jade-like to html.
  //|   -----------------------------------
  //|
  //|   jade.compile() -> html
  //|
  //#######################################
  constructor(text) {
    this._compile = this._compile.bind(this);
    this._parseNodes = this._parseNodes.bind(this);
    this._parseNode = this._parseNode.bind(this);
    this._parseDeep = this._parseDeep.bind(this);
    this._parseTag = this._parseTag.bind(this);
    this._parseAttr = this._parseAttr.bind(this);
    this._parseText = this._parseText.bind(this);
    this._parseTree = this._parseTree.bind(this);
    this._compileTree = this._compileTree.bind(this);
    this._compileNode = this._compileNode.bind(this);
    //#######################################
    //|
    //|   @params {string} text
    //|
    //#######################################
    this.text = text;
    this.compile = this._compile;
  }

  _compile() {
    var html, nodes, tree;
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    nodes = this._parseNodes(this.text);
    tree = this._parseTree(nodes);
    html = this._compileTree(tree);
    return html;
  }

  _parseNodes(text) {
    var lines, nodes;
    //#######################################
    //|
    //|   @params {string}   text
    //|   @return {object[]} nodes - [{ deep, tag, attr, text }]
    //|
    //#######################################
    lines = text.split(/\n+/g);
    nodes = lines.map((line) => {
      if (line.trim()) {
        return this._parseNode(line);
      } else {
        return null;
      }
    });
    nodes = nodes.filter((node) => {
      return node;
    });
    return nodes;
  }

  _parseNode(line) {
    var attr, deep, rest, tag, text;
    //#######################################
    //|
    //|   @params {string} line
    //|   @return {object} - {number} deep
    //|                      {string} tag
    //|                      {string} attr
    //|                      {string} text
    //|
    //#######################################
    ({deep, rest} = this._parseDeep(line));
    ({tag, rest} = this._parseTag(rest));
    ({attr, rest} = this._parseAttr(rest));
    ({text, rest} = this._parseText(rest));
    return {deep, tag, attr, text};
  }

  _parseDeep(line) {
    var deep, reg, rest;
    //#######################################
    //|
    //|   @params {string} line
    //|   @return {object} - {number} deep
    //|                      {string} rest
    //|
    //#######################################
    deep = 0;
    reg = /^\s+/;
    rest = line.replace(reg, (match) => {
      deep = match.length;
      return '';
    });
    return {deep, rest};
  }

  _parseTag(rest) {
    var reg, tag;
    //#######################################
    //|
    //|   @params {string} rest
    //|   @return {object} - {string} tag
    //|                      {string} rest
    //|
    //|   @errors when parse failed.
    //|
    //#######################################
    tag = '';
    reg = /^([A-Za-z0-9_\-]+)\s*/;
    rest = rest.replace(reg, (_, match) => {
      tag = match;
      return '';
    });
    if (tag) {
      return {tag, rest};
    } else {
      throw `Unknown jade-like syntax: ${this._line}`;
    }
  }

  _parseAttr(rest) {
    var attr, reg;
    //#######################################
    //|
    //|   @params {string} rest
    //|   @return {object} - {string} attr
    //|                      {string} rest
    //|
    //#######################################
    attr = '';
    reg = /^\(([^)]*)\)/;
    rest = rest.replace(reg, (_, match) => {
      attr = match.trim();
      return '';
    });
    return {attr, rest};
  }

  _parseText(rest) {
    var text;
    //#######################################
    //|
    //|   @params {string} rest
    //|   @return {object} - {string} text
    //|                      {string} rest
    //|
    //#######################################
    text = rest.trim();
    rest = '';
    return {text, rest};
  }

  _parseTree(nodes) {
    var deep, i, len, node, root, tree;
    //#######################################
    //|
    //|   @params {object[]} nodes - [{ deep, tag, attr, text }]
    //|   @return {object}   tree
    //|
    //#######################################
    root = {};
    tree = root;
    deep = -1;
    for (i = 0, len = nodes.length; i < len; i++) {
      node = nodes[i];
      if (node.deep > deep) {
        if (tree.children == null) {
          tree.children = [];
        }
        tree.children.push(node);
        node.parent = tree;
        tree = node;
        deep = node.deep;
      } else if (node.deep === deep) {
        tree.parent.children.push(node);
        node.parent = tree.parent;
        tree = node;
      } else if (node.deep < deep) {
        while (node.deep <= tree.deep) {
          tree = tree.parent;
        }
        tree.children.push(node);
        node.parent = tree;
        tree = node;
        deep = node.deep;
      }
    }
    return root;
  }

  _compileTree(tree) {
    //#######################################
    //|
    //|   @params {object} tree - { tag, attr, text, children }
    //|   @return {string} html
    //|
    //#######################################
    return this._compileNode(tree);
  }

  _compileNode(node) {
    var attr, children, end, html, start, tag, text;
    //#######################################
    //|
    //|   @params {object} node - { tag, attr, text, children }
    //|   @return {string} html
    //|
    //#######################################
    ({tag, attr, text, children} = node);
    start = tag ? `<${tag} ${attr}>` : '';
    end = tag ? `</${tag}>` : '';
    if (children) {
      html = children.map(this._compileNode).join('');
      return start + html + end;
    } else {
      return start + text + end;
    }
  }

};

var Jade$1, Markdown;

Jade$1 = Jade_1;

var Markdown_1 = Markdown = class Markdown {
  //#######################################
  //|
  //|   new Markdown( text )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       compiling text to markdown and parsing some components,
  //|       such as <nav>, <cover>, <summary> and so on.
  //|   -----------------------------------
  //|
  //|   markdown.compile() -> markdown
  //|   markdown.parse()   -> { nav, cover, summary, article }
  //|
  //#######################################
  constructor(text) {
    this._compile = this._compile.bind(this);
    this._compileJadeByTag = this._compileJadeByTag.bind(this);
    this._compileJadeByAttribute = this._compileJadeByAttribute.bind(this);
    this._formatSelfClosingTag = this._formatSelfClosingTag.bind(this);
    this._parse = this._parse.bind(this);
    this._parseNav = this._parseNav.bind(this);
    this._parseCover = this._parseCover.bind(this);
    this._parseSummary = this._parseSummary.bind(this);
    //#######################################
    //|
    //|   @params {string} text
    //|
    //#######################################
    this.text = text;
    this.compile = this._compile;
    this.parse = this._parse;
  }

  _compile() {
    var markdown, text;
    //#######################################
    //|
    //|   @return {string} markdown
    //|
    //#######################################
    text = this._compileJadeByTag(this.text);
    text = this._compileJadeByAttribute(text);
    text = this._formatSelfClosingTag(text);
    return markdown = text;
  }

  _compileJadeByTag(text) {
    var reg;
    //#######################################
    //|
    //|   @params {string} text
    //|   @return {string} text
    //|
    //|   Compile and replace the <jade>...</jade> to html.
    //|
    //#######################################
    reg = /<jade>((?:.|\n)*?)<\/jade>/g;
    return text.replace(reg, (_, text) => {
      var html, jade;
      jade = new Jade$1(text);
      html = jade.compile();
      return html;
    });
  }

  _compileJadeByAttribute(text) {
    var reg;
    //#######################################
    //|
    //|   @params {string} text
    //|   @return {string} text
    //|
    //|   Compile and replace the <tag jade>...</tag> to html.
    //|
    //#######################################
    reg = /(<\s*(.+?)\s*.*\s+jade\s*.*>)((?:.|\n)*?)\s*(<\s*\/\2\s*>)/g;
    return text.replace(reg, (_, start, name, text, end) => {
      var html, jade;
      jade = new Jade$1(text);
      html = jade.compile();
      return start + html + end;
    });
  }

  _formatSelfClosingTag(text) {
    var reg;
    //#######################################
    //|
    //|   @params {string} text
    //|   @return {string} text
    //|
    //|   Format and replace <tag/> to <tag></tag>
    //|
    //#######################################
    reg = /<([A-Za-z_-]+)((?:\s|\n)+(?:[^<]|\n)*?)?\/>/g;
    return text.replace(reg, (_, tag, attr = '') => {
      return `<${tag} ${attr}></${tag}>`;
    });
  }

  _parse() {
    var article, cover, markdown, nav, summary;
    //#######################################
    //|
    //|   @return {object} - {string} nav     ( html )
    //|                      {string} cover   ( html )
    //|                      {string} summary ( html )
    //|                      {string} article ( markdown )
    //|
    //#######################################
    markdown = this._compile();
    ({nav, markdown} = this._parseNav(markdown));
    ({cover, markdown} = this._parseCover(markdown));
    ({summary, markdown} = this._parseSummary(markdown));
    article = markdown.trim();
    return {nav, cover, summary, article};
  }

  _parseNav(markdown) {
    var nav, navReg;
    //#######################################
    //|
    //|   @params {string} markdown
    //|   @return {object} - {string} nav ( html )
    //|                      {string} markdown
    //|
    //#######################################
    nav = '';
    navReg = /<nav(?:\s+.*)?>(?:.|\n)*?<\/nav>/g;
    markdown = markdown.replace(navReg, (match) => {
      nav = match;
      return '';
    });
    return {nav, markdown};
  }

  _parseCover(markdown) {
    var cover, coverReg;
    //#######################################
    //|
    //|   @params {string} markdown
    //|   @return {object} - {string} cover ( html )
    //|                      {string} markdown
    //|
    //#######################################
    cover = '';
    coverReg = /<cover(?:\s+.*)?>(?:.|\n)*?<\/cover>/g;
    markdown = markdown.replace(coverReg, (match) => {
      cover = match;
      return '';
    });
    return {cover, markdown};
  }

  _parseSummary(markdown) {
    var summary, summaryReg;
    //#######################################
    //|
    //|   @params {string} markdown
    //|   @return {object} - {string} summary ( html )
    //|                      {string} markdown
    //|
    //#######################################
    summary = '';
    summaryReg = /<summary.*?>(?:.|\n)*?<\/summary>/g;
    markdown = markdown.replace(summaryReg, (match) => {
      summary = match;
      return '';
    });
    return {summary, markdown};
  }

};

var beautify = createCommonjsModule(function (module, exports) {
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/* see js/src/javascript/index.js */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@jsbeautifier.org>
      http://jsbeautifier.org/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@gmail.com>


  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy        !jslint_happy
            ---------------------------------
            function ()         function()

            switch () {         switch() {
            case 1:               case 1:
              break;                break;
            }                   }

    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none" | any of the former + ",preserve-inline"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
            preserve-inline will try to preserve inline blocks of curly braces

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    end_with_newline (default false)  - end output with a newline


    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/

(function() {
var legacy_beautify_js =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var mergeOpts = __webpack_require__(3).mergeOpts;
var acorn = __webpack_require__(0);
var Output = __webpack_require__(4).Output;
var Tokenizer = __webpack_require__(7).Tokenizer;

function remove_redundant_indentation(output, frame) {
    // This implementation is effective but has some issues:
    //     - can cause line wrap to happen too soon due to indent removal
    //           after wrap points are calculated
    // These issues are minor compared to ugly indentation.

    if (frame.multiline_frame ||
        frame.mode === MODE.ForInitializer ||
        frame.mode === MODE.Conditional) {
        return;
    }

    // remove one indent from each line inside this section
    var start_index = frame.start_line_index;

    output.remove_indent(start_index);
}

function in_array(what, arr) {
    for (var i = 0; i < arr.length; i += 1) {
        if (arr[i] === what) {
            return true;
        }
    }
    return false;
}

function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function ltrim(s) {
    return s.replace(/^\s+/g, '');
}

// function rtrim(s) {
//     return s.replace(/\s+$/g, '');
// }


function generateMapFromStrings(list) {
    var result = {};
    for (var x = 0; x < list.length; x++) {
        // make the mapped names underscored instead of dash
        result[list[x].replace(/-/g, '_')] = list[x];
    }
    return result;
}

function sanitizeOperatorPosition(opPosition) {
    opPosition = opPosition || OPERATOR_POSITION.before_newline;

    if (!in_array(opPosition, validPositionValues)) {
        throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" +
            validPositionValues +
            "\nYou passed in: '" + opPosition + "'");
    }

    return opPosition;
}

var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

// Generate map from array
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);

var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

var MODE = {
    BlockStatement: 'BlockStatement', // 'BLOCK'
    Statement: 'Statement', // 'STATEMENT'
    ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
    ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
    ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
    Conditional: 'Conditional', //'(COND-EXPRESSION)',
    Expression: 'Expression' //'(EXPRESSION)'
};

function Beautifier(js_source_text, options) {
    var output;
    var tokens = [],
        token_pos;
    var tokenizer;
    var current_token;
    var last_type, last_last_text, indent_string;
    var flags, previous_flags, flag_store;
    var prefix;

    var handlers, opt;
    var baseIndentString = '';

    handlers = {
        'TK_START_EXPR': handle_start_expr,
        'TK_END_EXPR': handle_end_expr,
        'TK_START_BLOCK': handle_start_block,
        'TK_END_BLOCK': handle_end_block,
        'TK_WORD': handle_word,
        'TK_RESERVED': handle_word,
        'TK_SEMICOLON': handle_semicolon,
        'TK_STRING': handle_string,
        'TK_EQUALS': handle_equals,
        'TK_OPERATOR': handle_operator,
        'TK_COMMA': handle_comma,
        'TK_BLOCK_COMMENT': handle_block_comment,
        'TK_COMMENT': handle_comment,
        'TK_DOT': handle_dot,
        'TK_UNKNOWN': handle_unknown,
        'TK_EOF': handle_eof
    };

    function create_flags(flags_base, mode) {
        var next_indent_level = 0;
        if (flags_base) {
            next_indent_level = flags_base.indentation_level;
            if (!output.just_added_newline() &&
                flags_base.line_indent_level > next_indent_level) {
                next_indent_level = flags_base.line_indent_level;
            }
        }

        var next_flags = {
            mode: mode,
            parent: flags_base,
            last_text: flags_base ? flags_base.last_text : '', // last token text
            last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
            declaration_statement: false,
            declaration_assignment: false,
            multiline_frame: false,
            inline_frame: false,
            if_block: false,
            else_block: false,
            do_block: false,
            do_while: false,
            import_block: false,
            in_case_statement: false, // switch(..){ INSIDE HERE }
            in_case: false, // we're on the exact line with "case 0:"
            case_body: false, // the indented case-action block
            indentation_level: next_indent_level,
            line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
            start_line_index: output.get_line_number(),
            ternary_depth: 0
        };
        return next_flags;
    }

    // Some interpreters have unexpected results with foo = baz || bar;
    options = options ? options : {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'js');

    opt = {};

    // compatibility, re
    if (options.brace_style === "expand-strict") { //graceful handling of deprecated option
        options.brace_style = "expand";
    } else if (options.brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
        options.brace_style = "collapse,preserve-inline";
    } else if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
        options.brace_style = options.braces_on_own_line ? "expand" : "collapse";
    } else if (!options.brace_style) { //Nothing exists to set it
        options.brace_style = "collapse";
    }

    //preserve-inline in delimited string will trigger brace_preserve_inline, everything
    //else is considered a brace_style and the last one only will have an effect
    var brace_style_split = options.brace_style.split(/[^a-zA-Z0-9_\-]+/);
    opt.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
    opt.brace_style = "collapse";
    for (var bs = 0; bs < brace_style_split.length; bs++) {
        if (brace_style_split[bs] === "preserve-inline") {
            opt.brace_preserve_inline = true;
        } else {
            opt.brace_style = brace_style_split[bs];
        }
    }

    opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    opt.indent_char = options.indent_char ? options.indent_char : ' ';
    opt.eol = options.eol ? options.eol : 'auto';
    opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    opt.unindent_chained_methods = (options.unindent_chained_methods === undefined) ? false : options.unindent_chained_methods;
    opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
    opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
    opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
    opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
    opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
    opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
    opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
    opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
    opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
    opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
    opt.e4x = (options.e4x === undefined) ? false : options.e4x;
    opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;
    opt.operator_position = sanitizeOperatorPosition(options.operator_position);

    // For testing of beautify ignore:start directive
    opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;

    // force opt.space_after_anon_function to true if opt.jslint_happy
    if (opt.jslint_happy) {
        opt.space_after_anon_function = true;
    }

    if (options.indent_with_tabs) {
        opt.indent_char = '\t';
        opt.indent_size = 1;
    }

    if (opt.eol === 'auto') {
        opt.eol = '\n';
        if (js_source_text && acorn.lineBreak.test(js_source_text || '')) {
            opt.eol = js_source_text.match(acorn.lineBreak)[0];
        }
    }

    opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    //----------------------------------
    indent_string = '';
    while (opt.indent_size > 0) {
        indent_string += opt.indent_char;
        opt.indent_size -= 1;
    }

    var preindent_index = 0;
    if (js_source_text && js_source_text.length) {
        while ((js_source_text.charAt(preindent_index) === ' ' ||
                js_source_text.charAt(preindent_index) === '\t')) {
            preindent_index += 1;
        }
        baseIndentString = js_source_text.substring(0, preindent_index);
        js_source_text = js_source_text.substring(preindent_index);
    }

    last_type = 'TK_START_BLOCK'; // last token type
    last_last_text = ''; // pre-last token text
    output = new Output(indent_string, baseIndentString);

    // If testing the ignore directive, start with output disable set to true
    output.raw = opt.test_output_raw;


    // Stack of parsing/formatting states, including MODE.
    // We tokenize, parse, and output in an almost purely a forward-only stream of token input
    // and formatted output.  This makes the beautifier less accurate than full parsers
    // but also far more tolerant of syntax errors.
    //
    // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
    // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
    // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
    // most full parsers would die, but the beautifier gracefully falls back to
    // MODE.BlockStatement and continues on.
    flag_store = [];
    set_mode(MODE.BlockStatement);

    this.beautify = function() {

        /*jshint onevar:true */
        var sweet_code;
        tokenizer = new Tokenizer(js_source_text, opt, indent_string);
        tokens = tokenizer.tokenize();
        token_pos = 0;

        current_token = get_token();
        while (current_token) {
            handlers[current_token.type]();

            last_last_text = flags.last_text;
            last_type = current_token.type;
            flags.last_text = current_token.text;

            token_pos += 1;
            current_token = get_token();
        }

        sweet_code = output.get_code(opt.end_with_newline, opt.eol);

        return sweet_code;
    };

    function handle_whitespace_and_comments(local_token, preserve_statement_flags) {
        var newlines = local_token.newlines;
        var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
        var temp_token = current_token;

        for (var h = 0; h < local_token.comments_before.length; h++) {
            // The cleanest handling of inline comments is to treat them as though they aren't there.
            // Just continue formatting and the behavior should be logical.
            // Also ignore unknown tokens.  Again, this should result in better behavior.
            current_token = local_token.comments_before[h];
            handle_whitespace_and_comments(current_token, preserve_statement_flags);
            handlers[current_token.type](preserve_statement_flags);
        }
        current_token = temp_token;

        if (keep_whitespace) {
            for (var i = 0; i < newlines; i += 1) {
                print_newline(i > 0, preserve_statement_flags);
            }
        } else {
            if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
                newlines = opt.max_preserve_newlines;
            }

            if (opt.preserve_newlines) {
                if (local_token.newlines > 1) {
                    print_newline(false, preserve_statement_flags);
                    for (var j = 1; j < newlines; j += 1) {
                        print_newline(true, preserve_statement_flags);
                    }
                }
            }
        }

    }

    // we could use just string.split, but
    // IE doesn't like returning empty strings
    function split_linebreaks(s) {
        //return s.split(/\x0d\x0a|\x0a/);

        s = s.replace(acorn.allLineBreaks, '\n');
        var out = [],
            idx = s.indexOf("\n");
        while (idx !== -1) {
            out.push(s.substring(0, idx));
            s = s.substring(idx + 1);
            idx = s.indexOf("\n");
        }
        if (s.length) {
            out.push(s);
        }
        return out;
    }

    var newline_restricted_tokens = ['break', 'continue', 'return', 'throw', 'yield'];

    function allow_wrap_or_preserved_newline(force_linewrap) {
        force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

        // Never wrap the first token on a line
        if (output.just_added_newline()) {
            return;
        }

        var shouldPreserveOrForce = (opt.preserve_newlines && current_token.wanted_newline) || force_linewrap;
        var operatorLogicApplies = in_array(flags.last_text, tokenizer.positionable_operators) || in_array(current_token.text, tokenizer.positionable_operators);

        if (operatorLogicApplies) {
            var shouldPrintOperatorNewline = (
                    in_array(flags.last_text, tokenizer.positionable_operators) &&
                    in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
                ) ||
                in_array(current_token.text, tokenizer.positionable_operators);
            shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
        }

        if (shouldPreserveOrForce) {
            print_newline(false, true);
        } else if (opt.wrap_line_length) {
            if (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens)) {
                // These tokens should never have a newline inserted
                // between them and the following expression.
                return;
            }
            var proposed_line_length = output.current_line.get_character_count() + current_token.text.length +
                (output.space_before_token ? 1 : 0);
            if (proposed_line_length >= opt.wrap_line_length) {
                print_newline(false, true);
            }
        }
    }

    function print_newline(force_newline, preserve_statement_flags) {
        if (!preserve_statement_flags) {
            if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
                var next_token = get_token(1);
                while (flags.mode === MODE.Statement &&
                    !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
                    !flags.do_block) {
                    restore_mode();
                }
            }
        }

        if (output.add_new_line(force_newline)) {
            flags.multiline_frame = true;
        }
    }

    function print_token_line_indentation() {
        if (output.just_added_newline()) {
            if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
                output.current_line.push(current_token.whitespace_before);
                output.space_before_token = false;
            } else if (output.set_indent(flags.indentation_level)) {
                flags.line_indent_level = flags.indentation_level;
            }
        }
    }

    function print_token(printable_token) {
        if (output.raw) {
            output.add_raw_token(current_token);
            return;
        }

        if (opt.comma_first && last_type === 'TK_COMMA' &&
            output.just_added_newline()) {
            if (output.previous_line.last() === ',') {
                var popped = output.previous_line.pop();
                // if the comma was already at the start of the line,
                // pull back onto that line and reprint the indentation
                if (output.previous_line.is_empty()) {
                    output.previous_line.push(popped);
                    output.trim(true);
                    output.current_line.pop();
                    output.trim();
                }

                // add the comma in front of the next token
                print_token_line_indentation();
                output.add_token(',');
                output.space_before_token = true;
            }
        }

        printable_token = printable_token || current_token.text;
        print_token_line_indentation();
        output.add_token(printable_token);
    }

    function indent() {
        flags.indentation_level += 1;
    }

    function deindent() {
        if (flags.indentation_level > 0 &&
            ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level)) {
            flags.indentation_level -= 1;

        }
    }

    function set_mode(mode) {
        if (flags) {
            flag_store.push(flags);
            previous_flags = flags;
        } else {
            previous_flags = create_flags(null, mode);
        }

        flags = create_flags(previous_flags, mode);
    }

    function is_array(mode) {
        return mode === MODE.ArrayLiteral;
    }

    function is_expression(mode) {
        return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }

    function restore_mode() {
        if (flag_store.length > 0) {
            previous_flags = flags;
            flags = flag_store.pop();
            if (previous_flags.mode === MODE.Statement && !opt.unindent_chained_methods) {
                remove_redundant_indentation(output, previous_flags);
            }
        }
    }

    function start_of_object_property() {
        return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (
            (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set'])));
    }

    function start_of_statement() {
        if (
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') ||
            (last_type === 'TK_RESERVED' && flags.last_text === 'do') ||
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens) && !current_token.wanted_newline) ||
            (last_type === 'TK_RESERVED' && flags.last_text === 'else' &&
                !(current_token.type === 'TK_RESERVED' && current_token.text === 'if' && !current_token.comments_before.length)) ||
            (last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)) ||
            (last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement &&
                !flags.in_case &&
                !(current_token.text === '--' || current_token.text === '++') &&
                last_last_text !== 'function' &&
                current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED') ||
            (flags.mode === MODE.ObjectLiteral && (
                (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))))
        ) {

            set_mode(MODE.Statement);
            if (!opt.unindent_chained_methods) {
                indent();
            }

            handle_whitespace_and_comments(current_token, true);

            // Issue #276:
            // If starting a new statement with [if, for, while, do], push to a new line.
            // if (a) if (b) if(c) d(); else e(); else f();
            if (!start_of_object_property()) {
                allow_wrap_or_preserved_newline(
                    current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
            }

            return true;
        }
        return false;
    }

    function all_lines_start_with(lines, c) {
        for (var i = 0; i < lines.length; i++) {
            var line = trim(lines[i]);
            if (line.charAt(0) !== c) {
                return false;
            }
        }
        return true;
    }

    function each_line_matches_indent(lines, indent) {
        var i = 0,
            len = lines.length,
            line;
        for (; i < len; i++) {
            line = lines[i];
            // allow empty lines to pass through
            if (line && line.indexOf(indent) !== 0) {
                return false;
            }
        }
        return true;
    }

    function is_special_word(word) {
        return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
    }

    function get_token(offset) {
        var index = token_pos + (offset || 0);
        return (index < 0 || index >= tokens.length) ? null : tokens[index];
    }

    function handle_start_expr() {
        // The conditional starts the statement if appropriate.
        if (!start_of_statement()) {
            handle_whitespace_and_comments(current_token);
        }

        var next_mode = MODE.Expression;
        if (current_token.text === '[') {

            if (last_type === 'TK_WORD' || flags.last_text === ')') {
                // this is array index specifier, break immediately
                // a[x], fn()[x]
                if (last_type === 'TK_RESERVED' && in_array(flags.last_text, tokenizer.line_starters)) {
                    output.space_before_token = true;
                }
                set_mode(next_mode);
                print_token();
                indent();
                if (opt.space_in_paren) {
                    output.space_before_token = true;
                }
                return;
            }

            next_mode = MODE.ArrayLiteral;
            if (is_array(flags.mode)) {
                if (flags.last_text === '[' ||
                    (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
                    // ], [ goes to new line
                    // }, [ goes to new line
                    if (!opt.keep_array_indentation) {
                        print_newline();
                    }
                }
            }

        } else {
            if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
                next_mode = MODE.ForInitializer;
            } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
                next_mode = MODE.Conditional;
            } else {
                // next_mode = MODE.Expression;
            }
        }

        if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
            print_newline();
        } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
            // TODO: Consider whether forcing this is required.  Review failing tests when removed.
            allow_wrap_or_preserved_newline(current_token.wanted_newline);
            // do nothing on (( and )( and ][ and ]( and .(
        } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
            output.space_before_token = true;
        } else if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
            (flags.last_text === '*' &&
                (in_array(last_last_text, ['function', 'yield']) ||
                    (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
            // function() vs function ()
            // yield*() vs yield* ()
            // function*() vs function* ()
            if (opt.space_after_anon_function) {
                output.space_before_token = true;
            }
        } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, tokenizer.line_starters) || flags.last_text === 'catch')) {
            if (opt.space_before_conditional) {
                output.space_before_token = true;
            }
        }

        // Should be a space between await and an IIFE, or async and an arrow function
        if (current_token.text === '(' && last_type === 'TK_RESERVED' && in_array(flags.last_word, ['await', 'async'])) {
            output.space_before_token = true;
        }

        // Support of this kind of newline preservation.
        // a = (b &&
        //     (c || d));
        if (current_token.text === '(') {
            if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                if (!start_of_object_property()) {
                    allow_wrap_or_preserved_newline();
                }
            }
        }

        // Support preserving wrapped arrow function expressions
        // a.b('c',
        //     () => d.e
        // )
        if (current_token.text === '(' && last_type !== 'TK_WORD' && last_type !== 'TK_RESERVED') {
            allow_wrap_or_preserved_newline();
        }

        set_mode(next_mode);
        print_token();
        if (opt.space_in_paren) {
            output.space_before_token = true;
        }

        // In all cases, if we newline while inside an expression it should be indented.
        indent();
    }

    function handle_end_expr() {
        // statements inside expressions are not valid syntax, but...
        // statements must all be closed when their container closes
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }

        handle_whitespace_and_comments(current_token);

        if (flags.multiline_frame) {
            allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
        }

        if (opt.space_in_paren) {
            if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
                // () [] no inner space in empty parens like these, ever, ref #320
                output.trim();
                output.space_before_token = false;
            } else {
                output.space_before_token = true;
            }
        }
        if (current_token.text === ']' && opt.keep_array_indentation) {
            print_token();
            restore_mode();
        } else {
            restore_mode();
            print_token();
        }
        remove_redundant_indentation(output, previous_flags);

        // do {} while () // no statement required after
        if (flags.do_while && previous_flags.mode === MODE.Conditional) {
            previous_flags.mode = MODE.Expression;
            flags.do_block = false;
            flags.do_while = false;

        }
    }

    function handle_start_block() {
        handle_whitespace_and_comments(current_token);

        // Check if this is should be treated as a ObjectLiteral
        var next_token = get_token(1);
        var second_token = get_token(2);
        if (second_token && (
                (in_array(second_token.text, [':', ',']) && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED'])) ||
                (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED']))
            )) {
            // We don't support TypeScript,but we didn't break it for a very long time.
            // We'll try to keep not breaking it.
            if (!in_array(last_last_text, ['class', 'interface'])) {
                set_mode(MODE.ObjectLiteral);
            } else {
                set_mode(MODE.BlockStatement);
            }
        } else if (last_type === 'TK_OPERATOR' && flags.last_text === '=>') {
            // arrow function: (param1, paramN) => { statements }
            set_mode(MODE.BlockStatement);
        } else if (in_array(last_type, ['TK_EQUALS', 'TK_START_EXPR', 'TK_COMMA', 'TK_OPERATOR']) ||
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw', 'import', 'default']))
        ) {
            // Detecting shorthand function syntax is difficult by scanning forward,
            //     so check the surrounding context.
            // If the block is being returned, imported, export default, passed as arg,
            //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
            set_mode(MODE.ObjectLiteral);
        } else {
            set_mode(MODE.BlockStatement);
        }

        var empty_braces = !next_token.comments_before.length && next_token.text === '}';
        var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
            last_type === 'TK_END_EXPR';

        if (opt.brace_preserve_inline) // check for inline, set inline_frame if so
        {
            // search forward for a newline wanted inside this block
            var index = 0;
            var check_token = null;
            flags.inline_frame = true;
            do {
                index += 1;
                check_token = get_token(index);
                if (check_token.wanted_newline) {
                    flags.inline_frame = false;
                    break;
                }
            } while (check_token.type !== 'TK_EOF' &&
                !(check_token.type === 'TK_END_BLOCK' && check_token.opened === current_token));
        }

        if ((opt.brace_style === "expand" ||
                (opt.brace_style === "none" && current_token.wanted_newline)) &&
            !flags.inline_frame) {
            if (last_type !== 'TK_OPERATOR' &&
                (empty_anonymous_function ||
                    last_type === 'TK_EQUALS' ||
                    (last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
                output.space_before_token = true;
            } else {
                print_newline(false, true);
            }
        } else { // collapse || inline_frame
            if (is_array(previous_flags.mode) && (last_type === 'TK_START_EXPR' || last_type === 'TK_COMMA')) {
                if (last_type === 'TK_COMMA' || opt.space_in_paren) {
                    output.space_before_token = true;
                }

                if (last_type === 'TK_COMMA' || (last_type === 'TK_START_EXPR' && flags.inline_frame)) {
                    allow_wrap_or_preserved_newline();
                    previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
                    flags.multiline_frame = false;
                }
            }
            if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                if (last_type === 'TK_START_BLOCK' && !flags.inline_frame) {
                    print_newline();
                } else {
                    output.space_before_token = true;
                }
            }
        }
        print_token();
        indent();
    }

    function handle_end_block() {
        // statements must all be closed when their container closes
        handle_whitespace_and_comments(current_token);

        while (flags.mode === MODE.Statement) {
            restore_mode();
        }

        var empty_braces = last_type === 'TK_START_BLOCK';

        if (flags.inline_frame && !empty_braces) { // try inline_frame (only set if opt.braces-preserve-inline) first
            output.space_before_token = true;
        } else if (opt.brace_style === "expand") {
            if (!empty_braces) {
                print_newline();
            }
        } else {
            // skip {}
            if (!empty_braces) {
                if (is_array(flags.mode) && opt.keep_array_indentation) {
                    // we REALLY need a newline here, but newliner would skip that
                    opt.keep_array_indentation = false;
                    print_newline();
                    opt.keep_array_indentation = true;

                } else {
                    print_newline();
                }
            }
        }
        restore_mode();
        print_token();
    }

    function handle_word() {
        if (current_token.type === 'TK_RESERVED') {
            if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
                current_token.type = 'TK_WORD';
            } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
                current_token.type = 'TK_WORD';
            } else if (flags.mode === MODE.ObjectLiteral) {
                var next_token = get_token(1);
                if (next_token.text === ':') {
                    current_token.type = 'TK_WORD';
                }
            }
        }

        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
                flags.declaration_statement = true;
            }
        } else if (current_token.wanted_newline && !is_expression(flags.mode) &&
            (last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) &&
            last_type !== 'TK_EQUALS' &&
            (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
            handle_whitespace_and_comments(current_token);
            print_newline();
        } else {
            handle_whitespace_and_comments(current_token);
        }

        if (flags.do_block && !flags.do_while) {
            if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
                // do {} ## while ()
                output.space_before_token = true;
                print_token();
                output.space_before_token = true;
                flags.do_while = true;
                return;
            } else {
                // do {} should always have while as the next word.
                // if we don't see the expected while, recover
                print_newline();
                flags.do_block = false;
            }
        }

        // if may be followed by else, or not
        // Bare/inline ifs are tricky
        // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
        if (flags.if_block) {
            if (!flags.else_block && (current_token.type === 'TK_RESERVED' && current_token.text === 'else')) {
                flags.else_block = true;
            } else {
                while (flags.mode === MODE.Statement) {
                    restore_mode();
                }
                flags.if_block = false;
                flags.else_block = false;
            }
        }

        if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
            print_newline();
            if (flags.case_body || opt.jslint_happy) {
                // switch cases following one another
                deindent();
                flags.case_body = false;
            }
            print_token();
            flags.in_case = true;
            flags.in_case_statement = true;
            return;
        }

        if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
            if (!start_of_object_property()) {
                allow_wrap_or_preserved_newline();
            }
        }

        if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
            if (in_array(flags.last_text, ['}', ';']) ||
                (output.just_added_newline() && !(in_array(flags.last_text, ['(', '[', '{', ':', '=', ',']) || last_type === 'TK_OPERATOR'))) {
                // make sure there is a nice clean space of at least one blank line
                // before a new function definition
                if (!output.just_added_blankline() && !current_token.comments_before.length) {
                    print_newline();
                    print_newline(true);
                }
            }
            if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
                if (last_type === 'TK_RESERVED' && (
                        in_array(flags.last_text, ['get', 'set', 'new', 'export', 'async']) ||
                        in_array(flags.last_text, newline_restricted_tokens))) {
                    output.space_before_token = true;
                } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
                    output.space_before_token = true;
                } else {
                    print_newline();
                }
            } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
                // foo = function
                output.space_before_token = true;
            } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
                // (function
            } else {
                print_newline();
            }

            print_token();
            flags.last_word = current_token.text;
            return;
        }

        prefix = 'NONE';

        if (last_type === 'TK_END_BLOCK') {

            if (previous_flags.inline_frame) {
                prefix = 'SPACE';
            } else if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
                prefix = 'NEWLINE';
            } else {
                if (opt.brace_style === "expand" ||
                    opt.brace_style === "end-expand" ||
                    (opt.brace_style === "none" && current_token.wanted_newline)) {
                    prefix = 'NEWLINE';
                } else {
                    prefix = 'SPACE';
                    output.space_before_token = true;
                }
            }
        } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
            // TODO: Should this be for STATEMENT as well?
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
            prefix = 'SPACE';
        } else if (last_type === 'TK_STRING') {
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' ||
            (flags.last_text === '*' &&
                (in_array(last_last_text, ['function', 'yield']) ||
                    (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
            prefix = 'SPACE';
        } else if (last_type === 'TK_START_BLOCK') {
            if (flags.inline_frame) {
                prefix = 'SPACE';
            } else {
                prefix = 'NEWLINE';
            }
        } else if (last_type === 'TK_END_EXPR') {
            output.space_before_token = true;
            prefix = 'NEWLINE';
        }

        if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
            if (flags.inline_frame || flags.last_text === 'else' || flags.last_text === 'export') {
                prefix = 'SPACE';
            } else {
                prefix = 'NEWLINE';
            }

        }

        if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
            if ((!(last_type === 'TK_END_BLOCK' && previous_flags.mode === MODE.BlockStatement) ||
                    opt.brace_style === "expand" ||
                    opt.brace_style === "end-expand" ||
                    (opt.brace_style === "none" && current_token.wanted_newline)) &&
                !flags.inline_frame) {
                print_newline();
            } else {
                output.trim(true);
                var line = output.current_line;
                // If we trimmed and there's something other than a close block before us
                // put a newline back in.  Handles '} // comment' scenario.
                if (line.last() !== '}') {
                    print_newline();
                }
                output.space_before_token = true;
            }
        } else if (prefix === 'NEWLINE') {
            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
                // no newline between 'return nnn'
                output.space_before_token = true;
            } else if (last_type !== 'TK_END_EXPR') {
                if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
                    // no need to force newline on 'var': for (var x = 0...)
                    if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
                        // no newline for } else if {
                        output.space_before_token = true;
                    } else {
                        print_newline();
                    }
                }
            } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
                print_newline();
            }
        } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
            print_newline(); // }, in lists get a newline treatment
        } else if (prefix === 'SPACE') {
            output.space_before_token = true;
        }
        print_token();
        flags.last_word = current_token.text;

        if (current_token.type === 'TK_RESERVED') {
            if (current_token.text === 'do') {
                flags.do_block = true;
            } else if (current_token.text === 'if') {
                flags.if_block = true;
            } else if (current_token.text === 'import') {
                flags.import_block = true;
            } else if (flags.import_block && current_token.type === 'TK_RESERVED' && current_token.text === 'from') {
                flags.import_block = false;
            }
        }
    }

    function handle_semicolon() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // Semicolon can be the start (and end) of a statement
            output.space_before_token = false;
        } else {
            handle_whitespace_and_comments(current_token);
        }

        var next_token = get_token(1);
        while (flags.mode === MODE.Statement &&
            !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
            !flags.do_block) {
            restore_mode();
        }

        // hacky but effective for the moment
        if (flags.import_block) {
            flags.import_block = false;
        }
        print_token();
    }

    function handle_string() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // One difference - strings want at least a space before
            output.space_before_token = true;
        } else {
            handle_whitespace_and_comments(current_token);
            if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.inline_frame) {
                output.space_before_token = true;
            } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                if (!start_of_object_property()) {
                    allow_wrap_or_preserved_newline();
                }
            } else {
                print_newline();
            }
        }
        print_token();
    }

    function handle_equals() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            handle_whitespace_and_comments(current_token);
        }

        if (flags.declaration_statement) {
            // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
            flags.declaration_assignment = true;
        }
        output.space_before_token = true;
        print_token();
        output.space_before_token = true;
    }

    function handle_comma() {
        handle_whitespace_and_comments(current_token, true);

        print_token();
        output.space_before_token = true;
        if (flags.declaration_statement) {
            if (is_expression(flags.parent.mode)) {
                // do not break on comma, for(var a = 1, b = 2)
                flags.declaration_assignment = false;
            }

            if (flags.declaration_assignment) {
                flags.declaration_assignment = false;
                print_newline(false, true);
            } else if (opt.comma_first) {
                // for comma-first, we want to allow a newline before the comma
                // to turn into a newline after the comma, which we will fixup later
                allow_wrap_or_preserved_newline();
            }
        } else if (flags.mode === MODE.ObjectLiteral ||
            (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
            if (flags.mode === MODE.Statement) {
                restore_mode();
            }

            if (!flags.inline_frame) {
                print_newline();
            }
        } else if (opt.comma_first) {
            // EXPR or DO_BLOCK
            // for comma-first, we want to allow a newline before the comma
            // to turn into a newline after the comma, which we will fixup later
            allow_wrap_or_preserved_newline();
        }
    }

    function handle_operator() {
        var isGeneratorAsterisk = current_token.text === '*' &&
            ((last_type === 'TK_RESERVED' && in_array(flags.last_text, ['function', 'yield'])) ||
                (in_array(last_type, ['TK_START_BLOCK', 'TK_COMMA', 'TK_END_BLOCK', 'TK_SEMICOLON']))
            );
        var isUnary = in_array(current_token.text, ['-', '+']) && (
            in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) ||
            in_array(flags.last_text, tokenizer.line_starters) ||
            flags.last_text === ','
        );

        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            var preserve_statement_flags = !isGeneratorAsterisk;
            handle_whitespace_and_comments(current_token, preserve_statement_flags);
        }

        if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
            // "return" had a special handling in TK_WORD. Now we need to return the favor
            output.space_before_token = true;
            print_token();
            return;
        }

        // hack for actionscript's import .*;
        if (current_token.text === '*' && last_type === 'TK_DOT') {
            print_token();
            return;
        }

        if (current_token.text === '::') {
            // no spaces around exotic namespacing syntax operator
            print_token();
            return;
        }

        // Allow line wrapping between operators when operator_position is
        //   set to before or preserve
        if (last_type === 'TK_OPERATOR' && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
            allow_wrap_or_preserved_newline();
        }

        if (current_token.text === ':' && flags.in_case) {
            flags.case_body = true;
            indent();
            print_token();
            print_newline();
            flags.in_case = false;
            return;
        }

        var space_before = true;
        var space_after = true;
        var in_ternary = false;
        if (current_token.text === ':') {
            if (flags.ternary_depth === 0) {
                // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
                space_before = false;
            } else {
                flags.ternary_depth -= 1;
                in_ternary = true;
            }
        } else if (current_token.text === '?') {
            flags.ternary_depth += 1;
        }

        // let's handle the operator_position option prior to any conflicting logic
        if (!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, tokenizer.positionable_operators)) {
            var isColon = current_token.text === ':';
            var isTernaryColon = (isColon && in_ternary);
            var isOtherColon = (isColon && !in_ternary);

            switch (opt.operator_position) {
                case OPERATOR_POSITION.before_newline:
                    // if the current token is : and it's not a ternary statement then we set space_before to false
                    output.space_before_token = !isOtherColon;

                    print_token();

                    if (!isColon || isTernaryColon) {
                        allow_wrap_or_preserved_newline();
                    }

                    output.space_before_token = true;
                    return;

                case OPERATOR_POSITION.after_newline:
                    // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
                    //   then print a newline.

                    output.space_before_token = true;

                    if (!isColon || isTernaryColon) {
                        if (get_token(1).wanted_newline) {
                            print_newline(false, true);
                        } else {
                            allow_wrap_or_preserved_newline();
                        }
                    } else {
                        output.space_before_token = false;
                    }

                    print_token();

                    output.space_before_token = true;
                    return;

                case OPERATOR_POSITION.preserve_newline:
                    if (!isOtherColon) {
                        allow_wrap_or_preserved_newline();
                    }

                    // if we just added a newline, or the current token is : and it's not a ternary statement,
                    //   then we set space_before to false
                    space_before = !(output.just_added_newline() || isOtherColon);

                    output.space_before_token = space_before;
                    print_token();
                    output.space_before_token = true;
                    return;
            }
        }

        if (isGeneratorAsterisk) {
            allow_wrap_or_preserved_newline();
            space_before = false;
            var next_token = get_token(1);
            space_after = next_token && in_array(next_token.type, ['TK_WORD', 'TK_RESERVED']);
        } else if (current_token.text === '...') {
            allow_wrap_or_preserved_newline();
            space_before = last_type === 'TK_START_BLOCK';
            space_after = false;
        } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
            // unary operators (and binary +/- pretending to be unary) special cases

            space_before = false;
            space_after = false;

            // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
            // if there is a newline between -- or ++ and anything else we should preserve it.
            if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
                print_newline(false, true);
            }

            if (flags.last_text === ';' && is_expression(flags.mode)) {
                // for (;; ++i)
                //        ^^^
                space_before = true;
            }

            if (last_type === 'TK_RESERVED') {
                space_before = true;
            } else if (last_type === 'TK_END_EXPR') {
                space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
            } else if (last_type === 'TK_OPERATOR') {
                // a++ + ++b;
                // a - -b
                space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
                // + and - are not unary when preceeded by -- or ++ operator
                // a-- + b
                // a * +b
                // a - -b
                if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
                    space_after = true;
                }
            }


            if (((flags.mode === MODE.BlockStatement && !flags.inline_frame) || flags.mode === MODE.Statement) &&
                (flags.last_text === '{' || flags.last_text === ';')) {
                // { foo; --i }
                // foo(); --bar;
                print_newline();
            }
        }

        output.space_before_token = output.space_before_token || space_before;
        print_token();
        output.space_before_token = space_after;
    }

    function handle_block_comment(preserve_statement_flags) {
        if (output.raw) {
            output.add_raw_token(current_token);
            if (current_token.directives && current_token.directives.preserve === 'end') {
                // If we're testing the raw output behavior, do not allow a directive to turn it off.
                output.raw = opt.test_output_raw;
            }
            return;
        }

        if (current_token.directives) {
            print_newline(false, preserve_statement_flags);
            print_token();
            if (current_token.directives.preserve === 'start') {
                output.raw = true;
            }
            print_newline(false, true);
            return;
        }

        // inline block
        if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
            output.space_before_token = true;
            print_token();
            output.space_before_token = true;
            return;
        }

        var lines = split_linebreaks(current_token.text);
        var j; // iterator for this case
        var javadoc = false;
        var starless = false;
        var lastIndent = current_token.whitespace_before;
        var lastIndentLength = lastIndent.length;

        // block comment starts with a new line
        print_newline(false, preserve_statement_flags);
        if (lines.length > 1) {
            javadoc = all_lines_start_with(lines.slice(1), '*');
            starless = each_line_matches_indent(lines.slice(1), lastIndent);
        }

        // first line always indented
        print_token(lines[0]);
        for (j = 1; j < lines.length; j++) {
            print_newline(false, true);
            if (javadoc) {
                // javadoc: reformat and re-indent
                print_token(' ' + ltrim(lines[j]));
            } else if (starless && lines[j].length > lastIndentLength) {
                // starless: re-indent non-empty content, avoiding trim
                print_token(lines[j].substring(lastIndentLength));
            } else {
                // normal comments output raw
                output.add_token(lines[j]);
            }
        }

        // for comments of more than one line, make sure there's a new line after
        print_newline(false, preserve_statement_flags);
    }

    function handle_comment(preserve_statement_flags) {
        if (current_token.wanted_newline) {
            print_newline(false, preserve_statement_flags);
        } else {
            output.trim(true);
        }

        output.space_before_token = true;
        print_token();
        print_newline(false, preserve_statement_flags);
    }

    function handle_dot() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            handle_whitespace_and_comments(current_token, true);
        }

        if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
            output.space_before_token = true;
        } else {
            // allow preserved newlines before dots in general
            // force newlines on dots after close paren when break_chained - for bar().baz()
            allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
        }

        print_token();
    }

    function handle_unknown(preserve_statement_flags) {
        print_token();

        if (current_token.text[current_token.text.length - 1] === '\n') {
            print_newline(false, preserve_statement_flags);
        }
    }

    function handle_eof() {
        // Unwind any open statements
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }
        handle_whitespace_and_comments(current_token);
    }
}

module.exports.Beautifier = Beautifier;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function InputScanner(input) {
    var _input = input;
    var _input_length = _input.length;
    var _position = 0;

    this.back = function() {
        _position -= 1;
    };

    this.hasNext = function() {
        return _position < _input_length;
    };

    this.next = function() {
        var val = null;
        if (this.hasNext()) {
            val = _input.charAt(_position);
            _position += 1;
        }
        return val;
    };

    this.peek = function(index) {
        var val = null;
        index = index || 0;
        index += _position;
        if (index >= 0 && index < _input_length) {
            val = _input.charAt(index);
        }
        return val;
    };

    this.peekCharCode = function(index) {
        var val = 0;
        index = index || 0;
        index += _position;
        if (index >= 0 && index < _input_length) {
            val = _input.charCodeAt(index);
        }
        return val;
    };

    this.test = function(pattern, index) {
        index = index || 0;
        pattern.lastIndex = _position + index;
        return pattern.test(_input);
    };

    this.testChar = function(pattern, index) {
        var val = this.peek(index);
        return val !== null && pattern.test(val);
    };

    this.match = function(pattern) {
        pattern.lastIndex = _position;
        var pattern_match = pattern.exec(_input);
        if (pattern_match && pattern_match.index === _position) {
            _position += pattern_match[0].length;
        } else {
            pattern_match = null;
        }
        return pattern_match;
    };
}


module.exports.InputScanner = InputScanner;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
    var _character_count = 0;
    // use indent_count as a marker for lines that have preserved indentation
    var _indent_count = -1;

    var _items = [];
    var _empty = true;

    this.set_indent = function(level) {
        _character_count = parent.baseIndentLength + level * parent.indent_length;
        _indent_count = level;
    };

    this.get_character_count = function() {
        return _character_count;
    };

    this.is_empty = function() {
        return _empty;
    };

    this.last = function() {
        if (!this._empty) {
            return _items[_items.length - 1];
        } else {
            return null;
        }
    };

    this.push = function(input) {
        _items.push(input);
        _character_count += input.length;
        _empty = false;
    };

    this.pop = function() {
        var item = null;
        if (!_empty) {
            item = _items.pop();
            _character_count -= item.length;
            _empty = _items.length === 0;
        }
        return item;
    };

    this.remove_indent = function() {
        if (_indent_count > 0) {
            _indent_count -= 1;
            _character_count -= parent.indent_length;
        }
    };

    this.trim = function() {
        while (this.last() === ' ') {
            _items.pop();
            _character_count -= 1;
        }
        _empty = _items.length === 0;
    };

    this.toString = function() {
        var result = '';
        if (!this._empty) {
            if (_indent_count >= 0) {
                result = parent.indent_cache[_indent_count];
            }
            result += _items.join('');
        }
        return result;
    };
}

function Output(indent_string, baseIndentString) {
    baseIndentString = baseIndentString || '';
    this.indent_cache = [baseIndentString];
    this.baseIndentLength = baseIndentString.length;
    this.indent_length = indent_string.length;
    this.raw = false;

    var lines = [];
    this.baseIndentString = baseIndentString;
    this.indent_string = indent_string;
    this.previous_line = null;
    this.current_line = null;
    this.space_before_token = false;

    this.add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = new OutputLine(this);
        lines.push(this.current_line);
    };

    // initialize
    this.add_outputline();


    this.get_line_number = function() {
        return lines.length;
    };

    // Using object instead of string to allow for later expansion of info about each line
    this.add_new_line = function(force_newline) {
        if (this.get_line_number() === 1 && this.just_added_newline()) {
            return false; // no newline on start of file
        }

        if (force_newline || !this.just_added_newline()) {
            if (!this.raw) {
                this.add_outputline();
            }
            return true;
        }

        return false;
    };

    this.get_code = function(end_with_newline, eol) {
        var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };

    this.set_indent = function(level) {
        // Never indent your first output indent at the start of the file
        if (lines.length > 1) {
            while (level >= this.indent_cache.length) {
                this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
            }

            this.current_line.set_indent(level);
            return true;
        }
        this.current_line.set_indent(0);
        return false;
    };

    this.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
            this.add_outputline();
        }
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
    };

    this.add_token = function(printable_token) {
        this.add_space_before_token();
        this.current_line.push(printable_token);
    };

    this.add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
            this.current_line.push(' ');
        }
        this.space_before_token = false;
    };

    this.remove_indent = function(index) {
        var output_length = lines.length;
        while (index < output_length) {
            lines[index].remove_indent();
            index++;
        }
    };

    this.trim = function(eat_newlines) {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

        this.current_line.trim(indent_string, baseIndentString);

        while (eat_newlines && lines.length > 1 &&
            this.current_line.is_empty()) {
            lines.pop();
            this.current_line = lines[lines.length - 1];
            this.current_line.trim();
        }

        this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
    };

    this.just_added_newline = function() {
        return this.current_line.is_empty();
    };

    this.just_added_blankline = function() {
        if (this.just_added_newline()) {
            if (lines.length === 1) {
                return true; // start of the file and newline = blank
            }

            var line = lines[lines.length - 2];
            return line.is_empty();
        }
        return false;
    };
}

module.exports.Output = Output;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function Token(type, text, newlines, whitespace_before, parent) {
    this.type = type;
    this.text = text;

    // comments_before are
    // comments that have a new line before them
    // and may or may not have a newline after
    // this is a set of comments before
    this.comments_before = /* inline comment*/ [];


    this.comments_after = []; // no new line before and newline after
    this.newlines = newlines || 0;
    this.wanted_newline = newlines > 0;
    this.whitespace_before = whitespace_before || '';
    this.parent = parent || null;
    this.opened = null;
    this.directives = null;
}

module.exports.Token = Token;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(1).Beautifier;

function js_beautify(js_source_text, options) {
    var beautifier = new Beautifier(js_source_text, options);
    return beautifier.beautify();
}

module.exports = js_beautify;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var InputScanner = __webpack_require__(2).InputScanner;
var Token = __webpack_require__(5).Token;
var acorn = __webpack_require__(0);

function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function in_array(what, arr) {
    for (var i = 0; i < arr.length; i += 1) {
        if (arr[i] === what) {
            return true;
        }
    }
    return false;
}

function Tokenizer(input_string, opts) {

    var whitespace = "\n\r\t ".split('');
    var digit = /[0-9]/;
    var digit_bin = /[01]/;
    var digit_oct = /[01234567]/;
    var digit_hex = /[0123456789abcdefABCDEF]/;

    this.positionable_operators = '!= !== % & && * ** + - / : < << <= == === > >= >> >>> ? ^ | ||'.split(' ');
    var punct = this.positionable_operators.concat(
        // non-positionable operators - these do not follow operator position settings
        '! %= &= *= **= ++ += , -- -= /= :: <<= = => >>= >>>= ^= |= ~ ...'.split(' '));

    // words which should always start on new line.
    this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
    var reserved_words = this.line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);

    //  /* ... */ comment ends with nearest */ or end of file
    var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;

    // comment ends just before nearest linefeed or end of file
    var comment_pattern = /([^\n\r\u2028\u2029]*)/g;

    var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
    var directive_pattern = / (\w+)[:](\w+)/g;
    var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;

    var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

    var n_newlines, whitespace_before_token, in_html_comment, tokens;
    var input;

    this.tokenize = function() {
        input = new InputScanner(input_string);
        in_html_comment = false;
        tokens = [];

        var next, last;
        var token_values;
        var open = null;
        var open_stack = [];
        var comments = [];

        while (!(last && last.type === 'TK_EOF')) {
            token_values = tokenize_next();
            next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
            while (next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
                if (next.type === 'TK_BLOCK_COMMENT') {
                    next.directives = token_values[2];
                }
                comments.push(next);
                token_values = tokenize_next();
                next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
            }

            if (comments.length) {
                next.comments_before = comments;
                comments = [];
            }

            if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
                next.parent = last;
                open_stack.push(open);
                open = next;
            } else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') &&
                (open && (
                    (next.text === ']' && open.text === '[') ||
                    (next.text === ')' && open.text === '(') ||
                    (next.text === '}' && open.text === '{')))) {
                next.parent = open.parent;
                next.opened = open;

                open = open_stack.pop();
            }

            tokens.push(next);
            last = next;
        }

        return tokens;
    };

    function get_directives(text) {
        if (!text.match(directives_block_pattern)) {
            return null;
        }

        var directives = {};
        directive_pattern.lastIndex = 0;
        var directive_match = directive_pattern.exec(text);

        while (directive_match) {
            directives[directive_match[1]] = directive_match[2];
            directive_match = directive_pattern.exec(text);
        }

        return directives;
    }

    function tokenize_next() {
        var resulting_string;
        var whitespace_on_this_line = [];

        n_newlines = 0;
        whitespace_before_token = '';

        var c = input.next();

        if (c === null) {
            return ['', 'TK_EOF'];
        }

        var last_token;
        if (tokens.length) {
            last_token = tokens[tokens.length - 1];
        } else {
            // For the sake of tokenizing we can pretend that there was on open brace to start
            last_token = new Token('TK_START_BLOCK', '{');
        }

        while (in_array(c, whitespace)) {

            if (acorn.newline.test(c)) {
                if (!(c === '\n' && input.peek(-2) === '\r')) {
                    n_newlines += 1;
                    whitespace_on_this_line = [];
                }
            } else {
                whitespace_on_this_line.push(c);
            }

            c = input.next();

            if (c === null) {
                return ['', 'TK_EOF'];
            }
        }

        if (whitespace_on_this_line.length) {
            whitespace_before_token = whitespace_on_this_line.join('');
        }

        if (digit.test(c) || (c === '.' && input.testChar(digit))) {
            var allow_decimal = true;
            var allow_e = true;
            var local_digit = digit;

            if (c === '0' && input.testChar(/[XxOoBb]/)) {
                // switch to hex/oct/bin number, no decimal or e, just hex/oct/bin digits
                allow_decimal = false;
                allow_e = false;
                if (input.testChar(/[Bb]/)) {
                    local_digit = digit_bin;
                } else if (input.testChar(/[Oo]/)) {
                    local_digit = digit_oct;
                } else {
                    local_digit = digit_hex;
                }
                c += input.next();
            } else if (c === '.') {
                // Already have a decimal for this literal, don't allow another
                allow_decimal = false;
            } else {
                // we know this first loop will run.  It keeps the logic simpler.
                c = '';
                input.back();
            }

            // Add the digits
            while (input.testChar(local_digit)) {
                c += input.next();

                if (allow_decimal && input.peek() === '.') {
                    c += input.next();
                    allow_decimal = false;
                }

                // a = 1.e-7 is valid, so we test for . then e in one loop
                if (allow_e && input.testChar(/[Ee]/)) {
                    c += input.next();

                    if (input.testChar(/[+-]/)) {
                        c += input.next();
                    }

                    allow_e = false;
                    allow_decimal = false;
                }
            }

            return [c, 'TK_WORD'];
        }

        if (acorn.isIdentifierStart(input.peekCharCode(-1))) {
            if (input.hasNext()) {
                while (acorn.isIdentifierChar(input.peekCharCode())) {
                    c += input.next();
                    if (!input.hasNext()) {
                        break;
                    }
                }
            }

            if (!(last_token.type === 'TK_DOT' ||
                    (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get']))) &&
                in_array(c, reserved_words)) {
                if (c === 'in' || c === 'of') { // hack for 'in' and 'of' operators
                    return [c, 'TK_OPERATOR'];
                }
                return [c, 'TK_RESERVED'];
            }

            return [c, 'TK_WORD'];
        }

        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }

        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }

        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }

        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }

        if (c === ';') {
            return [c, 'TK_SEMICOLON'];
        }

        if (c === '/') {
            var comment = '';
            var comment_match;
            // peek for comment /* ... */
            if (input.peek() === '*') {
                input.next();
                comment_match = input.match(block_comment_pattern);
                comment = '/*' + comment_match[0];
                var directives = get_directives(comment);
                if (directives && directives.ignore === 'start') {
                    comment_match = input.match(directives_end_ignore_pattern);
                    comment += comment_match[0];
                }
                comment = comment.replace(acorn.allLineBreaks, '\n');
                return [comment, 'TK_BLOCK_COMMENT', directives];
            }
            // peek for comment // ...
            if (input.peek() === '/') {
                input.next();
                comment_match = input.match(comment_pattern);
                comment = '//' + comment_match[0];
                return [comment, 'TK_COMMENT'];
            }

        }

        var startXmlRegExp = /<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;

        if (c === '`' || c === "'" || c === '"' || // string
            (
                (c === '/') || // regexp
                (opts.e4x && c === "<" && input.test(startXmlRegExp, -1)) // xml
            ) && ( // regex and xml can only appear in specific locations during parsing
                (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
                (last_token.type === 'TK_END_EXPR' && last_token.text === ')' &&
                    last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for'])) ||
                (in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
                    'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
                ]))
            )) {

            var sep = c,
                esc = false,
                has_char_escapes = false;

            resulting_string = c;

            if (sep === '/') {
                //
                // handle regexp
                //
                var in_char_class = false;
                while (input.hasNext() &&
                    ((esc || in_char_class || input.peek() !== sep) &&
                        !input.testChar(acorn.newline))) {
                    resulting_string += input.peek();
                    if (!esc) {
                        esc = input.peek() === '\\';
                        if (input.peek() === '[') {
                            in_char_class = true;
                        } else if (input.peek() === ']') {
                            in_char_class = false;
                        }
                    } else {
                        esc = false;
                    }
                    input.next();
                }
            } else if (opts.e4x && sep === '<') {
                //
                // handle e4x xml literals
                //

                var xmlRegExp = /[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;
                input.back();
                var xmlStr = '';
                var match = input.match(startXmlRegExp);
                if (match) {
                    // Trim root tag to attempt to
                    var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
                    var isCurlyRoot = rootTag.indexOf('{') === 0;
                    var depth = 0;
                    while (match) {
                        var isEndTag = !!match[1];
                        var tagName = match[2];
                        var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
                        if (!isSingletonTag &&
                            (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
                            if (isEndTag) {
                                --depth;
                            } else {
                                ++depth;
                            }
                        }
                        xmlStr += match[0];
                        if (depth <= 0) {
                            break;
                        }
                        match = input.match(xmlRegExp);
                    }
                    // if we didn't close correctly, keep unformatted.
                    if (!match) {
                        xmlStr += input.match(/[\s\S]*/g)[0];
                    }
                    xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
                    return [xmlStr, "TK_STRING"];
                }
            } else {
                //
                // handle string
                //
                var parse_string = function(delimiter, allow_unescaped_newlines, start_sub) {
                    // Template strings can travers lines without escape characters.
                    // Other strings cannot
                    var current_char;
                    while (input.hasNext()) {
                        current_char = input.peek();
                        if (!(esc || (current_char !== delimiter &&
                                (allow_unescaped_newlines || !acorn.newline.test(current_char))))) {
                            break;
                        }

                        // Handle \r\n linebreaks after escapes or in template strings
                        if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
                            if (current_char === '\r' && input.peek(1) === '\n') {
                                input.next();
                                current_char = input.peek();
                            }
                            resulting_string += '\n';
                        } else {
                            resulting_string += current_char;
                        }

                        if (esc) {
                            if (current_char === 'x' || current_char === 'u') {
                                has_char_escapes = true;
                            }
                            esc = false;
                        } else {
                            esc = current_char === '\\';
                        }

                        input.next();

                        if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
                            if (delimiter === '`') {
                                parse_string('}', allow_unescaped_newlines, '`');
                            } else {
                                parse_string('`', allow_unescaped_newlines, '${');
                            }

                            if (input.hasNext()) {
                                resulting_string += input.next();
                            }
                        }
                    }
                };

                if (sep === '`') {
                    parse_string('`', true, '${');
                } else {
                    parse_string(sep);
                }
            }

            if (has_char_escapes && opts.unescape_strings) {
                resulting_string = unescape_string(resulting_string);
            }

            if (input.peek() === sep) {
                resulting_string += sep;
                input.next();

                if (sep === '/') {
                    // regexps may have modifiers /regexp/MOD , so fetch those, too
                    // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
                    while (input.hasNext() && acorn.isIdentifierStart(input.peekCharCode())) {
                        resulting_string += input.next();
                    }
                }
            }
            return [resulting_string, 'TK_STRING'];
        }

        if (c === '#') {

            if (tokens.length === 0 && input.peek() === '!') {
                // shebang
                resulting_string = c;
                while (input.hasNext() && c !== '\n') {
                    c = input.next();
                    resulting_string += c;
                }
                return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
            }



            // Spidermonkey-specific sharp variables for circular references
            // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
            // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
            var sharp = '#';
            if (input.hasNext() && input.testChar(digit)) {
                do {
                    c = input.next();
                    sharp += c;
                } while (input.hasNext() && c !== '#' && c !== '=');
                if (c === '#') {
                    //
                } else if (input.peek() === '[' && input.peek(1) === ']') {
                    sharp += '[]';
                    input.next();
                    input.next();
                } else if (input.peek() === '{' && input.peek(1) === '}') {
                    sharp += '{}';
                    input.next();
                    input.next();
                }
                return [sharp, 'TK_WORD'];
            }
        }

        if (c === '<' && (input.peek() === '?' || input.peek() === '%')) {
            input.back();
            var template_match = input.match(template_pattern);
            if (template_match) {
                c = template_match[0];
                c = c.replace(acorn.allLineBreaks, '\n');
                return [c, 'TK_STRING'];
            }
        }

        if (c === '<' && input.match(/\!--/g)) {
            c = '<!--';
            while (input.hasNext() && !input.testChar(acorn.newline)) {
                c += input.next();
            }
            in_html_comment = true;
            return [c, 'TK_COMMENT'];
        }

        if (c === '-' && in_html_comment && input.match(/->/g)) {
            in_html_comment = false;
            return ['-->', 'TK_COMMENT'];
        }

        if (c === '.') {
            if (input.peek() === '.' && input.peek(1) === '.') {
                c += input.next() + input.next();
                return [c, 'TK_OPERATOR'];
            }
            return [c, 'TK_DOT'];
        }

        if (in_array(c, punct)) {
            while (input.hasNext() && in_array(c + input.peek(), punct)) {
                c += input.next();
                if (!input.hasNext()) {
                    break;
                }
            }

            if (c === ',') {
                return [c, 'TK_COMMA'];
            } else if (c === '=') {
                return [c, 'TK_EQUALS'];
            } else {
                return [c, 'TK_OPERATOR'];
            }
        }

        return [c, 'TK_UNKNOWN'];
    }


    function unescape_string(s) {
        // You think that a regex would work for this
        // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
        //         return String.fromCharCode(parseInt(val, 16));
        //     })
        // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
        var out = '',
            escaped = 0;

        var input_scan = new InputScanner(s);
        var matched = null;

        while (input_scan.hasNext()) {
            // Keep any whitespace, non-slash characters
            // also keep slash pairs.
            matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

            if (matched) {
                out += matched[0];
            }

            if (input_scan.peek() === '\\') {
                input_scan.next();
                if (input_scan.peek() === 'x') {
                    matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
                } else if (input_scan.peek() === 'u') {
                    matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
                } else {
                    out += '\\';
                    if (input_scan.hasNext()) {
                        out += input_scan.next();
                    }
                    continue;
                }

                // If there's some error decoding, return the original string
                if (!matched) {
                    return s;
                }

                escaped = parseInt(matched[1], 16);

                if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
                    // we bail out on \x7f..\xff,
                    // leaving whole string escaped,
                    // as it's probably completely binary
                    return s;
                } else if (escaped >= 0x00 && escaped < 0x20) {
                    // leave 0x00...0x1f escaped
                    out += '\\' + matched[0];
                    continue;
                } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
                    // single-quote, apostrophe, backslash - escape these
                    out += '\\' + String.fromCharCode(escaped);
                } else {
                    out += String.fromCharCode(escaped);
                }
            }
        }

        return out;
    }
}

module.exports.Tokenizer = Tokenizer;

/***/ })
/******/ ]);
var js_beautify = legacy_beautify_js;
/* Footer */
if (typeof undefined === "function" && undefined.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    undefined([], function() {
        return { js_beautify: js_beautify };
    });
} else {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var js_beautify = require("beautify").js_beautify`.
    exports.js_beautify = js_beautify;
}

}());
});

unwrapExports(beautify);
var beautify_1 = beautify.js_beautify;

var beautifyCss = createCommonjsModule(function (module, exports) {
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/

// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/

(function() {
var legacy_beautify_css =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(2).mergeOpts;
var acorn = __webpack_require__(1);
var Output = __webpack_require__(3).Output;


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

function Beautifier(source_text, options) {
    options = options || {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'css');

    source_text = source_text || '';

    var newlinesFromLastWSEat = 0;
    var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    var indentCharacter = options.indent_char || ' ';
    var preserve_newlines = (options.preserve_newlines === undefined) ? false : options.preserve_newlines;
    var selectorSeparatorNewline = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
    var end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    var newline_between_rules = (options.newline_between_rules === undefined) ? true : options.newline_between_rules;
    var space_around_combinator = (options.space_around_combinator === undefined) ? false : options.space_around_combinator;
    space_around_combinator = space_around_combinator || ((options.space_around_selector_separator === undefined) ? false : options.space_around_selector_separator);
    var eol = options.eol ? options.eol : 'auto';

    if (options.indent_with_tabs) {
        indentCharacter = '\t';
        indentSize = 1;
    }

    if (eol === 'auto') {
        eol = '\n';
        if (source_text && lineBreak.test(source_text || '')) {
            eol = source_text.match(lineBreak)[0];
        }
    }

    eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    // HACK: newline parsing inconsistent. This brute force normalizes the input.
    source_text = source_text.replace(allLineBreaks, '\n');

    // tokenizer
    var whiteRe = /^\s+$/;

    var pos = -1,
        ch;
    var parenLevel = 0;

    function next() {
        ch = source_text.charAt(++pos);
        return ch || '';
    }

    function peek(skipWhitespace) {
        var result = '';
        var prev_pos = pos;
        if (skipWhitespace) {
            eatWhitespace();
        }
        result = source_text.charAt(pos + 1) || '';
        pos = prev_pos - 1;
        next();
        return result;
    }

    function eatString(endChars) {
        var start = pos;
        while (next()) {
            if (ch === "\\") {
                next();
            } else if (endChars.indexOf(ch) !== -1) {
                break;
            } else if (ch === "\n") {
                break;
            }
        }
        return source_text.substring(start, pos + 1);
    }

    function peekString(endChar) {
        var prev_pos = pos;
        var str = eatString(endChar);
        pos = prev_pos - 1;
        next();
        return str;
    }

    function eatWhitespace(preserve_newlines_local) {
        var result = 0;
        while (whiteRe.test(peek())) {
            next();
            if (ch === '\n' && preserve_newlines_local && preserve_newlines) {
                output.add_new_line(true);
                result++;
            }
        }
        newlinesFromLastWSEat = result;
        return result;
    }

    function skipWhitespace() {
        var result = '';
        if (ch && whiteRe.test(ch)) {
            result = ch;
        }
        while (whiteRe.test(next())) {
            result += ch;
        }
        return result;
    }

    function eatComment() {
        var start = pos;
        var singleLine = peek() === "/";
        next();
        while (next()) {
            if (!singleLine && ch === "*" && peek() === "/") {
                next();
                break;
            } else if (singleLine && ch === "\n") {
                return source_text.substring(start, pos);
            }
        }

        return source_text.substring(start, pos) + ch;
    }


    function lookBack(str) {
        return source_text.substring(pos - str.length, pos).toLowerCase() ===
            str;
    }

    // Nested pseudo-class if we are insideRule
    // and the next special character found opens
    // a new block
    function foundNestedPseudoClass() {
        var openParen = 0;
        for (var i = pos + 1; i < source_text.length; i++) {
            var ch = source_text.charAt(i);
            if (ch === "{") {
                return true;
            } else if (ch === '(') {
                // pseudoclasses can contain ()
                openParen += 1;
            } else if (ch === ')') {
                if (openParen === 0) {
                    return false;
                }
                openParen -= 1;
            } else if (ch === ";" || ch === "}") {
                return false;
            }
        }
        return false;
    }

    // printer
    var baseIndentString = '';
    var preindent_index = 0;
    if (source_text && source_text.length) {
        while ((source_text.charAt(preindent_index) === ' ' ||
                source_text.charAt(preindent_index) === '\t')) {
            preindent_index += 1;
        }
        baseIndentString = source_text.substring(0, preindent_index);
        source_text = source_text.substring(preindent_index);
    }


    var singleIndent = new Array(indentSize + 1).join(indentCharacter);
    var indentLevel;
    var nestedLevel;
    var output;

    function print_string(output_string) {
        if (output.just_added_newline()) {
            output.set_indent(indentLevel);
        }
        output.add_token(output_string);
    }

    function preserveSingleSpace(isAfterSpace) {
        if (isAfterSpace) {
            output.space_before_token = true;
        }
    }

    function indent() {
        indentLevel++;
    }

    function outdent() {
        if (indentLevel > 0) {
            indentLevel--;
        }
    }

    /*_____________________--------------------_____________________*/

    this.beautify = function() {
        // reset
        output = new Output(singleIndent, baseIndentString);
        indentLevel = 0;
        nestedLevel = 0;

        pos = -1;
        ch = null;
        parenLevel = 0;

        var insideRule = false;
        var insidePropertyValue = false;
        var enteringConditionalGroup = false;
        var top_ch = '';
        var last_top_ch = '';

        while (true) {
            var whitespace = skipWhitespace();
            var isAfterSpace = whitespace !== '';
            var isAfterNewline = whitespace.indexOf('\n') !== -1;
            last_top_ch = top_ch;
            top_ch = ch;

            if (!ch) {
                break;
            } else if (ch === '/' && peek() === '*') { /* css comment */
                var header = indentLevel === 0;

                if (isAfterNewline || header) {
                    output.add_new_line();
                }

                print_string(eatComment());
                output.add_new_line();
                if (header) {
                    output.add_new_line(true);
                }
            } else if (ch === '/' && peek() === '/') { // single line comment
                if (!isAfterNewline && last_top_ch !== '{') {
                    output.trim(true);
                }
                output.space_before_token = true;
                print_string(eatComment());
                output.add_new_line();
            } else if (ch === '@') {
                preserveSingleSpace(isAfterSpace);

                // deal with less propery mixins @{...}
                if (peek() === '{') {
                    print_string(eatString('}'));
                } else {
                    print_string(ch);

                    // strip trailing space, if present, for hash property checks
                    var variableOrRule = peekString(": ,;{}()[]/='\"");

                    if (variableOrRule.match(/[ :]$/)) {
                        // we have a variable or pseudo-class, add it and insert one space before continuing
                        next();
                        variableOrRule = eatString(": ").replace(/\s$/, '');
                        print_string(variableOrRule);
                        output.space_before_token = true;
                    }

                    variableOrRule = variableOrRule.replace(/\s$/, '');

                    // might be a nesting at-rule
                    if (variableOrRule in this.NESTED_AT_RULE) {
                        nestedLevel += 1;
                        if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                            enteringConditionalGroup = true;
                        }
                    }
                }
            } else if (ch === '#' && peek() === '{') {
                preserveSingleSpace(isAfterSpace);
                print_string(eatString('}'));
            } else if (ch === '{') {
                if (peek(true) === '}') {
                    eatWhitespace();
                    next();
                    output.space_before_token = true;
                    print_string("{}");
                    if (!eatWhitespace(true)) {
                        output.add_new_line();
                    }

                    if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                        output.add_new_line(true);
                    }
                } else {
                    indent();
                    output.space_before_token = true;
                    print_string(ch);
                    if (!eatWhitespace(true)) {
                        output.add_new_line();
                    }

                    // when entering conditional groups, only rulesets are allowed
                    if (enteringConditionalGroup) {
                        enteringConditionalGroup = false;
                        insideRule = (indentLevel > nestedLevel);
                    } else {
                        // otherwise, declarations are also allowed
                        insideRule = (indentLevel >= nestedLevel);
                    }
                }
            } else if (ch === '}') {
                outdent();
                output.add_new_line();
                print_string(ch);
                insideRule = false;
                insidePropertyValue = false;
                if (nestedLevel) {
                    nestedLevel--;
                }

                if (!eatWhitespace(true)) {
                    output.add_new_line();
                }

                if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                    output.add_new_line(true);
                }
            } else if (ch === ":") {
                eatWhitespace();
                if ((insideRule || enteringConditionalGroup) &&
                    !(lookBack("&") || foundNestedPseudoClass()) &&
                    !lookBack("(")) {
                    // 'property: value' delimiter
                    // which could be in a conditional group query
                    print_string(':');
                    if (!insidePropertyValue) {
                        insidePropertyValue = true;
                        output.space_before_token = true;
                    }
                } else {
                    // sass/less parent reference don't use a space
                    // sass nested pseudo-class don't use a space

                    // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
                    if (lookBack(" ")) {
                        output.space_before_token = true;
                    }
                    if (peek() === ":") {
                        // pseudo-element
                        next();
                        print_string("::");
                    } else {
                        // pseudo-class
                        print_string(':');
                    }
                }
            } else if (ch === '"' || ch === '\'') {
                preserveSingleSpace(isAfterSpace);
                print_string(eatString(ch));
            } else if (ch === ';') {
                insidePropertyValue = false;
                print_string(ch);
                if (!eatWhitespace(true)) {
                    output.add_new_line();
                }
            } else if (ch === '(') { // may be a url
                if (lookBack("url")) {
                    print_string(ch);
                    eatWhitespace();
                    if (next()) {
                        if (ch !== ')' && ch !== '"' && ch !== '\'') {
                            print_string(eatString(')'));
                        } else {
                            pos--;
                        }
                    }
                } else {
                    parenLevel++;
                    preserveSingleSpace(isAfterSpace);
                    print_string(ch);
                    eatWhitespace();
                }
            } else if (ch === ')') {
                print_string(ch);
                parenLevel--;
            } else if (ch === ',') {
                print_string(ch);
                if (!eatWhitespace(true) && selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
                    output.add_new_line();
                } else {
                    output.space_before_token = true;
                }
            } else if ((ch === '>' || ch === '+' || ch === '~') &&
                !insidePropertyValue && parenLevel < 1) {
                //handle combinator spacing
                if (space_around_combinator) {
                    output.space_before_token = true;
                    print_string(ch);
                    output.space_before_token = true;
                } else {
                    print_string(ch);
                    eatWhitespace();
                    // squash extra whitespace
                    if (ch && whiteRe.test(ch)) {
                        ch = '';
                    }
                }
            } else if (ch === ']') {
                print_string(ch);
            } else if (ch === '[') {
                preserveSingleSpace(isAfterSpace);
                print_string(ch);
            } else if (ch === '=') { // no whitespace before or after
                eatWhitespace();
                print_string('=');
                if (whiteRe.test(ch)) {
                    ch = '';
                }
            } else if (ch === '!') { // !important
                print_string(' ');
                print_string(ch);
            } else {
                preserveSingleSpace(isAfterSpace);
                print_string(ch);
            }
        }

        var sweetCode = output.get_code(end_with_newline, eol);

        return sweetCode;
    };

    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    this.NESTED_AT_RULE = {
        "@page": true,
        "@font-face": true,
        "@keyframes": true,
        // also in CONDITIONAL_GROUP_RULE below
        "@media": true,
        "@supports": true,
        "@document": true
    };
    this.CONDITIONAL_GROUP_RULE = {
        "@media": true,
        "@supports": true,
        "@document": true
    };
}

module.exports.Beautifier = Beautifier;


/***/ }),
/* 1 */
/***/ (function(module, exports) {
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
    var _character_count = 0;
    // use indent_count as a marker for lines that have preserved indentation
    var _indent_count = -1;

    var _items = [];
    var _empty = true;

    this.set_indent = function(level) {
        _character_count = parent.baseIndentLength + level * parent.indent_length;
        _indent_count = level;
    };

    this.get_character_count = function() {
        return _character_count;
    };

    this.is_empty = function() {
        return _empty;
    };

    this.last = function() {
        if (!this._empty) {
            return _items[_items.length - 1];
        } else {
            return null;
        }
    };

    this.push = function(input) {
        _items.push(input);
        _character_count += input.length;
        _empty = false;
    };

    this.pop = function() {
        var item = null;
        if (!_empty) {
            item = _items.pop();
            _character_count -= item.length;
            _empty = _items.length === 0;
        }
        return item;
    };

    this.remove_indent = function() {
        if (_indent_count > 0) {
            _indent_count -= 1;
            _character_count -= parent.indent_length;
        }
    };

    this.trim = function() {
        while (this.last() === ' ') {
            _items.pop();
            _character_count -= 1;
        }
        _empty = _items.length === 0;
    };

    this.toString = function() {
        var result = '';
        if (!this._empty) {
            if (_indent_count >= 0) {
                result = parent.indent_cache[_indent_count];
            }
            result += _items.join('');
        }
        return result;
    };
}

function Output(indent_string, baseIndentString) {
    baseIndentString = baseIndentString || '';
    this.indent_cache = [baseIndentString];
    this.baseIndentLength = baseIndentString.length;
    this.indent_length = indent_string.length;
    this.raw = false;

    var lines = [];
    this.baseIndentString = baseIndentString;
    this.indent_string = indent_string;
    this.previous_line = null;
    this.current_line = null;
    this.space_before_token = false;

    this.add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = new OutputLine(this);
        lines.push(this.current_line);
    };

    // initialize
    this.add_outputline();


    this.get_line_number = function() {
        return lines.length;
    };

    // Using object instead of string to allow for later expansion of info about each line
    this.add_new_line = function(force_newline) {
        if (this.get_line_number() === 1 && this.just_added_newline()) {
            return false; // no newline on start of file
        }

        if (force_newline || !this.just_added_newline()) {
            if (!this.raw) {
                this.add_outputline();
            }
            return true;
        }

        return false;
    };

    this.get_code = function(end_with_newline, eol) {
        var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };

    this.set_indent = function(level) {
        // Never indent your first output indent at the start of the file
        if (lines.length > 1) {
            while (level >= this.indent_cache.length) {
                this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
            }

            this.current_line.set_indent(level);
            return true;
        }
        this.current_line.set_indent(0);
        return false;
    };

    this.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
            this.add_outputline();
        }
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
    };

    this.add_token = function(printable_token) {
        this.add_space_before_token();
        this.current_line.push(printable_token);
    };

    this.add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
            this.current_line.push(' ');
        }
        this.space_before_token = false;
    };

    this.remove_indent = function(index) {
        var output_length = lines.length;
        while (index < output_length) {
            lines[index].remove_indent();
            index++;
        }
    };

    this.trim = function(eat_newlines) {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

        this.current_line.trim(indent_string, baseIndentString);

        while (eat_newlines && lines.length > 1 &&
            this.current_line.is_empty()) {
            lines.pop();
            this.current_line = lines[lines.length - 1];
            this.current_line.trim();
        }

        this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
    };

    this.just_added_newline = function() {
        return this.current_line.is_empty();
    };

    this.just_added_blankline = function() {
        if (this.just_added_newline()) {
            if (lines.length === 1) {
                return true; // start of the file and newline = blank
            }

            var line = lines[lines.length - 2];
            return line.is_empty();
        }
        return false;
    };
}

module.exports.Output = Output;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(0).Beautifier;

function css_beautify(source_text, options) {
    var beautifier = new Beautifier(source_text, options);
    return beautifier.beautify();
}

module.exports = css_beautify;

/***/ })
/******/ ]);
var css_beautify = legacy_beautify_css;
/* Footer */
if (typeof undefined === "function" && undefined.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    undefined([], function() {
        return {
            css_beautify: css_beautify
        };
    });
} else {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var html_beautify = require("beautify").html_beautify`.
    exports.css_beautify = css_beautify;
}

}());
});

unwrapExports(beautifyCss);
var beautifyCss_1 = beautifyCss.css_beautify;

var beautifyHtml = createCommonjsModule(function (module, exports) {
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
    http://jsbeautifier.org/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to pre tag) - list of tags, whose content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/

(function() {
var legacy_beautify_html =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(2).mergeOpts;
var acorn = __webpack_require__(1);


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

// function trim(s) {
//     return s.replace(/^\s+|\s+$/g, '');
// }

function ltrim(s) {
    return s.replace(/^\s+/g, '');
}

function rtrim(s) {
    return s.replace(/\s+$/g, '');
}

function Beautifier(html_source, options, js_beautify, css_beautify) {
    //Wrapper function to invoke all the necessary constructors and deal with the output.
    html_source = html_source || '';

    var multi_parser,
        indent_inner_html,
        indent_body_inner_html,
        indent_head_inner_html,
        indent_size,
        indent_character,
        wrap_line_length,
        brace_style,
        unformatted,
        content_unformatted,
        preserve_newlines,
        max_preserve_newlines,
        indent_handlebars,
        wrap_attributes,
        wrap_attributes_indent_size,
        is_wrap_attributes_force,
        is_wrap_attributes_force_expand_multiline,
        is_wrap_attributes_force_aligned,
        end_with_newline,
        extra_liners,
        eol;

    options = options || {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'html');

    // backwards compatibility to 1.3.4
    if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
        (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
        options.wrap_line_length = options.max_char;
    }

    indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
    indent_body_inner_html = (options.indent_body_inner_html === undefined) ? true : options.indent_body_inner_html;
    indent_head_inner_html = (options.indent_head_inner_html === undefined) ? true : options.indent_head_inner_html;
    indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
    indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
    brace_style = (options.brace_style === undefined) ? 'collapse' : options.brace_style;
    wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
    unformatted = options.unformatted || [
        // https://www.w3.org/TR/html5/dom.html#phrasing-content
        'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
        'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
        'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
        'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
        'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
        'video', 'wbr', 'text',
        // prexisting - not sure of full effect of removing, leaving in
        'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt',
    ];
    content_unformatted = options.content_unformatted || [
        'pre',
    ];
    preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    max_preserve_newlines = preserve_newlines ?
        (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10)) :
        0;
    indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
    wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
    wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
    is_wrap_attributes_force = wrap_attributes.substr(0, 'force'.length) === 'force';
    is_wrap_attributes_force_expand_multiline = (wrap_attributes === 'force-expand-multiline');
    is_wrap_attributes_force_aligned = (wrap_attributes === 'force-aligned');
    end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    extra_liners = (typeof options.extra_liners === 'object') && options.extra_liners ?
        options.extra_liners.concat() : (typeof options.extra_liners === 'string') ?
        options.extra_liners.split(',') : 'head,body,/html'.split(',');
    eol = options.eol ? options.eol : 'auto';

    if (options.indent_with_tabs) {
        indent_character = '\t';
        indent_size = 1;
    }

    if (eol === 'auto') {
        eol = '\n';
        if (html_source && lineBreak.test(html_source || '')) {
            eol = html_source.match(lineBreak)[0];
        }
    }

    eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    // HACK: newline parsing inconsistent. This brute force normalizes the input.
    html_source = html_source.replace(allLineBreaks, '\n');

    function Parser() {

        this.pos = 0; //Parser position
        this.token = '';
        this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
        this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
            parent: 'parent1',
            parentcount: 1,
            parent1: ''
        };
        this.tag_type = '';
        this.token_text = this.last_token = this.last_text = this.token_type = '';
        this.newlines = 0;
        this.indent_content = indent_inner_html;
        this.indent_body_inner_html = indent_body_inner_html;
        this.indent_head_inner_html = indent_head_inner_html;

        this.Utils = { //Uilities made available to the various functions
            whitespace: "\n\r\t ".split(''),

            single_token: options.void_elements || [
                // HTLM void elements - aka self-closing tags - aka singletons
                // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
                'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
                'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
                // NOTE: Optional tags - are not understood.
                // https://www.w3.org/TR/html5/syntax.html#optional-tags
                // The rules for optional tags are too complex for a simple list
                // Also, the content of these tags should still be indented in many cases.
                // 'li' is a good exmple.

                // Doctype and xml elements
                '!doctype', '?xml',
                // ?php tag
                '?php',
                // other tags that were in this list, keeping just in case
                'basefont', 'isindex'
            ],
            extra_liners: extra_liners, //for tags that need a line of whitespace before them
            in_array: function(what, arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (what === arr[i]) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Return true if the given text is composed entirely of whitespace.
        this.is_whitespace = function(text) {
            for (var n = 0; n < text.length; n++) {
                if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
                    return false;
                }
            }
            return true;
        };

        this.traverse_whitespace = function() {
            var input_char = '';

            input_char = this.input.charAt(this.pos);
            if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                this.newlines = 0;
                while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                    if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
                        this.newlines += 1;
                    }

                    this.pos++;
                    input_char = this.input.charAt(this.pos);
                }
                return true;
            }
            return false;
        };

        // Append a space to the given content (string array) or, if we are
        // at the wrap_line_length, append a newline/indentation.
        // return true if a newline was added, false if a space was added
        this.space_or_wrap = function(content) {
            if (this.line_char_count >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
                this.print_newline(false, content);
                this.print_indentation(content);
                return true;
            } else {
                this.line_char_count++;
                content.push(' ');
                return false;
            }
        };

        this.get_content = function() { //function to capture regular content between tags
            var input_char = '',
                content = [],
                handlebarsStarted = 0;

            while (this.input.charAt(this.pos) !== '<' || handlebarsStarted === 2) {
                if (this.pos >= this.input.length) {
                    return content.length ? content.join('') : ['', 'TK_EOF'];
                }

                if (handlebarsStarted < 2 && this.traverse_whitespace()) {
                    this.space_or_wrap(content);
                    continue;
                }

                input_char = this.input.charAt(this.pos);

                if (indent_handlebars) {
                    if (input_char === '{') {
                        handlebarsStarted += 1;
                    } else if (handlebarsStarted < 2) {
                        handlebarsStarted = 0;
                    }

                    if (input_char === '}' && handlebarsStarted > 0) {
                        if (handlebarsStarted-- === 0) {
                            break;
                        }
                    }
                    // Handlebars parsing is complicated.
                    // {{#foo}} and {{/foo}} are formatted tags.
                    // {{something}} should get treated as content, except:
                    // {{else}} specifically behaves like {{#if}} and {{/if}}
                    var peek3 = this.input.substr(this.pos, 3);
                    if (peek3 === '{{#' || peek3 === '{{/') {
                        // These are tags and not content.
                        break;
                    } else if (peek3 === '{{!') {
                        return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
                    } else if (this.input.substr(this.pos, 2) === '{{') {
                        if (this.get_tag(true) === '{{else}}') {
                            break;
                        }
                    }
                }

                this.pos++;
                this.line_char_count++;
                content.push(input_char); //letter at-a-time (or string) inserted to an array
            }
            return content.length ? content.join('') : '';
        };

        this.get_contents_to = function(name) { //get the full content of a script or style to pass to js_beautify
            if (this.pos === this.input.length) {
                return ['', 'TK_EOF'];
            }
            var content = '';
            var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
            reg_match.lastIndex = this.pos;
            var reg_array = reg_match.exec(this.input);
            var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
            if (this.pos < end_script) { //get everything in between the script tags
                content = this.input.substring(this.pos, end_script);
                this.pos = end_script;
            }
            return content;
        };

        this.record_tag = function(tag) { //function to record a tag and its parent in this.tags Object
            if (this.tags[tag + 'count']) { //check for the existence of this tag type
                this.tags[tag + 'count']++;
                this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
            } else { //otherwise initialize this tag type
                this.tags[tag + 'count'] = 1;
                this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
            }
            this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
            this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
        };

        this.retrieve_tag = function(tag) { //function to retrieve the opening tag to the corresponding closer
            if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
                var temp_parent = this.tags.parent; //check to see if it's a closable tag.
                while (temp_parent) { //till we reach '' (the initial value);
                    if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
                        break;
                    }
                    temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
                }
                if (temp_parent) { //if we caught something
                    this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
                    this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
                }
                delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
                delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
                if (this.tags[tag + 'count'] === 1) {
                    delete this.tags[tag + 'count'];
                } else {
                    this.tags[tag + 'count']--;
                }
            }
        };

        this.indent_to_tag = function(tag) {
            // Match the indentation level to the last use of this tag, but don't remove it.
            if (!this.tags[tag + 'count']) {
                return;
            }
            var temp_parent = this.tags.parent;
            while (temp_parent) {
                if (tag + this.tags[tag + 'count'] === temp_parent) {
                    break;
                }
                temp_parent = this.tags[temp_parent + 'parent'];
            }
            if (temp_parent) {
                this.indent_level = this.tags[tag + this.tags[tag + 'count']];
            }
        };

        this.get_tag = function(peek) { //function to get a full tag and parse its type
            var input_char = '',
                content = [],
                comment = '',
                space = false,
                first_attr = true,
                has_wrapped_attrs = false,
                tag_start, tag_end,
                tag_start_char,
                orig_pos = this.pos,
                orig_line_char_count = this.line_char_count,
                is_tag_closed = false,
                tail;

            peek = peek !== undefined ? peek : false;

            do {
                if (this.pos >= this.input.length) {
                    if (peek) {
                        this.pos = orig_pos;
                        this.line_char_count = orig_line_char_count;
                    }
                    return content.length ? content.join('') : ['', 'TK_EOF'];
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;

                if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
                    space = true;
                    continue;
                }

                if (input_char === "'" || input_char === '"') {
                    input_char += this.get_unformatted(input_char);
                    space = true;
                }

                if (input_char === '=') { //no space before =
                    space = false;
                }
                tail = this.input.substr(this.pos - 1);
                if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === '>' || input_char === '/')) {
                    if (tail.match(/^\/?\s*>/)) {
                        space = false;
                        is_tag_closed = true;
                        this.print_newline(false, content);
                        this.print_indentation(content);
                    }
                }
                if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
                    //no space after = or before >
                    var wrapped = this.space_or_wrap(content);
                    var indentAttrs = wrapped && input_char !== '/' && !is_wrap_attributes_force;
                    space = false;

                    if (is_wrap_attributes_force && input_char !== '/') {
                        var force_first_attr_wrap = false;
                        if (is_wrap_attributes_force_expand_multiline && first_attr) {
                            var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
                            force_first_attr_wrap = !is_only_attribute;
                        }
                        if (!first_attr || force_first_attr_wrap) {
                            this.print_newline(false, content);
                            this.print_indentation(content);
                            indentAttrs = true;
                        }
                    }
                    if (indentAttrs) {
                        has_wrapped_attrs = true;

                        //indent attributes an auto, forced, or forced-align line-wrap
                        var alignment_size = wrap_attributes_indent_size;
                        if (is_wrap_attributes_force_aligned) {
                            alignment_size = content.indexOf(' ') + 1;
                        }

                        for (var count = 0; count < alignment_size; count++) {
                            // only ever further indent with spaces since we're trying to align characters
                            content.push(' ');
                        }
                    }
                    if (first_attr) {
                        for (var i = 0; i < content.length; i++) {
                            if (content[i] === ' ') {
                                first_attr = false;
                                break;
                            }
                        }
                    }
                }

                if (indent_handlebars && tag_start_char === '<') {
                    // When inside an angle-bracket tag, put spaces around
                    // handlebars not inside of strings.
                    if ((input_char + this.input.charAt(this.pos)) === '{{') {
                        input_char += this.get_unformatted('}}');
                        if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
                            input_char = ' ' + input_char;
                        }
                        space = true;
                    }
                }

                if (input_char === '<' && !tag_start_char) {
                    tag_start = this.pos - 1;
                    tag_start_char = '<';
                }

                if (indent_handlebars && !tag_start_char) {
                    if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
                        if (input_char === '#' || input_char === '/' || input_char === '!') {
                            tag_start = this.pos - 3;
                        } else {
                            tag_start = this.pos - 2;
                        }
                        tag_start_char = '{';
                    }
                }

                this.line_char_count++;
                content.push(input_char); //inserts character at-a-time (or string)

                if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) { //if we're in a comment, do something special
                    // We treat all comments as literals, even more than preformatted tags
                    // we just look for the appropriate close tag
                    content = [this.get_comment(tag_start)];
                    break;
                }

                if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') { //if we're in a comment, do something special
                    // We treat all comments as literals, even more than preformatted tags
                    // we just look for the appropriate close tag
                    content = [this.get_comment(tag_start)];
                    break;
                }

                if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
                    break;
                }
            } while (input_char !== '>');

            var tag_complete = content.join('');
            var tag_index;
            var tag_offset;

            // must check for space first otherwise the tag could have the first attribute included, and
            // then not un-indent correctly
            if (tag_complete.indexOf(' ') !== -1) { //if there's whitespace, thats where the tag name ends
                tag_index = tag_complete.indexOf(' ');
            } else if (tag_complete.indexOf('\n') !== -1) { //if there's a line break, thats where the tag name ends
                tag_index = tag_complete.indexOf('\n');
            } else if (tag_complete.charAt(0) === '{') {
                tag_index = tag_complete.indexOf('}');
            } else { //otherwise go with the tag ending
                tag_index = tag_complete.indexOf('>');
            }
            if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
                tag_offset = 1;
            } else {
                tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
            }
            var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
            if (tag_complete.charAt(tag_complete.length - 2) === '/' ||
                this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
                if (!peek) {
                    this.tag_type = 'SINGLE';
                }
            } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
                if (!peek) {
                    this.indent_to_tag('if');
                    this.tag_type = 'HANDLEBARS_ELSE';
                    this.indent_content = true;
                    this.traverse_whitespace();
                }
            } else if (this.is_unformatted(tag_check, unformatted) ||
                this.is_unformatted(tag_check, content_unformatted)) {
                // do not reformat the "unformatted" or "content_unformatted" tags
                comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
                content.push(comment);
                tag_end = this.pos - 1;
                this.tag_type = 'SINGLE';
            } else if (tag_check === 'script' &&
                (tag_complete.search('type') === -1 ||
                    (tag_complete.search('type') > -1 &&
                        tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1))) {
                if (!peek) {
                    this.record_tag(tag_check);
                    this.tag_type = 'SCRIPT';
                }
            } else if (tag_check === 'style' &&
                (tag_complete.search('type') === -1 ||
                    (tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1))) {
                if (!peek) {
                    this.record_tag(tag_check);
                    this.tag_type = 'STYLE';
                }
            } else if (tag_check.charAt(0) === '!') { //peek for <! comment
                // for comments content is already correct.
                if (!peek) {
                    this.tag_type = 'SINGLE';
                    this.traverse_whitespace();
                }
            } else if (!peek) {
                if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
                    this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
                    this.tag_type = 'END';
                } else { //otherwise it's a start-tag
                    this.record_tag(tag_check); //push it on the tag stack
                    if (tag_check.toLowerCase() !== 'html') {
                        this.indent_content = true;
                    }
                    this.tag_type = 'START';
                }

                // Allow preserving of newlines after a start or end tag
                if (this.traverse_whitespace()) {
                    this.space_or_wrap(content);
                }

                if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
                    this.print_newline(false, this.output);
                    if (this.output.length && this.output[this.output.length - 2] !== '\n') {
                        this.print_newline(true, this.output);
                    }
                }
            }

            if (peek) {
                this.pos = orig_pos;
                this.line_char_count = orig_line_char_count;
            }

            return content.join(''); //returns fully formatted tag
        };

        this.get_comment = function(start_pos) { //function to return comment content in its entirety
            // this is will have very poor perf, but will work for now.
            var comment = '',
                delimiter = '>',
                matched = false;

            this.pos = start_pos;
            var input_char = this.input.charAt(this.pos);
            this.pos++;

            while (this.pos <= this.input.length) {
                comment += input_char;

                // only need to check for the delimiter if the last chars match
                if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
                    comment.indexOf(delimiter) !== -1) {
                    break;
                }

                // only need to search for custom delimiter for the first few characters
                if (!matched && comment.length < 10) {
                    if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
                        delimiter = '<![endif]>';
                        matched = true;
                    } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
                        delimiter = ']]>';
                        matched = true;
                    } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
                        delimiter = ']>';
                        matched = true;
                    } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
                        delimiter = '-->';
                        matched = true;
                    } else if (comment.indexOf('{{!--') === 0) { // {{!-- handlebars comment
                        delimiter = '--}}';
                        matched = true;
                    } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
                        if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
                            delimiter = '}}';
                            matched = true;
                        }
                    } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
                        delimiter = '?>';
                        matched = true;
                    } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
                        delimiter = '%>';
                        matched = true;
                    }
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;
            }

            return comment;
        };

        function tokenMatcher(delimiter) {
            var token = '';

            var add = function(str) {
                var newToken = token + str.toLowerCase();
                token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
            };

            var doesNotMatch = function() {
                return token.indexOf(delimiter) === -1;
            };

            return {
                add: add,
                doesNotMatch: doesNotMatch
            };
        }

        this.get_unformatted = function(delimiter, orig_tag) { //function to return unformatted content in its entirety
            if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
                return '';
            }
            var input_char = '';
            var content = '';
            var space = true;

            var delimiterMatcher = tokenMatcher(delimiter);

            do {

                if (this.pos >= this.input.length) {
                    return content;
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;

                if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                    if (!space) {
                        this.line_char_count--;
                        continue;
                    }
                    if (input_char === '\n' || input_char === '\r') {
                        content += '\n';
                        /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
            for (var i=0; i<this.indent_level; i++) {
              content += this.indent_string;
            }
            space = false; //...and make sure other indentation is erased
            */
                        this.line_char_count = 0;
                        continue;
                    }
                }
                content += input_char;
                delimiterMatcher.add(input_char);
                this.line_char_count++;
                space = true;

                if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
                    // Handlebars expressions in strings should also be unformatted.
                    content += this.get_unformatted('}}');
                    // Don't consider when stopping for delimiters.
                }
            } while (delimiterMatcher.doesNotMatch());

            return content;
        };

        this.get_token = function() { //initial handler for token-retrieval
            var token;

            if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') { //check if we need to format javascript
                var type = this.last_token.substr(7);
                token = this.get_contents_to(type);
                if (typeof token !== 'string') {
                    return token;
                }
                return [token, 'TK_' + type];
            }
            if (this.current_mode === 'CONTENT') {
                token = this.get_content();
                if (typeof token !== 'string') {
                    return token;
                } else {
                    return [token, 'TK_CONTENT'];
                }
            }

            if (this.current_mode === 'TAG') {
                token = this.get_tag();
                if (typeof token !== 'string') {
                    return token;
                } else {
                    var tag_name_type = 'TK_TAG_' + this.tag_type;
                    return [token, tag_name_type];
                }
            }
        };

        this.get_full_indent = function(level) {
            level = this.indent_level + level || 0;
            if (level < 1) {
                return '';
            }

            return Array(level + 1).join(this.indent_string);
        };

        this.is_unformatted = function(tag_check, unformatted) {
            //is this an HTML5 block-level link?
            if (!this.Utils.in_array(tag_check, unformatted)) {
                return false;
            }

            if (tag_check.toLowerCase() !== 'a' || !this.Utils.in_array('a', unformatted)) {
                return true;
            }

            //at this point we have an  tag; is its first child something we want to remain
            //unformatted?
            var next_tag = this.get_tag(true /* peek. */ );

            // test next_tag to see if it is just html tag (no external content)
            var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

            // if next_tag comes back but is not an isolated tag, then
            // let's treat the 'a' tag as having content
            // and respect the unformatted option
            if (!tag || this.Utils.in_array(tag[1], unformatted)) {
                return true;
            } else {
                return false;
            }
        };

        this.printer = function(js_source, indent_character, indent_size, wrap_line_length, brace_style) { //handles input/output and some other printing functions

            this.input = js_source || ''; //gets the input for the Parser

            // HACK: newline parsing inconsistent. This brute force normalizes the input.
            this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

            this.output = [];
            this.indent_character = indent_character;
            this.indent_string = '';
            this.indent_size = indent_size;
            this.brace_style = brace_style;
            this.indent_level = 0;
            this.wrap_line_length = wrap_line_length;
            this.line_char_count = 0; //count to see if wrap_line_length was exceeded

            for (var i = 0; i < this.indent_size; i++) {
                this.indent_string += this.indent_character;
            }

            this.print_newline = function(force, arr) {
                this.line_char_count = 0;
                if (!arr || !arr.length) {
                    return;
                }
                if (force || (arr[arr.length - 1] !== '\n')) { //we might want the extra line
                    if ((arr[arr.length - 1] !== '\n')) {
                        arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
                    }
                    arr.push('\n');
                }
            };

            this.print_indentation = function(arr) {
                for (var i = 0; i < this.indent_level; i++) {
                    arr.push(this.indent_string);
                    this.line_char_count += this.indent_string.length;
                }
            };

            this.print_token = function(text) {
                // Avoid printing initial whitespace.
                if (this.is_whitespace(text) && !this.output.length) {
                    return;
                }
                if (text || text !== '') {
                    if (this.output.length && this.output[this.output.length - 1] === '\n') {
                        this.print_indentation(this.output);
                        text = ltrim(text);
                    }
                }
                this.print_token_raw(text);
            };

            this.print_token_raw = function(text) {
                // If we are going to print newlines, truncate trailing
                // whitespace, as the newlines will represent the space.
                if (this.newlines > 0) {
                    text = rtrim(text);
                }

                if (text && text !== '') {
                    if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
                        // unformatted tags can grab newlines as their last character
                        this.output.push(text.slice(0, -1));
                        this.print_newline(false, this.output);
                    } else {
                        this.output.push(text);
                    }
                }

                for (var n = 0; n < this.newlines; n++) {
                    this.print_newline(n > 0, this.output);
                }
                this.newlines = 0;
            };

            this.indent = function() {
                this.indent_level++;
            };

            this.unindent = function() {
                if (this.indent_level > 0) {
                    this.indent_level--;
                }
            };
        };
        return this;
    }

    /*_____________________--------------------_____________________*/

    this.beautify = function() {
        multi_parser = new Parser(); //wrapping functions Parser
        multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values
        while (true) {
            var t = multi_parser.get_token();
            multi_parser.token_text = t[0];
            multi_parser.token_type = t[1];

            if (multi_parser.token_type === 'TK_EOF') {
                break;
            }

            switch (multi_parser.token_type) {
                case 'TK_TAG_START':
                    multi_parser.print_newline(false, multi_parser.output);
                    multi_parser.print_token(multi_parser.token_text);
                    if (multi_parser.indent_content) {
                        if ((multi_parser.indent_body_inner_html || !multi_parser.token_text.match(/<body(?:.*)>/)) &&
                            (multi_parser.indent_head_inner_html || !multi_parser.token_text.match(/<head(?:.*)>/))) {

                            multi_parser.indent();
                        }

                        multi_parser.indent_content = false;
                    }
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_STYLE':
                case 'TK_TAG_SCRIPT':
                    multi_parser.print_newline(false, multi_parser.output);
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_END':
                    //Print new line only if the tag has no content and has child
                    if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
                        var tag_name = (multi_parser.token_text.match(/\w+/) || [])[0];
                        var tag_extracted_from_last_output = null;
                        if (multi_parser.output.length) {
                            tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
                        }
                        if (tag_extracted_from_last_output === null ||
                            (tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted))) {
                            multi_parser.print_newline(false, multi_parser.output);
                        }
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_SINGLE':
                    // Don't add a newline before elements that should remain unformatted.
                    var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
                    if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
                        multi_parser.print_newline(false, multi_parser.output);
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_HANDLEBARS_ELSE':
                    // Don't add a newline if opening {{#if}} tag is on the current line
                    var foundIfOnCurrentLine = false;
                    for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
                        if (multi_parser.output[lastCheckedOutput] === '\n') {
                            break;
                        } else {
                            if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                                foundIfOnCurrentLine = true;
                                break;
                            }
                        }
                    }
                    if (!foundIfOnCurrentLine) {
                        multi_parser.print_newline(false, multi_parser.output);
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    if (multi_parser.indent_content) {
                        multi_parser.indent();
                        multi_parser.indent_content = false;
                    }
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_HANDLEBARS_COMMENT':
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'TAG';
                    break;
                case 'TK_CONTENT':
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'TAG';
                    break;
                case 'TK_STYLE':
                case 'TK_SCRIPT':
                    if (multi_parser.token_text !== '') {
                        multi_parser.print_newline(false, multi_parser.output);
                        var text = multi_parser.token_text,
                            _beautifier,
                            script_indent_level = 1;
                        if (multi_parser.token_type === 'TK_SCRIPT') {
                            _beautifier = typeof js_beautify === 'function' && js_beautify;
                        } else if (multi_parser.token_type === 'TK_STYLE') {
                            _beautifier = typeof css_beautify === 'function' && css_beautify;
                        }

                        if (options.indent_scripts === "keep") {
                            script_indent_level = 0;
                        } else if (options.indent_scripts === "separate") {
                            script_indent_level = -multi_parser.indent_level;
                        }

                        var indentation = multi_parser.get_full_indent(script_indent_level);
                        if (_beautifier) {

                            // call the Beautifier if avaliable
                            var Child_options = function() {
                                this.eol = '\n';
                            };
                            Child_options.prototype = options;
                            var child_options = new Child_options();
                            text = _beautifier(text.replace(/^\s*/, indentation), child_options);
                        } else {
                            // simply indent the string otherwise
                            var white = text.match(/^\s*/)[0];
                            var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
                            var reindent = multi_parser.get_full_indent(script_indent_level - _level);
                            text = text.replace(/^\s*/, indentation)
                                .replace(/\r\n|\r|\n/g, '\n' + reindent)
                                .replace(/\s+$/, '');
                        }
                        if (text) {
                            multi_parser.print_token_raw(text);
                            multi_parser.print_newline(true, multi_parser.output);
                        }
                    }
                    multi_parser.current_mode = 'TAG';
                    break;
                default:
                    // We should not be getting here but we don't want to drop input on the floor
                    // Just output the text and move on
                    if (multi_parser.token_text !== '') {
                        multi_parser.print_token(multi_parser.token_text);
                    }
                    break;
            }
            multi_parser.last_token = multi_parser.token_type;
            multi_parser.last_text = multi_parser.token_text;
        }
        var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

        // establish end_with_newline
        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };
}

module.exports.Beautifier = Beautifier;


/***/ }),
/* 1 */
/***/ (function(module, exports) {
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(0).Beautifier;

function style_html(html_source, options, js_beautify, css_beautify) {
    var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
    return beautifier.beautify();
}

module.exports = style_html;

/***/ })
/******/ ]);
var style_html = legacy_beautify_html;
/* Footer */
if (typeof undefined === "function" && undefined.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    undefined(["require", "./beautify", "./beautify-css"], function(requireamd) {
        var js_beautify = requireamd("./beautify");
        var css_beautify = requireamd("./beautify-css");

        return {
            html_beautify: function(html_source, options) {
                return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
            }
        };
    });
} else {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var html_beautify = require("beautify").html_beautify`.
    var js_beautify = beautify;
    var css_beautify = beautifyCss;

    exports.html_beautify = function(html_source, options) {
        return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
    };
}

}());
});

unwrapExports(beautifyHtml);
var beautifyHtml_1 = beautifyHtml.html_beautify;

var js = createCommonjsModule(function (module) {
/*
  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
    // the default is js
    var beautify$$1 = function(src, config) {
        return js_beautify.js_beautify(src, config);
    };

    // short aliases
    beautify$$1.js = js_beautify.js_beautify;
    beautify$$1.css = css_beautify.css_beautify;
    beautify$$1.html = html_beautify.html_beautify;

    // legacy aliases
    beautify$$1.js_beautify = js_beautify.js_beautify;
    beautify$$1.css_beautify = css_beautify.css_beautify;
    beautify$$1.html_beautify = html_beautify.html_beautify;

    return beautify$$1;
}

if (typeof undefined === "function" && undefined.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    undefined([
        "./lib/beautify",
        "./lib/beautify-css",
        "./lib/beautify-html"
    ], function(js_beautify, css_beautify, html_beautify) {
        return get_beautify(js_beautify, css_beautify, html_beautify);
    });
} else {
    (function(mod) {
        var js_beautify = beautify;
        var css_beautify = beautifyCss;
        var html_beautify = beautifyHtml;

        mod.exports = get_beautify(js_beautify, css_beautify, html_beautify);

    })(module);
}
});

/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var Nav, util$3;

util$3 = util;

var Nav_1 = Nav = class Nav {
  //#######################################
  //|
  //|   new Nav( html )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="nav">
  //|   -----------------------------------
  //|
  //|   nav.compile() -> html
  //|
  //#######################################
  constructor(html) {
    this._compile = this._compile.bind(this);
    this._compileMenu = this._compileMenu.bind(this);
    this._compileMenuByLink = this._compileMenuByLink.bind(this);
    this._compileMenuByItems = this._compileMenuByItems.bind(this);
    this._compileItem = this._compileItem.bind(this);
    this._compileItemByLink = this._compileItemByLink.bind(this);
    this._compileItemByHint = this._compileItemByHint.bind(this);
    this._compileLine = this._compileLine.bind(this);
    this.html = html;
    this.compile = this._compile;
  }

  _compile() {
    var i, len, menu, menus, model, nav;
    if (!this.html) {
      return "<div id=\"nav\" style=\"display: none\"/>";
    }
    model = util$3.dom(this.html);
    nav = util$3.dom('#nav');
    if (model.attr('fixed') != null) {
      nav.addClass('fixed');
    }
    menus = model.findAll('nav > menu');
    for (i = 0, len = menus.length; i < len; i++) {
      menu = menus[i];
      menu = this._compileMenu(menu);
      nav.append(menu);
    }
    return nav.htmlSelf();
  }

  _compileMenu(menu) {
    //#######################################
    //|
    //|   @params {DOM} menu
    //|   @return {DOM} div.menu
    //|
    //#######################################
    if (menu.attr('href') != null) {
      return this._compileMenuByLink(menu);
    } else {
      return this._compileMenuByItems(menu);
    }
  }

  _compileMenuByLink(menu) {
    var a, h1, href, name;
    //#######################################
    //|
    //|   @params {DOM} menu
    //|   @return {DOM} div.menu
    //|
    //#######################################
    name = menu.attr('name');
    href = menu.attr('href');
    h1 = util$3.dom('h1');
    a = util$3.dom('a').attr('href', href).text(name);
    h1.append(a);
    return util$3.dom('.menu').append(h1);
  }

  _compileMenuByItems(menu) {
    var h1, i, item, items, len, li, name, ul;
    //#######################################
    //|
    //|   @params {DOM} menu
    //|   @return {DOM} div.menu
    //|
    //#######################################
    name = menu.attr('name');
    items = menu.findAll('menu > item, menu > line');
    h1 = util$3.dom('h1').text(name).addClass('hint');
    ul = util$3.dom('ul');
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      switch (item.tag()) {
        case 'item':
          li = this._compileItem(item);
          break;
        case 'line':
          li = this._compileLine(item);
      }
      ul.append(li);
    }
    return util$3.dom('.menu').append(h1).append(ul);
  }

  _compileItem(item) {
    //#######################################
    //|
    //|   @params {DOM} item
    //|   @return {DOM} li
    //|
    //#######################################
    if (item.attr('href') != null) {
      return this._compileItemByLink(item);
    } else {
      return this._compileItemByHint(item);
    }
  }

  _compileItemByLink(item) {
    var a, href, li, name;
    //#######################################
    //|
    //|   @params {DOM} item
    //|   @return {DOM} li
    //|
    //#######################################
    name = item.attr('name');
    href = item.attr('href');
    li = util$3.dom('li');
    a = util$3.dom('a').attr('href', href).text(name);
    return li.append(a);
  }

  _compileItemByHint(item) {
    var li, name;
    //#######################################
    //|
    //|   @params {DOM} item
    //|   @return {DOM} li
    //|
    //#######################################
    name = item.attr('name');
    li = util$3.dom('li.hint').text(name);
    return li;
  }

  _compileLine() {
    //#######################################
    //|
    //|   @return {DOM} li
    //|
    //#######################################
    return util$3.dom('li.line');
  }

};

var Cover, util$4;

util$4 = util;

var Cover_1 = Cover = class Cover {
  //#######################################
  //|
  //|   new Cover( html )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="cover">
  //|   -----------------------------------
  //|
  //|   cover.compile() -> html
  //|   cover.render()  -> dom
  //|
  //|   Cover.hide( dom )
  //|
  //#######################################
  constructor(html) {
    this._compile = this._compile.bind(this);
    this._compileLogo = this._compileLogo.bind(this);
    this._compileName = this._compileName.bind(this);
    this._compileDescs = this._compileDescs.bind(this);
    this._compileItems = this._compileItems.bind(this);
    this._compileButtons = this._compileButtons.bind(this);
    this._render = this._render.bind(this);
    //#######################################
    //|
    //|   @params {string} html
    //|
    //#######################################
    this.html = html;
    this.compile = this._compile;
    this.render = this._render;
  }

  _compile() {
    var buttons, cover, descs, items, logo, model, name, wrap;
    if (!this.html) {
      return "<div id=\"cover\" style=\"display: none\"/>";
    }
    model = util$4.dom(this.html);
    cover = util$4.dom('#cover');
    wrap = util$4.dom('.wrap');
    logo = model.find('cover > logo');
    name = model.find('cover > name');
    descs = model.findAll('cover > desc');
    items = model.findAll('cover > item');
    buttons = model.findAll('cover > button');
    if (logo) {
      wrap.append(this._compileLogo(logo));
    }
    if (name) {
      wrap.append(this._compileName(name));
    }
    if (descs.length) {
      wrap.append(this._compileDescs(descs));
    }
    if (items.length) {
      wrap.append(this._compileItems(items));
    }
    if (buttons.length) {
      wrap.append(this._compileButtons(buttons));
    }
    cover.append(wrap);
    return cover.htmlSelf();
  }

  _compileLogo(logo) {
    var src;
    //#######################################
    //|
    //|   @params {DOM} logo
    //|   @return {DOM} logo
    //|
    //#######################################
    src = logo.attr('src');
    src = util$4.filePath(src);
    logo = util$4.dom('img.logo');
    logo.attr('src', src);
    return logo;
  }

  _compileName(name) {
    var ref, text, version;
    //#######################################
    //|
    //|   @params {DOM} name
    //|   @return {DOM} name
    //|
    //#######################################
    text = name.text();
    version = (ref = name.attr('version')) != null ? ref : '';
    name = util$4.dom('.name').text(text);
    version = util$4.dom('.version').text(version);
    name.append(version);
    return name;
  }

  _compileDescs(descs) {
    var desc, i, len, li, ul;
    //#######################################
    //|
    //|   @params {DOM[]} descs
    //|   @return {DOM}   ul.descs
    //|
    //#######################################
    ul = util$4.dom('ul.descs');
    for (i = 0, len = descs.length; i < len; i++) {
      desc = descs[i];
      li = util$4.dom('li').text(desc.text());
      ul.append(li);
    }
    return ul;
  }

  _compileItems(items) {
    var i, item, len, li, ul;
    //#######################################
    //|
    //|   @params {DOM[]} items
    //|   @return {DOM}   ul.items
    //|
    //#######################################
    ul = util$4.dom('ul.items');
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      li = util$4.dom('li').text(item.text());
      ul.append(li);
    }
    return ul;
  }

  _compileButtons(buttons) {
    var a, button, href, i, len, li, ref, text, ul;
    //#######################################
    //|
    //|   @params {DOM[]} buttons
    //|   @return {DOM}   ul.buttons
    //|
    //#######################################
    ul = util$4.dom('ul.buttons');
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      li = util$4.dom('li');
      a = util$4.dom('a');
      if (button.attr('active') != null) {
        li.addClass('active');
        a.addClass('active');
      }
      href = (ref = button.attr('href')) != null ? ref : '';
      a.attr('href', href);
      text = button.text();
      a.text(text);
      li.append(a);
      ul.append(li);
    }
    return ul;
  }

  _render() {
    //#######################################
    //|
    //|   @return {DOM} cover
    //|
    //#######################################
    return util$4.dom(this._compile());
  }

};

Cover.hide = (cover) => {
  //#######################################
  //|
  //|   @params {DOM} cover
  //|
  //#######################################
  return cover.css('display', 'none');
};

var Summary, util$5;

util$5 = util;

var Summary_1 = Summary = class Summary {
  //#######################################
  //|
  //|   new Summary( html )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="summary">
  //|   -----------------------------------
  //|
  //|   summary.compile() -> html
  //|   summary.render()  -> dom
  //|
  //|   Summary.parse( sections ) -> html
  //|   Summary.activeTo( summary, id )
  //|   Summary.scrollTo( summary, id )
  //|
  //#######################################
  constructor(html) {
    this._compile = this._compile.bind(this);
    this._compileItem = this._compileItem.bind(this);
    this._compileItemByLink = this._compileItemByLink.bind(this);
    this._compileItemByHint = this._compileItemByHint.bind(this);
    this._render = this._render.bind(this);
    this.html = html;
    this.compile = this._compile;
    this.render = this._render;
  }

  _compile() {
    var i, item, items, len, li, model, summary, ul;
    //#######################################
    //|
    //|   @params {string} html
    //|   @return {string} html
    //|
    //#######################################
    model = util$5.dom(this.html);
    summary = util$5.dom('#summary');
    ul = util$5.dom('ul');
    items = model.findAll('item');
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      li = this._compileItem(item);
      ul.append(li);
    }
    summary.append(ul);
    return summary.htmlSelf();
  }

  _compileItem(item) {
    var href, lv, name;
    //#######################################
    //|
    //|   @params {DOM} item
    //|   @return {DOM} li
    //|
    //#######################################
    name = item.find('name');
    href = item.attr('href');
    lv = item.attr('lv');
    if (href) {
      return this._compileItemByLink(name, href, lv);
    } else {
      return this._compileItemByHint(name, lv);
    }
  }

  _compileItemByLink(name, href, lv = '1') {
    var a, li;
    //#######################################
    //|
    //|   @params {DOM}    name
    //|   @params {string} href
    //|   @params {string} lv
    //|
    //|   @return {DOM}    li.lvX
    //|
    //#######################################
    li = util$5.dom('li').attr('href', href).addClass(`lv${lv}`);
    a = util$5.dom('a').attr('href', href);
    if (name) {
      a.text(name.text());
    }
    return li.append(a);
  }

  _compileItemByHint(name, lv = '1') {
    var li;
    //#######################################
    //|
    //|   @params {DOM}    name
    //|   @params {string} lv
    //|
    //|   @return {DOM}    li.hint.lvX
    //|
    //#######################################
    li = util$5.dom('li.hint').addClass(`lv${lv}`);
    if (name) {
      li.text(name.text());
    }
    return li;
  }

  _render() {
    //#######################################
    //|
    //|   @return {DOM} summary
    //|
    //#######################################
    return util$5.dom(this._compile());
  }

};

Summary.parse = (sections) => {
  //#######################################
  //|
  //|   @params {object[]} sections - [{ heading, content, example }]
  //|   @return {string}   html
  //|
  //#######################################
  sections = sections.filter(Summary._filterSection);
  sections = sections.map(Summary._mapSection);
  return `<summary>${sections.join('')}</summary>`;
};

Summary._filterSection = (section) => {
  //#######################################
  //|
  //|   @params {object} section - {object} heading - { lv, text, order }
  //|                              {string} content
  //|                              {string} example
  //|
  //|   @return {boolean}
  //|
  //#######################################
  if (section.heading) {
    if (section.heading.lv <= Breeze.config('summary.showLevel')) {
      return true;
    }
  }
  return false;
};

Summary._mapSection = (section) => {
  var href, lv, order, text;
  //#######################################
  //|
  //|   @params {object} section - {object} heading - { lv, text, order }
  //|                              {string} content
  //|                              {string} example
  //|
  //|   @return {string} html
  //|
  //#######################################
  ({lv, text, order} = section.heading);
  href = util$5.id(order, text);
  return `<item lv="${lv}" href="#${href}">\n   <name>${text}</name>\n</item>`;
};

Summary.activeTo = (summary, id) => {
  var current, link;
  //#######################################
  //|
  //|   @params {DOM}    summary
  //|   @params {string} id
  //|
  //#######################################
  if (link = Summary._findLink(summary, id)) {
    if (current = summary.find('li.active')) {
      current.removeClass('active');
    }
    return link.parent().addClass('active');
  }
};

Summary.scrollTo = (summary, id) => {
  var bottom, link, side, top;
  //#######################################
  //|
  //|   @params {DOM}    summary
  //|   @params {string} id
  //|
  //#######################################
  if (link = Summary._findLink(summary, id)) {
    side = summary.parent();
    top = link.top();
    bottom = link.bottom();
    if (top + 200 > window.innerHeight) {
      return side.scroll(top + 200 - window.innerHeight);
    } else if (bottom < 200) {
      return side.scroll(bottom - 200);
    }
  }
};

Summary._findLink = (summary, id) => {
  var href;
  //#######################################
  //|
  //|   @params {DOM}    summary
  //|   @params {string} id
  //|   @return {DOM}    link
  //|
  //#######################################
  href = '#' + id;
  return summary.find(`a[href="${href}"]`);
};

var marked = createCommonjsModule(function (module, exports) {
(function(root) {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,
  text: /^[^\n]+/
};

block._label = /(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b';

block.html = edit(block.html)
  .replace('comment', /<!--[\s\S]*?-->/)
  .replace('closed', /<(tag)[\s\S]+?<\/\1>/)
  .replace('closing', /<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/)
  .replace(/tag/g, block._tag)
  .getRegex();

block.paragraph = edit(block.paragraph)
  .replace('hr', block.hr)
  .replace('heading', block.heading)
  .replace('lheading', block.lheading)
  .replace('tag', '<' + block._tag)
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = edit(block.paragraph)
  .replace('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  .getRegex();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      space,
      i,
      tag,
      l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase();
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
};

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;

inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._inside = /(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = edit(inline.link)
  .replace('inside', inline._inside)
  .replace('href', inline._href)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('inside', inline._inside)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
    .replace('email', inline._email)
    .getRegex(),
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: edit(inline.text)
    .replace(']|', '~]|')
    .replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|')
    .getRegex()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      cap[0] = this.rules._backpedal.exec(cap[0])[0];
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href),
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return text;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text;
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text;
};

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
};

TextRenderer.prototype.br = function() {
  return '';
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, {renderer: new TextRenderer()})
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)));
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer(),
  xhtml: false,
  baseUrl: null
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

{
  module.exports = marked;
}
})(commonjsGlobal || (typeof window !== 'undefined' ? window : commonjsGlobal));
});

var prism = createCommonjsModule(function (module) {
/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(\w+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o, visited) {
			var type = _.util.type(o);
			visited = visited || {};

			switch (type) {
				case 'Object':
					if (visited[_.util.objId(o)]) {
						return visited[_.util.objId(o)];
					}
					var clone = {};
					visited[_.util.objId(o)] = clone;

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key], visited);
						}
					}

					return clone;

				case 'Array':
					if (visited[_.util.objId(o)]) {
						return visited[_.util.objId(o)];
					}
					var clone = [];
					visited[_.util.objId(o)] = clone;

					o.forEach(function (v, i) {
						clone[i] = _.util.clone(v, visited);
					});

					return clone;
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type, visited) {
			visited = visited || {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		_.highlightAllUnder(document, async, callback);
	},

	highlightAllUnder: function(container, async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || container.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		if (element.parentNode) {
			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-sanity-check', env);

		if (!env.code || !env.grammar) {
			if (env.code) {
				_.hooks.run('before-highlight', env);
				env.element.textContent = env.code;
				_.hooks.run('after-highlight', env);
			}
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var env = {
			text: text,
			grammar: grammar,
			language: language
		};
		env.tokens = _.tokenize(text, grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		var Token = _.Token;

		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str),
					    delNum = 1;

					// Greedy patterns can override/remove up to two previously matched tokens
					if (!match && greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						/*
						 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
						 */
						if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1] ? match[1].length : 0;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar, language) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (!_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _self.Prism;

})();

if ('object' !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof commonjsGlobal !== 'undefined') {
	commonjsGlobal.Prism = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
				inside: {
					'punctuation': [
						/^=/,
						{
							pattern: /(^|[^\\])["']/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css',
			greedy: true
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
		alias: 'function'
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|[^\\`])*`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript',
			greedy: true
		}
	});
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
			var src = pre.getAttribute('data-src');

			var language, parent = pre;
			var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (pre.className.match(lang) || [, ''])[1];
			}

			if (!language) {
				var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
				language = Extensions[extension] || extension;
			}

			var code = document.createElement('code');
			code.className = 'language-' + language;

			pre.textContent = '';

			code.textContent = 'Loading…';

			pre.appendChild(code);

			var xhr = new XMLHttpRequest();

			xhr.open('GET', src, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {

					if (xhr.status < 400 && xhr.responseText) {
						code.textContent = xhr.responseText;

						Prism.highlightElement(code);
					}
					else if (xhr.status >= 400) {
						code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
					}
					else {
						code.textContent = '✖ Error: File does not exist or is empty';
					}
				}
			};

			xhr.send(null);
		});

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();
});

var API, util$6;

util$6 = util;

var Api = API = class API {
  //#######################################
  //|
  //|   new Api()
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div class="api">
  //|   -----------------------------------
  //|
  //|   api.compile() -> html
  //|
  //#######################################
  constructor(html) {
    this._compile = this._compile.bind(this);
    this._compileItem = this._compileItem.bind(this);
    //#######################################
    //|
    //|   @params {string} html
    //|
    //#######################################
    this.html = html;
    this.compile = this._compile;
  }

  _compile() {
    var api, i, item, items, len, model;
    //#######################################
    //|
    //|   @params {string} html
    //|   @return {string} html
    //|
    //#######################################
    model = util$6.dom(this.html);
    api = util$6.dom('.api');
    items = model.findAll('item');
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      api.append(this._compileItem(item));
    }
    return api.htmlSelf();
  }

  _compileItem(item) {
    var desc, left, name, right, type;
    //#######################################
    //|
    //|   @params {DOM} item
    //|   @return {DOM} item
    //|
    //#######################################
    name = item.find('name');
    type = item.find('type');
    desc = item.find('desc');
    left = util$6.dom('.left');
    right = util$6.dom('.right');
    if (name) {
      name = util$6.dom('.name').text(name.text());
      left.append(name);
    }
    if (type) {
      type = util$6.dom('.type').text(type.text());
      left.append(type);
    }
    if (desc) {
      desc = util$6.dom('.desc').text(desc.text());
      right.append(desc);
    }
    item = util$6.dom('.item').append(left).append(right);
    return item;
  }

};

var Api$1, Article, Prism, marked$1, util$7;

marked$1 = marked;

Prism = prism;

Api$1 = Api;

util$7 = util;

marked$1.setOptions({
  gfm: true,
  tables: true,
  highlight: (code, lang) => {
    if (lang = Prism.languages[lang]) {
      return Prism.highlight(code, lang);
    } else {
      return code;
    }
  }
});

var Article_1 = Article = class Article {
  //#######################################
  //|
  //|   new Article( markdown )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="article">
  //|   -----------------------------------
  //|
  //|   article.parse()   -> sections
  //|   article.compile() -> html
  //|   article.render()  -> dom
  //|
  //|   Article.scrollTo( dom, id )
  //|   Article.locateID( dom )        -> id
  //|   Article.getSectionDatas( dom ) -> datas
  //|
  //#######################################
  constructor(markdown) {
    this._parse = this._parse.bind(this);
    this._parseSections = this._parseSections.bind(this);
    this._parseSection = this._parseSection.bind(this);
    this._checkLine = this._checkLine.bind(this);
    this._parseHeadings = this._parseHeadings.bind(this);
    this._parseHeading = this._parseHeading.bind(this);
    this._parseOrder = this._parseOrder.bind(this);
    this._compile = this._compile.bind(this);
    this._compileSection = this._compileSection.bind(this);
    this._compileHeading = this._compileHeading.bind(this);
    this._compileContent = this._compileContent.bind(this);
    this._compileExample = this._compileExample.bind(this);
    this._compileHTML = this._compileHTML.bind(this);
    this._compilePre = this._compilePre.bind(this);
    this._compileApi = this._compileApi.bind(this);
    this._isTag = this._isTag.bind(this);
    this._render = this._render.bind(this);
    //#######################################
    //|
    //|   @params {string} markdown
    //|
    //#######################################
    this.markdown = markdown;
    this.parse = this._parse;
    this.compile = this._compile;
    this.render = this._render;
  }

  _parse() {
    var sections;
    //#######################################
    //|
    //|   @return {object[]} sections - [{ heading, content, example }]
    //|
    //#######################################
    sections = this._parseSections(this.markdown);
    sections = this._parseHeadings(sections);
    return sections;
  }

  _parseSections(markdown) {
    var i, inCode, inExample, isCode, isExampleEnd, isExampleStart, j, len, line, lines, next, section, sectionLines, sections;
    //#######################################
    //|
    //|   @params {string}   markdown
    //|   @return {object[]} sections - [{ heading, content, example }]
    //|
    //#######################################
    lines = markdown.split('\n');
    sections = [];
    sectionLines = [];
    inExample = false;
    inCode = false;
    for (i = j = 0, len = lines.length; j < len; i = ++j) {
      line = lines[i];
      sectionLines.push(line);
      ({isExampleStart, isExampleEnd, isCode} = this._checkLine(line));
      if (isExampleStart) {
        inExample = true;
      }
      if (isExampleEnd) {
        inExample = false;
      }
      if (isCode) {
        inCode = !inCode;
      }
      next = this._checkLine(lines[i + 1]);
      if (next.isHeading || next.isEOF) {
        if (!(inExample || inCode)) {
          section = this._parseSection(sectionLines);
          sections.push(section);
          sectionLines = [];
        }
      }
    }
    return sections;
  }

  _parseSection(sectionLines) {
    var content, example, heading, i, inExample, isExampleEnd, isExampleStart, isHeading, j, len, line;
    //#######################################
    //|
    //|   @params {string[]} sectionLines
    //|   @return {object}   section - {string} heading
    //|                                {string} content
    //|                                {string} example
    //|
    //#######################################
    heading = '';
    content = '';
    example = '';
    inExample = false;
    for (i = j = 0, len = sectionLines.length; j < len; i = ++j) {
      line = sectionLines[i];
      ({isExampleStart, isExampleEnd, isHeading} = this._checkLine(line));
      if (isExampleStart) {
        inExample = true;
        continue;
      }
      if (isExampleEnd) {
        inExample = false;
        continue;
      }
      if (isHeading && i === 0) {
        heading = line;
        continue;
      }
      if (inExample) {
        example += `${line}\n`;
      } else {
        content += `${line}\n`;
      }
    }
    heading = heading.trim();
    content = content.trim();
    example = example.trim();
    return {heading, content, example};
  }

  _checkLine(line) {
    var code, exampleEnd, exampleStart, heading, isCode, isEOF, isExampleEnd, isExampleStart, isHeading;
    //#######################################
    //|
    //|   @return {object} - {boolean} isExampleStart
    //|                      {boolean} isExampleEnd
    //|                      {boolean} isCode
    //|                      {boolean} isHeading
    //|                      {boolean} isEOF
    //|
    //#######################################
    exampleStart = /^\s*<example>/;
    exampleEnd = /^\s*<\/example>/;
    code = /^\s*```/;
    heading = /^\s*#{1,6}/;
    isExampleStart = line && exampleStart.test(line);
    isExampleEnd = line && exampleEnd.test(line);
    isCode = line && code.test(line);
    isHeading = line && heading.test(line);
    isEOF = line === void 0;
    return {isExampleStart, isExampleEnd, isCode, isHeading, isEOF};
  }

  _parseHeadings(sections) {
    var heading, i, j, len, prev, ref, ref1, section;
//#######################################
//|
//|   @params {object[]} sections - [{ heading, content, example }]
//|   @return {object[]} sections - [{ heading, content, example }]
//|
//#######################################
    for (i = j = 0, len = sections.length; j < len; i = ++j) {
      section = sections[i];
      heading = (ref = sections[i]) != null ? ref.heading : void 0;
      prev = (ref1 = sections[i - 1]) != null ? ref1.heading : void 0;
      section.heading = this._parseHeading(heading, prev);
    }
    return sections;
  }

  _parseHeading(heading, prev) {
    var lv, order, results, text;
    //#######################################
    //|
    //|   @params {string} heading
    //|   @params {object} prev - {number} lv
    //|                           {string} text
    //|                           {string} order
    //|
    //|   @return {object} heading - {number} lv
    //|                              {string} text
    //|                              {string} order
    //|
    //|   Assume the prev.order is '1.2',
    //|
    //|      '#### Quick Start'  ->  { lv: 4, text: 'Quick Start', order: '1.2.0.1' }
    //|
    //#######################################
    if (heading) {
      heading = heading.trim();
      results = heading.match(/^(#+)\s*(.*)$/);
      lv = results[1].length;
      text = results[2];
      order = this._parseOrder(lv, prev != null ? prev.order : void 0);
      return {lv, order, text};
    } else {
      return null;
    }
  }

  _parseOrder(lv, prevOrder) {
    var order;
    //#######################################
    //|
    //|   @params {number} lv
    //|   @params {string} prevOrder
    //|   @return {string} order
    //|
    //#######################################
    if (prevOrder) {
      // Assume lv = 3, prevOrder = '1.2.3.4'
      order = prevOrder.split('.'); // order = ['1', '2', '3', '4']
      order = order.map((p) => {
        return parseInt(p); // order = [1, 2, 3, 4]
      });
      while (order.length < lv) { // order = [1, 2, 3, 4]  append 0 if order.length < 3
        order.push(0);
      }
      order[lv - 1] += 1; // order = [1, 2, 4, 4]
      order = order.slice(0, lv); // order = [1, 2, 4]
      order = order.join('.'); // order = '1.2.4'
      return order;
    } else {
      return '1';
    }
  }

  _compile() {
    var article, sections;
    //#######################################
    //|
    //|   Compile article-markdown to html.
    //|
    //|   @return {string} html
    //|
    //#######################################
    sections = this._parse();
    sections = sections.map(this._compileSection).join('');
    article = util$7.dom('#article');
    article.html(sections);
    return article.htmlSelf();
  }

  _compileSection(section) {
    var content, example, heading, id, lv, order, text;
    //#######################################
    //|
    //|   @params {object} section - {object} heading
    //|                              {string} content
    //|                              {string} example
    //|   @return {string} section
    //|
    //#######################################
    ({heading, content, example} = section);
    lv = heading != null ? heading.lv : void 0;
    text = heading != null ? heading.text : void 0;
    order = heading != null ? heading.order : void 0;
    id = util$7.id(order, text);
    heading = heading ? this._compileHeading(heading) : '';
    content = content ? this._compileContent(content) : '';
    example = example ? this._compileExample(example) : '';
    section = heading + content + example;
    section = util$7.dom('.section').html(section);
    if (id) {
      section.attr('id', id);
    }
    if (id) {
      section.attr('href', '#' + id);
    }
    if (lv) {
      section.addClass('lv' + lv);
    }
    if (!text) {
      section.addClass('no-heading');
    }
    return section.htmlSelf();
  }

  _compileHeading(heading) {
    var lv, order, text;
    //#######################################
    //|
    //|   @params {object} heading - {number} lv
    //|                              {string} text
    //|                              {string} order
    //|   @params {string} heading
    //|
    //#######################################
    ({lv, text, order} = heading);
    if (lv <= Breeze.config('article.showOrderLevel')) {
      text = `${order} ${text}`;
    }
    return `<h${lv}>${text.trim()}</h${lv}>`;
  }

  _compileContent(content) {
    var renderer;
    //#######################################
    //|
    //|   @params {string} content ( markdown )
    //|   @return {string} content ( html )
    //|
    //#######################################
    renderer = new marked$1.Renderer();
    renderer.html = this._compileHTML;
    content = marked$1(content, {renderer});
    return `<div class="content">${content}</div>`;
  }

  _compileExample(example) {
    var renderer;
    //#######################################
    //|
    //|   @params {string} example ( markdown )
    //|   @return {string} example ( html )
    //|
    //#######################################
    renderer = new marked$1.Renderer();
    renderer.html = this._compileHTML;
    example = marked$1(example, {renderer});
    return `<div class="example">${example}</div>`;
  }

  _compileHTML(html) {
    //#######################################
    //|
    //|   @params {string} html
    //|   @return {string} html
    //|
    //|   For renderer.html
    //|
    //#######################################
    html = html.trim();
    switch (false) {
      case !this._isTag('pre', html):
        return this._compilePre(html);
      case !this._isTag('api', html):
        return this._compileApi(html);
      default:
        return html;
    }
  }

  _compilePre(html) {
    var code, pre;
    //#######################################
    //|
    //|   @params {string} html
    //|   @return {string} html
    //|
    //#######################################
    pre = util$7.dom(html);
    pre.html(pre.html().trim());
    if (code = pre.find('code')) {
      code.html(code.html().trim());
    }
    return pre.htmlSelf();
  }

  _compileApi(html) {
    var api;
    //#######################################
    //|
    //|   @params {string} html
    //|   @return {string} html
    //|
    //#######################################
    api = new Api$1(html);
    return api.compile();
  }

  _isTag(name, html) {
    var reg;
    //#######################################
    //|
    //|   @params {string} name
    //|   @params {string} html
    //|
    //|   @return {boolean}
    //|
    //#######################################
    reg = new RegExp(`^<\\s*${name}\\s*>(.|\n)*?<\\s*/\\s*${name}\\s*>$`);
    return reg.test(html);
  }

  _render() {
    //#######################################
    //|
    //|   @return {DOM} article
    //|
    //#######################################
    return util$7.dom(this._compile());
  }

};

Article.scrollTo = (article, id) => {
  var section, top;
  //#######################################
  //|
  //|   @params {DOM}    article
  //|   @params {string} id
  //|
  //#######################################
  section = article.find(`[id="${id}"]`);
  if (section) {
    top = section.top();
    return window.scrollBy(0, top - Breeze.navHeight + 1);
  } else {
    return window.scrollTo(0, 0);
  }
};

Article.locateID = (article) => {
  var i, id, j, len, section, sections;
  //#######################################
  //|
  //|   @params {DOM}    article
  //|   @return {string} id
  //|
  //#######################################
  sections = article.findAll('.section');
  for (i = j = 0, len = sections.length; j < len; i = ++j) {
    section = sections[i];
    if (section.top() > 0) {
      break;
    }
  }
  if (section = sections[i - 1]) {
    if (id = section.attr('id')) {
      return id;
    }
  }
  return '';
};

Article.getSectionDatas = (article) => {
  var j, len, section, sectionData, sectionDatas, sections;
  //#######################################
  //|
  //|   @params {DOM}      article
  //|   @return {object[]} sectionDatas - [{ id, heading, content, example }]
  //|
  //#######################################
  sections = article.findAll('.section');
  sectionDatas = [];
  for (j = 0, len = sections.length; j < len; j++) {
    section = sections[j];
    sectionData = Article._getSectionData(section);
    sectionDatas.push(sectionData);
  }
  return sectionDatas;
};

Article._getSectionData = (section) => {
  var content, example, heading, id, ref;
  //#######################################
  //|
  //|   @params {DOM}    section
  //|   @return {object} sectionData - {string} id
  //|                                  {string} heading
  //|                                  {string} content
  //|                                  {string} example
  //|
  //#######################################
  id = (ref = section.attr('id')) != null ? ref : '';
  heading = Article._getHeadingData(section);
  content = Article._getContentData(section);
  example = Article._getExampleData(section);
  return {id, heading, content, example};
};

Article._getHeadingData = (section) => {
  var heading, sels;
  //#######################################
  //|
  //|   @params {DOM}    section
  //|   @return {string} heading
  //|
  //#######################################
  sels = ['.section > h1', '.section > h2', '.section > h3', '.section > h4', '.section > h5', '.section > h6'];
  heading = section.find(sels.join(','));
  if (heading) {
    return heading.text();
  } else {
    return '';
  }
};

Article._getContentData = (section) => {
  var content;
  //#######################################
  //|
  //|   @params {DOM}    section
  //|   @return {string} content
  //|
  //#######################################
  content = section.find('.content');
  if (content) {
    return content.text().replace(/(?:\s|\n)+/g, '');
  } else {
    return '';
  }
};

Article._getExampleData = (section) => {
  var example;
  //#######################################
  //|
  //|   @params {DOM}    section
  //|   @return {string} example
  //|
  //#######################################
  example = section.find('.example');
  if (example) {
    return example.text().replace(/(?:\s|\n)+/g, '');
  } else {
    return '';
  }
};

var Search;

var Search_1 = Search = class Search {
  //#######################################
  //|
  //|   new Search( html )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="search">
  //|   -----------------------------------
  //|
  //|   search.compile() -> html
  //|
  //|   Search.find( key, datas )     -> items
  //|   Search.showItems( ul, items ) -> item-doms
  //|   Search.hideItems( ul )
  //|   Search.focus( input )
  //|   Search.clear( input )
  //|   Search.showClear( clear )
  //|   Search.hideClear( clear )
  //|
  //#######################################
  constructor() {
    this._compile = this._compile.bind(this);
    this.compile = this._compile;
  }

  _compile() {
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    return "<div id=\"search\">\n   <div class=\"input-box\">\n      <input autofocus spellcheck=\"false\"/>\n      <div class=\"clear\"></div>\n   </div>\n   <ul class=\"items\"></ul>\n</div>";
  }

};

Search.find = (key, datas) => {
  var items;
  //#######################################
  //|
  //|   @params {string}   key
  //|   @params {object[]} datas - [{ id, heading, content, example }]
  //|
  //|   @return {object[]} items - [{ id, heading, content, example }]
  //|
  //#######################################
  key = key.replace('\\', '\\\\');
  key = key.replace(/(?:\s|\n)+/g, '');
  items = Search._match(key, datas);
  items = Search._sortItems(items);
  return items;
};

Search._match = (key, datas) => {
  var data, i, item, items, len;
  //#######################################
  //|
  //|   @params {string}   key
  //|   @params {object[]} datas - [{ id, heading, content, example }]
  //|
  //|   @return {object[]} items - [{ id, heading, content, example }]
  //|
  //#######################################
  items = [];
  for (i = 0, len = datas.length; i < len; i++) {
    data = datas[i];
    item = Search._matchSection(key, data);
    if (item) {
      items.push(item);
    }
  }
  return items;
};

Search._matchSection = (key, data) => {
  var content, example, heading, id, result;
  //#######################################
  //|
  //|   @params {string} key
  //|   @params {object} data - {string} id
  //|                           {string} heading
  //|                           {string} content
  //|                           {string} example
  //|
  //|   @return {object} item - {string} id
  //|                           {string} heading
  //|                           {string} content - is undefined if needless
  //|                           {string} example - is undefined if needless
  //|
  //#######################################
  ({id, heading, content, example} = data);
  if (heading) {
    if (result = Search._matchHeading(key, heading)) {
      return {
        id,
        heading: result
      };
    }
  }
  if (content) {
    if (result = Search._matchContent(key, content)) {
      return {
        id,
        heading,
        content: result
      };
    }
  }
  if (example) {
    if (result = Search._matchExample(key, example)) {
      return {
        id,
        heading,
        example: result
      };
    }
  }
  return null;
};

Search._matchHeading = (key, heading) => {
  var reg;
  //#######################################
  //|
  //|   @params {string} key
  //|   @params {string} heading
  //|
  //|   @return {string} heading - return '' when not matched
  //|
  //#######################################
  reg = new RegExp(key, 'i');
  if (reg.test(heading)) {
    heading = heading.replace(/</g, '&lt;');
    heading = heading.replace(/>/g, '&gt;');
    return heading;
  } else {
    return '';
  }
};

Search._matchContent = (key, content) => {
  var end, index, reg, result, start;
  //#######################################
  //|
  //|   @params {string} key
  //|   @params {string} content
  //|
  //|   @return {string} content - return '' when not matched
  //|
  //#######################################
  reg = new RegExp(key, 'i');
  if (result = content.match(reg)) {
    index = result.index;
    start = index - 20;
    end = index + key.length + 20;
    if (start < 0) {
      start = 0;
    }
    if (end > content.length) {
      end = content.length;
    }
    content = content.slice(start, end);
    reg = new RegExp(key, 'ig');
    content = content.replace(/</g, '&lt;');
    content = content.replace(/>/g, '&gt;');
    content = content.replace(reg, (key) => {
      return `<em>${key}</em>`;
    });
    return content;
  } else {
    return '';
  }
};

Search._matchExample = (key, example) => {
  var end, index, reg, result, start;
  //#######################################
  //|
  //|   @params {string} key
  //|   @params {string} example
  //|
  //|   @return {string} example - return '' when not matched
  //|
  //#######################################
  reg = new RegExp(key, 'i');
  if (result = example.match(reg)) {
    index = result.index;
    start = index - 20;
    end = index + key.length + 20;
    if (start < 0) {
      start = 0;
    }
    if (end > example.length) {
      end = example.length;
    }
    example = example.slice(start, end);
    reg = new RegExp(key, 'ig');
    example = example.replace(/</g, '&lt;');
    example = example.replace(/>/g, '&gt;');
    example = example.replace(reg, (key) => {
      return `<em>${key}</em>`;
    });
    return example;
  } else {
    return '';
  }
};

Search._sortItems = (items) => {
  var contentItems, exampleItems, headingItems, i, item, len;
  //#######################################
  //|
  //|   @params {object[]} items - [{ id, heading, content, example }]
  //|   @return {object[]} items - [{ id, heading, content, example }]
  //|
  //#######################################
  headingItems = [];
  contentItems = [];
  exampleItems = [];
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    switch (false) {
      case !item.content:
        contentItems.push(item);
        break;
      case !item.example:
        exampleItems.push(item);
        break;
      default:
        headingItems.push(item);
    }
  }
  return headingItems.concat(contentItems).concat(exampleItems);
};

Search.showItems = (ul, items) => {
  //#######################################
  //|
  //|   @params {DOM}      ul
  //|   @params {object[]} items - [{ id, heading, content, example }]
  //|   @return {DOM[]}    items
  //|
  //#######################################
  items = Search._compileItems(items);
  ul.html(items);
  ul.css('display', 'block');
  return ul.findAll('li');
};

Search.hideItems = (ul) => {
  //#######################################
  //|
  //|   @params {DOM} ul-dom
  //|
  //#######################################
  ul.html('');
  return ul.css('display', 'none');
};

Search._compileItems = (items) => {
  var html, i, item, len;
  //#######################################
  //|
  //|   @params {object[]} items - [{ id, heading, content, example }]
  //|   @return {string}   html
  //|
  //#######################################
  html = '';
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    html += Search._compileItem(item);
  }
  return html;
};

Search._compileItem = (item) => {
  var content, example, heading, html, id;
  //#######################################
  //|
  //|   @params {object} item - {string} id
  //|                           {string} heading
  //|                           {string} content
  //|                           {string} example
  //|   @return {string} html
  //|
  //#######################################
  ({id, heading, content, example} = item);
  if (heading) {
    heading = `<div class="heading">${heading}</div>`;
  }
  if (content) {
    content = `<div class="content">${content}</div>`;
  }
  if (example) {
    example = `<div class="example">${example}</div>`;
  }
  if (id == null) {
    id = '';
  }
  if (heading == null) {
    heading = '';
  }
  if (content == null) {
    content = '';
  }
  if (example == null) {
    example = '';
  }
  html = `<li data-id="${id}">\n   ${heading}\n   ${content}\n   ${example}\n</li>`;
  return html;
};

Search.focus = (input) => {
  //#######################################
  //|
  //|   @params {DOM} input
  //|
  //#######################################
  return input.element().focus();
};

Search.clear = (input) => {
  //#######################################
  //|
  //|   @params {DOM} input
  //|
  //#######################################
  return input.val('');
};

Search.showClear = (clear) => {
  //#######################################
  //|
  //|   @params {DOM} clear
  //|
  //#######################################
  return clear.css('display', 'block');
};

Search.hideClear = (clear) => {
  //#######################################
  //|
  //|   @params {DOM} clear
  //|
  //#######################################
  return clear.css('display', 'none');
};

var Article$1, Cover$1, Markdown$1, Nav$1, Page, Search$1, Summary$1, util$8;

Markdown$1 = Markdown_1;

Nav$1 = Nav_1;

Cover$1 = Cover_1;

Summary$1 = Summary_1;

Article$1 = Article_1;

Search$1 = Search_1;

util$8 = util;

var Page_1 = Page = class Page {
  //#######################################
  //|
  //|   new Page( text )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="page">
  //|   -----------------------------------
  //|
  //|   page.compile() -> html
  //|   page.render()  -> dom
  //|
  //|   Page.layout( dom )
  //|
  //#######################################
  constructor(text) {
    this._parse = this._parse.bind(this);
    this._compile = this._compile.bind(this);
    this._render = this._render.bind(this);
    this.text = text;
    this.compile = this._compile;
    this.render = this._render;
  }

  _parse() {
    var article, cover, markdown, nav, search, sections, summary;
    //#######################################
    //|
    //|   @return {object} - {Article} article
    //|                      {Nav}     nav
    //|                      {Cover}   cover
    //|                      {Search}  search
    //|                      {Summary} summary
    //|
    //#######################################
    markdown = new Markdown$1(this.text);
    ({article, nav, cover, summary} = markdown.parse());
    article = new Article$1(article);
    nav = new Nav$1(nav);
    cover = new Cover$1(cover);
    search = new Search$1();
    if (!summary) {
      summary = Summary$1.parse(sections = article.parse());
    }
    summary = new Summary$1(summary);
    return {article, nav, cover, search, summary};
  }

  _compile() {
    var article, cover, main, nav, page, search, side, summary;
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    ({article, nav, cover, search, summary} = this._parse());
    page = util$8.dom('#page');
    side = util$8.dom('#side');
    main = util$8.dom('#main');
    page.append(nav.compile());
    page.append(cover.compile());
    side.append(search.compile());
    side.append(summary.compile());
    main.append(article.compile());
    page.append(side);
    page.append(main);
    return page.htmlSelf();
  }

  _render() {
    //#######################################
    //|
    //|   @return {DOM} page
    //|
    //#######################################
    return util$8.dom(this._compile());
  }

};

Page.layout = (page) => {
  return Page._layoutNav(page);
};

Page._layoutNav = (page) => {
  var main, nav, side;
  nav = page.find('#nav');
  side = page.find('#side');
  main = page.find('#main');
  if (nav && nav.hasClass('fixed')) {
    Breeze.navHeight = nav.height();
    side.css('paddingTop', Breeze.navHeight + 'px');
    return main.css('paddingTop', Breeze.navHeight + 'px');
  } else {
    return Breeze.navHeight = 0;
  }
};

var ObservableObject;

var ObservableObject_1 = ObservableObject = class ObservableObject {
  //#######################################
  //|
  //|   new ObservableObject()
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       binding and emitting events,
  //|       generally be extended by other classes.
  //|   -----------------------------------
  //|
  //|   observableObject.on( name, callback )
  //|   observableObject.emit( name, params... )
  //|
  //#######################################
  constructor() {
    this._on = this._on.bind(this);
    this._emit = this._emit.bind(this);
    this._events = {};
    this.on = this._on;
    this.emit = this._emit;
  }

  _on(name, callback) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(callback);
    return this;
  }

  _emit(name, ...params) {
    var callback, callbacks, i, len, ref;
    //#######################################
    //|
    //|   Trigger an event.
    //|
    //|   @params {string} event's name
    //|   @params {*...}   params...
    //|
    //|   @return {ObservableObject} this
    //|
    //#######################################
    callbacks = (ref = this._events[name]) != null ? ref : [];
    for (i = 0, len = callbacks.length; i < len; i++) {
      callback = callbacks[i];
      callback(...params);
    }
    return this;
  }

};

var Article$2, Cover$2, ObservableObject$1, PageEventBus, Search$2, Summary$2,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$1 = ObservableObject_1;

Article$2 = Article_1;

Cover$2 = Cover_1;

Search$2 = Search_1;

Summary$2 = Summary_1;

var PageEventBus_1 = PageEventBus = class PageEventBus extends ObservableObject$1 {
  //#######################################
  //|
  //|   new PageEventBus( page-dom )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       binding and handling all events in this page.
  //|   -----------------------------------
  //|
  //#######################################
  constructor(page) {
    super();
    this._bindEvents = this._bindEvents.bind(this);
    this._onScrollArticle = this._onScrollArticle.bind(this);
    this._onClickCoverButton = this._onClickCoverButton.bind(this);
    this._onClickSummaryLink = this._onClickSummaryLink.bind(this);
    this._onClickLink = this._onClickLink.bind(this);
    this._onInputSearchInput = this._onInputSearchInput.bind(this);
    this._onClickSearchClear = this._onClickSearchClear.bind(this);
    this._onClickSearchItem = this._onClickSearchItem.bind(this);
    this._page = page;
    this._main = this._page.find('#main');
    this._side = this._page.find('#side');
    this._nav = this._page.find('#nav');
    this._cover = this._page.find('#cover');
    this._coverButtons = this._cover.findAll('.buttons a');
    this._search = this._page.find('#search');
    this._searchInput = this._search.find('input');
    this._searchClear = this._search.find('.clear');
    this._searchItems = this._search.find('.items');
    this._summary = this._page.find('#summary');
    this._summaryLinks = this._summary.findAll('a');
    this._article = this._page.find('#article');
    this._links = this._page.findAll('a');
    this._isOverSide = false;
    this._isOverMain = false;
    this._sectionDatas = Article$2.getSectionDatas(this._article);
    this._bindEvents();
  }

  _bindEvents() {
    var button, i, j, k, len, len1, len2, link, ref, ref1, ref2;
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   To bind all events of dom-tree.
    //|
    //#######################################
    window.addEventListener('scroll', this._onScrollArticle);
    this._side.on('mouseenter', () => {
      return this._isOverSide = true;
    });
    this._main.on('mouseenter', () => {
      return this._isOverMain = true;
    });
    this._side.on('mouseleave', () => {
      return this._isOverSide = false;
    });
    this._main.on('mouseleave', () => {
      return this._isOverMain = false;
    });
    ref = this._coverButtons;
    for (i = 0, len = ref.length; i < len; i++) {
      button = ref[i];
      button.on('click', this._onClickCoverButton);
    }
    ref1 = this._summaryLinks;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      link = ref1[j];
      link.on('click', this._onClickSummaryLink);
    }
    ref2 = this._links;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      link = ref2[k];
      link.on('click', this._onClickLink);
    }
    this._searchInput.on('input', this._onInputSearchInput);
    return this._searchClear.on('click', this._onClickSearchClear);
  }

  _onScrollArticle() {
    var href, id;
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   When scroll the article,
    //|
    //|      1. redirect #id
    //|      2. active the summary
    //|      3. scroll the summary
    //|
    //#######################################
    if (this._article.isVisible() && this._isOverMain) {
      id = Article$2.locateID(this._article);
      href = '#' + id;
      Breeze.go(href);
      Summary$2.activeTo(this._summary, id);
      return Summary$2.scrollTo(this._summary, id);
    }
  }

  _onClickCoverButton(button) {
    var href;
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   @params {DOM} button
    //|
    //|   When click the cover's button,
    //|      1. if href is current page, hide the cover
    //|
    //#######################################
    href = button.attr('href');
    if (href && Breeze.isCurrentPath(href)) {
      return Cover$2.hide(this._cover);
    }
  }

  _onClickSummaryLink(link) {
    var href, id;
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   @params {DOM} link
    //|
    //|   When click the summary's link,
    //|      1. active the summary
    //|      2. scroll the article
    //|
    //#######################################
    href = link.attr('href');
    if (href && Breeze.isCurrentPath(href)) {
      id = Breeze.resolveID(href);
      Summary$2.activeTo(this._summary, id);
      return Article$2.scrollTo(this._article, id);
    }
  }

  _onClickLink(link) {
    var href;
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   @params {DOM} link
    //|
    //|   When click any link,
    //|      1. redirect path#id | open url
    //|
    //#######################################
    if (href = link.attr('href')) {
      return Breeze.go(href);
    }
  }

  _onInputSearchInput(input) {
    var i, item, items, key, len;
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   @params {DOM} input
    //|
    //|   When input search-key,
    //|
    //|      1. find items from section-datas
    //|      2. show or hide clear
    //|      3. show or hide items
    //|      4. bind click-event of items
    //|
    //#######################################
    if (key = input.val().trim()) {
      items = Search$2.find(key, this._sectionDatas);
      items = Search$2.showItems(this._searchItems, items);
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        item.on('click', this._onClickSearchItem.bind(this, item));
      }
      return Search$2.showClear(this._searchClear);
    } else {
      Search$2.hideClear(this._searchClear);
      return Search$2.hideItems(this._searchItems);
    }
  }

  _onClickSearchClear(clear) {
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   @params {DOM} clear
    //|
    //|   When click search clear-button,
    //|
    //|      1. clear input's key
    //|      2. hide items
    //|      3. hide clear
    //|
    //#######################################
    Search$2.clear(this._searchInput);
    Search$2.focus(this._searchInput);
    Search$2.hideClear(this._searchClear);
    return Search$2.hideItems(this._searchItems);
  }

  _onClickSearchItem(item) {
    var href, id;
    boundMethodCheck(this, PageEventBus);
    //#######################################
    //|
    //|   @params {DOM} item
    //|
    //|   When click search item,
    //|      1. scroll the article
    //|
    //#######################################
    id = item.attr('data-id');
    href = '#' + id;
    Breeze.go(href);
    Search$2.focus(this._searchInput);
    return Article$2.scrollTo(this._article, id);
  }

};

var App, Page$1, PageEventBus$1, util$9;

Page$1 = Page_1;

PageEventBus$1 = PageEventBus_1;

util$9 = util;

var App_1 = App = class App {
  //#######################################
  //|
  //|   new App( isJIT )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       managing pages and swapping them when necessary.
  //|   -----------------------------------
  //|
  //#######################################
  constructor(isJIT = false) {
    this._runStatic = this._runStatic.bind(this);
    this._runJIT = this._runJIT.bind(this);
    this._loadPage = this._loadPage.bind(this);
    this._renderPage = this._renderPage.bind(this);
    this._render404 = this._render404.bind(this);
    this._mountPage = this._mountPage.bind(this);
    //#######################################
    //|
    //|   @params {boolean} isJIT - is the 'Just In Time' mode ?
    //|
    //#######################################
    this._isJIT = isJIT;
    this._cache = {};
    this._loader = new Breeze.Loader();
    if (this._isJIT) {
      this._runJIT();
    } else {
      this._runStatic();
    }
  }

  _runStatic() {
    var page;
    //#######################################
    //|
    //|   when no-JIT,
    //|      bindEvents
    //|
    //#######################################
    page = document.querySelector('#page');
    page = util$9.dom(page);
    return new PageEventBus$1(page);
  }

  _runJIT() {
    //#######################################
    //|
    //|   when JIT,
    //|      loadPage -> renderPage -> mountPage -> bindEvents
    //|
    //#######################################
    this._loadPage();
    return Breeze.on('reload', this._loadPage);
  }

  _loadPage() {
    var page, path;
    //#######################################
    //|
    //|   Load page from cache or local.
    //|
    //#######################################
    path = Breeze.getPath();
    page = this._cache[path];
    if (page) {
      return this._mountPage(page);
    } else {
      return this._loader.load(path, this._renderPage, this._render404);
    }
  }

  _renderPage(text) {
    var page;
    //#######################################
    //|
    //|   @params {string} text
    //|
    //|   1. create
    //|   2. bind events
    //|   3. save to cache
    //|   4. mount
    //|
    //#######################################
    page = new Page$1(text);
    page = page.render();
    this._cache[Breeze.getPath()] = page;
    return this._mountPage(page);
  }

  _render404() {
    return console.log('TODO: render 404');
  }

  _mountPage(page) {
    var currentPage;
    //#######################################
    //|
    //|   @params {DOM} page
    //|
    //#######################################
    currentPage = document.querySelector('body > #page');
    if (currentPage) {
      document.body.replaceChild(page.element(), currentPage);
    } else {
      document.body.appendChild(page.element());
    }
    Page$1.layout(page);
    return new PageEventBus$1(page);
  }

};

var Breeze$1, ObservableObject$2,
  boundMethodCheck$1 = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$2 = ObservableObject_1;

var Breeze_1 = Breeze$1 = class Breeze extends ObservableObject$2 {
  //#######################################
  //|
  //|   window.Breeze = new Breeze()
  //|
  //|   -----------------------------------
  //|    The main module be exported,
  //|        will bind some methods in index.coffee,
  //|
  //|    Set the default options in here.
  //|   -----------------------------------
  //|
  //|   Breeze.config( name, value ) -> this
  //|   Breeze.config( name )        -> value
  //|
  //#######################################
  constructor() {
    super();
    this._config = this._config.bind(this);
    this._options = {};
    this._config('basePath', '');
    this._config('common.use', false);
    this._config('common.map', {});
    this._config('summary.showLevel', 3);
    this._config('summary.showOrderLevel', 0);
    this._config('article.showOrderLevel', 0);
    this.config = this._config;
  }

  _config(name, value) {
    boundMethodCheck$1(this, Breeze);
    //#######################################
    //|
    //|   SET   @params {string} name
    //|         @params {*}      value
    //|         @return {Breeze} this
    //|
    //|   GET   @params {string} name
    //|         @return {*}      value
    //|
    //#######################################
    if (value) {
      this._options[name] = value;
      return this;
    } else {
      return this._options[name];
    }
  }

};

var App$1, Breeze$2, DOM$1, Loader$1, Router$1, isJIT, router;

DOM$1 = DOM_web;

Loader$1 = Loader_web;

Router$1 = Router_1;

App$1 = App_1;

Breeze$2 = Breeze_1;

Breeze$2 = new Breeze$2;

router = new Router$1(isJIT = true);

window.addEventListener('load', () => {
  return window.app = new App$1(isJIT = true);
});

Breeze$2.DOM = DOM$1;

Breeze$2.Loader = Loader$1;

Breeze$2.config = Breeze$2.config;

Breeze$2.on = Breeze$2.on;

Breeze$2.getPath = router.getPath;

Breeze$2.getQuery = router.getQuery;

Breeze$2.resolvePath = router.resolvePath;

Breeze$2.resolveID = router.resolveID;

Breeze$2.isCurrentPath = router.isCurrentPath;

Breeze$2.isCurrentID = router.isCurrentID;

Breeze$2.go = router.go;

var src = Breeze$2;

return src;

}());
