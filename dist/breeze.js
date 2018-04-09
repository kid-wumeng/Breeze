var Breeze = (function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {
var dom, filePath, id, isH5, isUrl, parseSelector;

isH5 = () => {
  var ref, ref1, width;
  //#######################################
  //|
  //|   @return {boolean}
  //|
  //#######################################
  width = (ref = typeof document !== "undefined" && document !== null ? (ref1 = document.documentElement) != null ? ref1.clientWidth : void 0 : void 0) != null ? ref : 0;
  return width <= 1024;
};

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

exports.isH5 = isH5;

exports.isUrl = isUrl;

exports.filePath = filePath;

exports.id = id;

exports.dom = dom;

exports.parseSelector = parseSelector;
});
var util_1 = util.isH5;
var util_2 = util.isUrl;
var util_3 = util.filePath;
var util_4 = util.id;
var util_5 = util.dom;
var util_6 = util.parseSelector;

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
  //|   dom.replace( newDom )    -> this
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
    this._replace = this._replace.bind(this);
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
    this.replace = this._replace;
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

  _replace(newDom) {
    //#######################################
    //|
    //|   @params {DOM} newDom
    //|   @return {DOM} newDom
    //|
    //|   This method only exists in DOM.web
    //|
    //#######################################
    this._root.parentNode.replaceChild(newDom.element(), this._root);
    return newDom;
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

var Head, util$3;

util$3 = util;

var Head_1 = Head = class Head {
  //#######################################
  //|
  //|   new Head( nav )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="head">
  //|   -----------------------------------
  //|
  //|   head.compile() -> html
  //|
  //|   Head.hideWhenNothing( head )
  //|
  //#######################################
  constructor(nav) {
    this._compile = this._compile.bind(this);
    //#######################################
    //|
    //|   @params {string} nav-html
    //|
    //#######################################
    this.nav = nav;
    this.compile = this._compile;
  }

  _compile() {
    var center, hamburger, head, left, right;
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    head = util$3.dom('#head');
    left = util$3.dom('.left');
    center = util$3.dom('.center');
    right = util$3.dom('.right');
    hamburger = util$3.dom('.hamburger');
    left.append(hamburger);
    if (this.nav) {
      right.append(this.nav);
    }
    head.append(left);
    head.append(center);
    head.append(right);
    return head.htmlSelf();
  }

};

Head.hideWhenNothing = (head) => {
  var others;
  //#######################################
  //|
  //|   @params {DOM} head
  //|
  //|   Hide head when only has hamburger ( when H5 )
  //|
  //#######################################
  others = head.findAll('#head > * > *:not(.hamburger)');
  if (others.length === 0) {
    return head.css('display', 'none');
  }
};

var Side, util$4;

util$4 = util;

var Side_1 = Side = class Side {
  //#######################################
  //|
  //|   new Side( search, summary )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="side">
  //|   -----------------------------------
  //|
  //|   side.compile() -> html
  //|
  //|   Side.setTop( side )
  //|   Side.open( side )
  //|   Side.close( side )
  //|
  //#######################################
  constructor(search, summary) {
    this._compile = this._compile.bind(this);
    //#######################################
    //|
    //|   @params {string} search-html
    //|   @params {string} summary-html
    //|
    //#######################################
    this.search = search;
    this.summary = summary;
    this.compile = this._compile;
  }

  _compile() {
    var navPH, side;
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    side = util$4.dom('#side');
    navPH = util$4.dom('#h5-nav-placeholder');
    side.append(this.search);
    side.append(navPH);
    side.append(this.summary);
    return side.htmlSelf();
  }

};

Side.setTop = (side) => {
  //#######################################
  //|
  //|   @params {DOM} side
  //|
  //#######################################
  return side.css('paddingTop', Breeze.headHeight + 'px');
};

Side.open = (side) => {
  //#######################################
  //|
  //|   @params {DOM} side
  //|
  //#######################################
  return side.addClass('open');
};

Side.close = (side) => {
  //#######################################
  //|
  //|   @params {DOM} side
  //|
  //#######################################
  return side.removeClass('open');
};

var Main, util$5;

util$5 = util;

var Main_1 = Main = class Main {
  //#######################################
  //|
  //|   new Main( article )
  //|
  //|   -----------------------------------
  //|    Be responsible for
  //|       handling the <div id="main">
  //|   -----------------------------------
  //|
  //|   main.compile() -> html
  //|
  //|   Main.setTop( main )
  //|
  //#######################################
  constructor(article) {
    this._compile = this._compile.bind(this);
    //#######################################
    //|
    //|   @params {string} article-html
    //|
    //#######################################
    this.article = article;
    this.compile = this._compile;
  }

  _compile() {
    var main;
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    main = util$5.dom('#main');
    main.append(this.article);
    return main.htmlSelf();
  }

};

Main.setTop = (main) => {
  //#######################################
  //|
  //|   @params {DOM} main
  //|
  //#######################################
  return main.css('paddingTop', Breeze.headHeight + 'px');
};

var Nav, util$6;

util$6 = util;

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
    this._exist = this._exist.bind(this);
    this._compile = this._compile.bind(this);
    this._compileEmpty = this._compileEmpty.bind(this);
    this._compileMenu = this._compileMenu.bind(this);
    this._compileMenuByLink = this._compileMenuByLink.bind(this);
    this._compileMenuByItems = this._compileMenuByItems.bind(this);
    this._compileItem = this._compileItem.bind(this);
    this._compileItemByLink = this._compileItemByLink.bind(this);
    this._compileItemByHint = this._compileItemByHint.bind(this);
    this._compileLine = this._compileLine.bind(this);
    //#######################################
    //|
    //|   @params {string} html
    //|
    //#######################################
    this.html = html;
    this.exist = this._exist;
    this.compile = this._compile;
  }

  _exist() {
    return !!this.html;
  }

  _compile() {
    var i, len, menu, menus, model, nav;
    if (!this._exist()) {
      return '';
    }
    model = util$6.dom(this.html);
    nav = util$6.dom('#nav');
    menus = model.findAll('nav > menu');
    for (i = 0, len = menus.length; i < len; i++) {
      menu = menus[i];
      menu = this._compileMenu(menu);
      nav.append(menu);
    }
    return nav.htmlSelf();
  }

  _compileEmpty() {
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    return "<div id=\"nav\" style=\"display: none\"/>";
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
    h1 = util$6.dom('h1');
    a = util$6.dom('a').attr('href', href).text(name);
    h1.append(a);
    return util$6.dom('.menu').append(h1);
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
    h1 = util$6.dom('h1').text(name).addClass('hint');
    ul = util$6.dom('ul');
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
    return util$6.dom('.menu').append(h1).append(ul);
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
    li = util$6.dom('li');
    a = util$6.dom('a').attr('href', href).text(name);
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
    li = util$6.dom('li.hint').text(name);
    return li;
  }

  _compileLine() {
    //#######################################
    //|
    //|   @return {DOM} li
    //|
    //#######################################
    return util$6.dom('li.line');
  }

};

var Cover, util$7;

util$7 = util;

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
    this._exist = this._exist.bind(this);
    this._compile = this._compile.bind(this);
    this._compileEmpty = this._compileEmpty.bind(this);
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
    this.exist = this._exist;
    this.compile = this._compile;
    this.render = this._render;
  }

  _exist() {
    return !!this.html;
  }

  _compile() {
    var buttons, cover, descs, items, logo, model, name, wrap;
    if (!this._exist()) {
      return this._compileEmpty();
    }
    model = util$7.dom(this.html);
    cover = util$7.dom('#cover');
    wrap = util$7.dom('.wrap');
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

  _compileEmpty() {
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    return "<div id=\"cover\" style=\"display: none\"/>";
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
    src = util$7.filePath(src);
    logo = util$7.dom('img.logo');
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
    name = util$7.dom('.name').text(text);
    version = util$7.dom('.version').text(version);
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
    ul = util$7.dom('ul.descs');
    for (i = 0, len = descs.length; i < len; i++) {
      desc = descs[i];
      li = util$7.dom('li').text(desc.text());
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
    ul = util$7.dom('ul.items');
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      li = util$7.dom('li').text(item.text());
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
    ul = util$7.dom('ul.buttons');
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      li = util$7.dom('li');
      a = util$7.dom('a');
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
    return util$7.dom(this._compile());
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

var Summary, util$8;

util$8 = util;

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
    model = util$8.dom(this.html);
    summary = util$8.dom('#summary');
    ul = util$8.dom('ul');
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
    li = util$8.dom('li').attr('href', href).addClass(`lv${lv}`);
    a = util$8.dom('a').attr('href', href);
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
    li = util$8.dom('li.hint').addClass(`lv${lv}`);
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
    return util$8.dom(this._compile());
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
  href = util$8.id(order, text);
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

var API, util$9;

util$9 = util;

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
    model = util$9.dom(this.html);
    api = util$9.dom('.api');
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
    left = util$9.dom('.left');
    right = util$9.dom('.right');
    if (name) {
      name = util$9.dom('.name').text(name.text());
      left.append(name);
    }
    if (type) {
      type = util$9.dom('.type').text(type.text());
      left.append(type);
    }
    if (desc) {
      desc = util$9.dom('.desc').text(desc.text());
      right.append(desc);
    }
    item = util$9.dom('.item').append(left).append(right);
    return item;
  }

};

var Api$1, Article, Prism, marked$1, util$10;

marked$1 = marked;

Prism = prism;

Api$1 = Api;

util$10 = util;

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
    article = util$10.dom('#article');
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
    id = util$10.id(order, text);
    heading = heading ? this._compileHeading(heading) : '';
    content = content ? this._compileContent(content) : '';
    example = example ? this._compileExample(example) : '';
    section = heading + content + example;
    section = util$10.dom('.section').html(section);
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
    return `<h${lv} class="heading">${text.trim()}</h${lv}>`;
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
    pre = util$10.dom(html);
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
    return util$10.dom(this._compile());
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
    return window.scrollBy(0, top - Breeze.headHeight + 1);
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

var Article$1, Cover$1, Head$1, Main$1, Markdown$1, Nav$1, Page, Search$1, Side$1, Summary$1, util$11;

Markdown$1 = Markdown_1;

Head$1 = Head_1;

Side$1 = Side_1;

Main$1 = Main_1;

Nav$1 = Nav_1;

Cover$1 = Cover_1;

Summary$1 = Summary_1;

Article$1 = Article_1;

Search$1 = Search_1;

util$11 = util;

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
    ({nav, cover, summary, article} = markdown.parse());
    cover = new Cover$1(cover);
    nav = new Nav$1(nav);
    search = new Search$1();
    article = new Article$1(article);
    if (!summary) {
      summary = Summary$1.parse(sections = article.parse());
    }
    summary = new Summary$1(summary);
    return {cover, nav, search, summary, article};
  }

  _compile() {
    var article, cover, head, main, nav, page, search, side, summary;
    //#######################################
    //|
    //|   @return {string} html
    //|
    //#######################################
    ({cover, nav, search, summary, article} = this._parse());
    cover = cover.compile();
    nav = nav.compile();
    search = search.compile();
    summary = summary.compile();
    article = article.compile();
    head = new Head$1(nav);
    side = new Side$1(search, summary);
    main = new Main$1(article);
    head = head.compile();
    side = side.compile();
    main = main.compile();
    page = util$11.dom('#page');
    page.append(cover);
    page.append(head);
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
    return util$11.dom(this._compile());
  }

};

Page.layout = (page) => {
  var head, main, side;
  //#######################################
  //|
  //|   @params {DOM} page
  //|
  //#######################################
  head = page.find('#head');
  side = page.find('#side');
  main = page.find('#main');
  if (Breeze.isH5) {
    Page._moveNav(page);
  } else {
    Head$1.hideWhenNothing(head);
  }
  Breeze.headHeight = head.height();
  Side$1.setTop(side);
  return Main$1.setTop(main);
};

Page._moveNav = (page) => {
  var nav, ph;
  //#######################################
  //|
  //|   @params {DOM} page
  //|
  //#######################################
  nav = page.find('#nav');
  if (nav) {
    ph = page.find('#h5-nav-placeholder');
    return ph.replace(nav);
  }
};

var Article$2, Cover$2, PageEventBus, Search$2, Side$2, Summary$2;

Side$2 = Side_1;

Article$2 = Article_1;

Cover$2 = Cover_1;

Search$2 = Search_1;

Summary$2 = Summary_1;

var PageEventBus_1 = PageEventBus = class PageEventBus {
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
    this._bindEvents = this._bindEvents.bind(this);
    this._onLoadPage = this._onLoadPage.bind(this);
    this._onScrollArticle = this._onScrollArticle.bind(this);
    this._onClickMain = this._onClickMain.bind(this);
    this._onClickHamburger = this._onClickHamburger.bind(this);
    this._onClickCoverButton = this._onClickCoverButton.bind(this);
    this._onClickSummaryLink = this._onClickSummaryLink.bind(this);
    this._onClickLink = this._onClickLink.bind(this);
    this._onInputSearchInput = this._onInputSearchInput.bind(this);
    this._onClickSearchClear = this._onClickSearchClear.bind(this);
    this._onClickSearchItem = this._onClickSearchItem.bind(this);
    //#######################################
    //|
    //|   @params {DOM} page
    //|
    //#######################################
    this._page = page;
    this._head = this._page.find('#head');
    this._side = this._page.find('#side');
    this._main = this._page.find('#main');
    this._nav = this._page.find('#nav');
    this._cover = this._page.find('#cover');
    this._coverButtons = this._cover.findAll('.buttons a');
    this._hamburger = this._head.find('.hamburger');
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
    //#######################################
    //|
    //|   To bind all events of dom-tree.
    //|
    //#######################################
    this._onLoadPage();
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
    this._main.on('click', this._onClickMain);
    this._hamburger.on('click', this._onClickHamburger);
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

  _onLoadPage() {
    var id;
    //#######################################
    //|
    //|   When load the page,
    //|
    //|      1. active the summary
    //|      2. scroll the summary
    //|      3. scroll the article
    //|
    //#######################################
    id = Breeze.getQuery().id;
    if (id) {
      Summary$2.activeTo(this._summary, id);
      Summary$2.scrollTo(this._summary, id);
      return Article$2.scrollTo(this._article, id);
    }
  }

  _onScrollArticle() {
    var href, id;
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

  _onClickMain(main) {
    //#######################################
    //|
    //|   @params {DOM} main
    //|
    //|   When click the main ( when H5 ),
    //|      1. close side
    //|
    //#######################################
    if (Breeze.isH5) {
      return Side$2.close(this._side);
    }
  }

  _onClickHamburger(hamburger) {
    //#######################################
    //|
    //|   @params {DOM} hamburger
    //|
    //|   When click the head's hamburger ( when H5 ),
    //|      1. open side
    //|
    //#######################################
    if (Breeze.isH5) {
      return Side$2.open(this._side);
    }
  }

  _onClickCoverButton(button) {
    var href;
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

var App, Page$1, PageEventBus$1, util$12;

Page$1 = Page_1;

PageEventBus$1 = PageEventBus_1;

util$12 = util;

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
    //|      layoutPage -> bindEvents
    //|
    //#######################################
    page = document.querySelector('#page');
    page = util$12.dom(page);
    Page$1.layout(page);
    return new PageEventBus$1(page);
  }

  _runJIT() {
    //#######################################
    //|
    //|   when JIT,
    //|      loadPage -> renderPage -> mountPage -> layoutPage -> bindEvents
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
    var $new, $old;
    //#######################################
    //|
    //|   @params {DOM} page
    //|
    //#######################################
    $new = page.element();
    $old = document.querySelector('body > #page');
    if ($old) {
      document.body.replaceChild($new, $old);
    } else {
      document.body.appendChild($new);
    }
    Page$1.layout(page);
    return new PageEventBus$1(page);
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

var Breeze$1, ObservableObject$1,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$1 = ObservableObject_1;

var Breeze_1 = Breeze$1 = class Breeze extends ObservableObject$1 {
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
    boundMethodCheck(this, Breeze);
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

var App$1, Breeze$2, DOM$1, Loader$1, Router$1, isJIT, router, util$13;

util$13 = util;

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

Breeze$2.isH5 = util$13.isH5();

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
