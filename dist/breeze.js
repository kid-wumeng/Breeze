var Breeze = (function () {
'use strict';

var DOM;

var DOM_web = DOM = class DOM {
  //#######################################
  ///
  ///   Be responsible for querying and operating dom ( html-string ).
  ///   Adapted to the web environment ( browser-runtime ).
  ///
  //#######################################
  constructor(html) {
    this._getHTMLElement = this._getHTMLElement.bind(this);
    this.find = this.find.bind(this);
    this.findAll = this.findAll.bind(this);
    this.htmlSelf = this.htmlSelf.bind(this);
    this.html = this.html.bind(this);
    this.attr = this.attr.bind(this);
    this.text = this.text.bind(this);
    this.addClass = this.addClass.bind(this);
    this.hasClass = this.hasClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.append = this.append.bind(this);
    this.css = this.css.bind(this);
    this.width = this.width.bind(this);
    this.height = this.height.bind(this);
    this.top = this.top.bind(this);
    this.bottom = this.bottom.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.scroll = this.scroll.bind(this);
    this.on = this.on.bind(this);
    //#######################################
    ///
    ///   @params {string|HTMLElement} html|$el
    ///
    //#######################################
    if (typeof html === 'string') {
      this.root = this._getHTMLElement(html);
    } else {
      this.root = html;
    }
    this.$el = this.root; // only exists in DOM.web for better semantics.
  }

  _getHTMLElement(html) {
    var fragment;
    //#######################################
    ///
    ///   @params {string}      html
    ///   @return {HTMLElement} root
    ///
    //#######################################
    fragment = document.createElement('fragment');
    fragment.innerHTML = html;
    return fragment.childNodes[0];
  }

  find(selector) {
    var $el;
    //#######################################
    ///
    ///   @params {string} selector
    ///   @return {DOM}    dom - return null when not found.
    ///
    //#######################################
    $el = this.root.querySelector(selector);
    if ($el) {
      return new DOM($el);
    } else {
      return null;
    }
  }

  findAll(selector) {
    var $el, $els, dom, doms, i, len;
    //#######################################
    ///
    ///   @params {string} selector
    ///   @return {DOM[]}  doms - return [] when not found.
    ///
    //#######################################
    doms = [];
    $els = this.root.querySelectorAll(selector);
    for (i = 0, len = $els.length; i < len; i++) {
      $el = $els[i];
      dom = new DOM($el);
      doms.push(dom);
    }
    return doms;
  }

  htmlSelf(html) {
    //#######################################
    ///
    ///   SET   @params {string} html
    ///         @return {DOM}    this
    ///
    ///   GET   @return {string} html ( outer's )
    ///
    //#######################################
    if (html != null) {
      return new DOM(html);
    } else {
      return this.root.outerHTML;
    }
  }

  html(html) {
    //#######################################
    ///
    ///   SET   @params {string} html
    ///         @return {DOM}    this
    ///
    ///   GET   @return {string} html ( inner's )
    ///
    //#######################################
    if (html != null) {
      this.root.innerHTML = html;
      return this;
    } else {
      return this.root.innerHTML;
    }
  }

  attr(name, value) {
    //#######################################
    ///
    ///   SET   @params {string} name
    ///         @params {string} value
    ///         @return {DOM}    this
    ///
    ///   GET   @params {string} name
    ///         @return {string} value
    ///
    //#######################################
    if (value != null) {
      this.root.setAttribute(name, value);
      return this;
    } else {
      return this.root.getAttribute(name);
    }
  }

  text(text) {
    //#######################################
    ///
    ///   SET   @params {string} text
    ///         @return {DOM}    this
    ///
    ///   GET   @return {string} text
    ///
    //#######################################
    if (text != null) {
      this.root.innerText = text;
      return this;
    } else {
      return this.root.innerText;
    }
  }

  addClass(name) {
    //#######################################
    ///
    ///   @params {string} name
    ///   @return {DOM}    this
    ///
    //#######################################
    this.root.classList.add(name);
    return this;
  }

  hasClass(name) {
    //#######################################
    ///
    ///   @params {string} name
    ///   @return {boolean}
    ///
    //#######################################
    return this.root.classList.contains(name);
  }

  removeClass(name) {
    //#######################################
    ///
    ///   @params {string} name
    ///   @return {DOM}    this
    ///
    //#######################################
    this.root.classList.remove(name);
    return this;
  }

  append(child) {
    //#######################################
    ///
    ///   @params {DOM|string} child|html|selector
    ///   @return {DOM} this
    ///
    //#######################################
    if (child) {
      if (typeof child === 'string') {
        child = new DOM(child);
      }
      this.root.appendChild(child.root);
    }
    return this;
  }

  css(name, value) {
    //#######################################
    ///
    ///   @params {string} name
    ///   @params {value}  name
    ///   @return {DOM}    this
    ///
    ///   This method only exists in DOM.web
    ///
    //#######################################
    return this.root.style[name] = value;
  }

  width() {
    //#######################################
    ///
    ///   @return {number} width
    ///
    ///   This method only exists in DOM.web
    ///
    //#######################################
    return this.root.getBoundingClientRect().width;
  }

  height() {
    //#######################################
    ///
    ///   @return {number} height
    ///
    ///   This method only exists in DOM.web
    ///
    //#######################################
    return this.root.getBoundingClientRect().height;
  }

  top() {
    //#######################################
    ///
    ///   @return {number} top
    ///
    ///   This method only exists in DOM.web
    ///
    //#######################################
    return this.root.getBoundingClientRect().top;
  }

  bottom() {
    //#######################################
    ///
    ///   @return {number} top
    ///
    ///   This method only exists in DOM.web
    ///
    //#######################################
    return this.root.getBoundingClientRect().top;
  }

  isVisible() {
    //#######################################
    ///
    ///   @return {boolean}
    ///
    ///   This method only exists in DOM.web
    ///
    //#######################################
    return this.width() > 0;
  }

  scroll(deltaY) {
    //#######################################
    ///
    ///   @return {number} delta Y
    ///
    ///   This method only exists in DOM.web
    ///
    //#######################################
    return this.root.scrollBy(0, deltaY);
  }

  on(name, callback) {
    //#######################################
    ///
    ///   @params {string}   name
    ///   @params {function} callback
    ///
    ///   add an event listener to root,
    ///   this method only exists in DOM.web
    ///
    //#######################################
    return this.root.addEventListener(name, (e) => {
      var dom;
      dom = new DOM(e.target);
      callback(dom, e);
      return e.preventDefault();
    });
  }

};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {
var _domBySelector, _elementByHTML, _elementBySelector, parseSelector;

exports.isUrl = (href) => {
  //#######################################
  ///
  ///   @params {string} href
  ///   @return {boolean}
  ///
  //#######################################
  return /^(?:http)|(?:https)|(?:ftp):\/\//.test(href);
};

exports.filePath = (href = '') => {
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

exports.ajax = (path, done) => {
  var xhr;
  //#######################################
  ///
  ///   @params {string}   path
  ///   @params {function} done(text)
  ///
  //#######################################
  xhr = new XMLHttpRequest;
  xhr.open('GET', path, true);
  xhr.send(null);
  return xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        return done(xhr.responseText);
      }
    }
  };
};

exports.id = (order, text = '') => {
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

exports.dom = (html) => {
  var $el, selector;
  //#######################################
  ///
  ///   @params {string|HTMLElement} html|selector|$el
  ///   @return {DOM}
  ///
  ///   <html>  ->  DOM
  ///   sel#id  ->  DOM
  ///   $el#id  ->  DOM
  ///
  //#######################################
  if (typeof html === 'string') {
    if (html[0] === '<') {
      return new Breeze.DOM(html);
    } else {
      return _domBySelector(selector = html);
    }
  } else {
    return new Breeze.DOM($el = html);
  }
};

_domBySelector = (selector) => {
  var classname, dom, id, tag;
  ({tag, id, classname} = parseSelector(selector));
  dom = new Breeze.DOM('<' + tag + '>');
  if (id) {
    dom.attr('id', id);
  }
  if (classname) {
    dom.attr('class', classname);
  }
  return dom;
};

exports.element = (html) => {
  var selector;
  //#######################################
  ///
  ///   @params {string}      html|selector
  ///   @return {HTMLElement}
  ///
  ///   <html>  ->  $html
  ///   div#id  ->  $div#id
  ///
  //#######################################
  if (html[0] === '<') {
    return _elementByHTML(html);
  } else {
    return _elementBySelector(selector = html);
  }
};

_elementByHTML = (html) => {
  var fragment;
  fragment = document.createElement('fragment');
  fragment.innerHTML = html;
  return fragment.childNodes[0];
};

_elementBySelector = (selector) => {
  var $el, classname, id, tag;
  ({tag, id, classname} = parseSelector(selector));
  $el = document.createElement(tag);
  if (id) {
    $el.setAttribute('id', id);
  }
  if (classname) {
    $el.classList.add(classname);
  }
  return $el;
};

parseSelector = (selector = 'div') => {
  var classname, hasClass, hasID, id, parts, tag;
  //#######################################
  ///
  ///   @params {string} selector
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
  ///   This selector can't includes id and classname at the same time.
  ///   This selector can't includes classname more than two.
  ///
  //#######################################
  hasID = /#/.test(selector);
  hasClass = /\./.test(selector);
  tag = 'div';
  id = '';
  classname = '';
  parts = selector.split(/#|\./);
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
});
var util_1 = util.isUrl;
var util_2 = util.filePath;
var util_3 = util.ajax;
var util_4 = util.id;
var util_5 = util.dom;
var util_6 = util.element;

var Loader, util$1;

util$1 = util;

var Loader_web = Loader = class Loader {
  //#######################################
  ///
  ///   Be responsible for
  ///      loading the normal and common pages.
  ///
  //#######################################
  constructor() {
    this.load = this.load.bind(this);
    this._findOrReadCommon = this._findOrReadCommon.bind(this);
    this._readCommon = this._readCommon.bind(this);
    this._formatNormalPath = this._formatNormalPath.bind(this);
    this._formatCommonPaths = this._formatCommonPaths.bind(this);
    this._read = this._read.bind(this);
    this._commonCache = {};
  }

  load(path, done, fail) {
    var commonPaths, normalPath;
    //#######################################
    ///
    ///   @params {string}   path
    ///   @params {function} done( common + normal )
    ///   @params {function} fail()
    ///
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
    ///
    ///   @params {string[]} paths
    ///   @return {function} done( common )
    ///
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
    ///
    ///   @params {string}   path
    ///   @return {function} done( common )
    ///
    //#######################################
    common = this._commonCache[path];
    if (common === void 0) {
      return this._read(path, (common) => {
        return done(this._commonCache[path] = common);
      });
    } else {
      return done(common);
    }
  }

  _formatNormalPath(path) {
    //#######################################
    ///
    ///   @params {string} path
    ///   @return {string} path
    ///
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
    ///
    ///   @params {string}   path
    ///   @return {string[]} paths
    ///
    ///   basePath = '/docs'
    ///   path     = '/api/math'  =>  ['@.md', 'docs/@.md', 'docs/api/@.md']
    ///
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
    ///
    ///   @params {string}   path
    ///   @params {function} done( text ) - text = null if not found,
    ///                                     should check by text? ( a coffeescript syntactic sugar )
    ///
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

var Bus, ObservableObject$1;

ObservableObject$1 = ObservableObject_1;

var Bus_1 = Bus = class Bus extends ObservableObject$1 {
  //#######################################
  ///
  ///   This is a common event bus, one page need one bus.
  ///
  ///   summary.select( href )
  ///   article.scroll( href )
  ///
  //#######################################
  constructor() {
    super();
  }

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

var Jade;

var Jade_1 = Jade = class Jade {
  //#######################################
  ///
  ///   Be responsible for compiling the jade-like to html.
  ///   For example,
  ///
  ///   ul(start="1")  =>  <ul start="1">
  ///     li ...       =>    <li>...</li>
  ///                  =>  </ul>
  ///
  //#######################################
  constructor(text) {
    this.compile = this.compile.bind(this);
    this._parseNodes = this._parseNodes.bind(this);
    this._parseNode = this._parseNode.bind(this);
    this._parseDeep = this._parseDeep.bind(this);
    this._parseTag = this._parseTag.bind(this);
    this._parseAttr = this._parseAttr.bind(this);
    this._parseText = this._parseText.bind(this);
    this._parseTree = this._parseTree.bind(this);
    this._compile = this._compile.bind(this);
    //#######################################
    ///
    ///   @params {string} text
    ///
    //#######################################
    this.text = text;
  }

  compile() {
    var html, nodes, tree;
    //#######################################
    ///
    ///   @return {string} html
    ///
    //#######################################
    nodes = this._parseNodes(this.text);
    tree = this._parseTree(nodes);
    html = this._compile(tree);
    return html;
  }

  _parseNodes(text) {
    var lines, nodes;
    //#######################################
    ///
    ///   @params {string}   text
    ///   @return {object[]} nodes - [{ deep, tag, attr, text }]
    ///
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
    ///
    ///   @params {string} line
    ///   @return {object} {number} deep
    ///                    {string} tag
    ///                    {string} attr
    ///                    {string} text
    ///
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
    ///
    ///   @params {string} line
    ///   @return {object} {number} deep
    ///                    {string} rest
    ///
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
    ///
    ///   @params {string} rest
    ///   @return {object} {string} tag
    ///                    {string} rest
    ///
    ///   @errors when parse failed.
    ///
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
    ///
    ///   @params {string} rest
    ///   @return {object} {string} attr
    ///                    {string} rest
    ///
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
    ///
    ///   @params {string} rest
    ///   @return {object} {string} text
    ///                    {string} rest
    ///
    //#######################################
    text = rest.trim();
    rest = '';
    return {text, rest};
  }

  _parseTree(nodes) {
    var deep, i, len, node, root, tree;
    //#######################################
    ///
    ///   @params {object[]} nodes
    ///   @return {object}   tree
    ///
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
        node.parent = tree;
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

  _compile(node) {
    var attr, children, end, html, start, tag, text;
    //#######################################
    ///
    ///   @params {object} node - { tag, attr, text, children }
    ///   @return {string} html
    ///
    //#######################################
    ({tag, attr, text, children} = node);
    start = tag ? `<${tag} ${attr}>` : '';
    end = tag ? `</${tag}>` : '';
    if (children) {
      html = children.map(this._compile).join('');
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
  ///
  ///   Be responsible for
  ///      compiling text to markdown and parsing some components,
  ///      such as <nav>, <cover>, <summary> and so on.
  ///
  //#######################################
  constructor(text) {
    this.compile = this.compile.bind(this);
    this.parse = this.parse.bind(this);
    this._compileJadeByTag = this._compileJadeByTag.bind(this);
    this._compileJadeByAttribute = this._compileJadeByAttribute.bind(this);
    this._formatSelfClosingTag = this._formatSelfClosingTag.bind(this);
    this._parseNav = this._parseNav.bind(this);
    this._parseCover = this._parseCover.bind(this);
    this._parseSummary = this._parseSummary.bind(this);
    //#######################################
    ///
    ///   @params {string} text
    ///
    //#######################################
    this.text = text;
  }

  compile() {
    var markdown, text;
    //#######################################
    ///
    ///   @return {string} markdown
    ///
    //#######################################
    text = this._compileJadeByTag(this.text);
    text = this._compileJadeByAttribute(text);
    text = this._formatSelfClosingTag(text);
    return markdown = text;
  }

  parse() {
    var article, cover, markdown, nav, summary;
    //#######################################
    ///
    ///   @return {object} {string} nav     ( html )
    ///                    {string} cover   ( html )
    ///                    {string} summary ( html )
    ///                    {string} article ( markdown )
    ///
    //#######################################
    markdown = this.compile();
    ({nav, markdown} = this._parseNav(markdown));
    ({cover, markdown} = this._parseCover(markdown));
    ({summary, markdown} = this._parseSummary(markdown));
    article = markdown.trim();
    return {nav, cover, summary, article};
  }

  _compileJadeByTag(text) {
    var reg;
    //#######################################
    ///
    ///   @params {string} text
    ///   @return {string} text
    ///
    ///   Compile and replace the <jade>...</jade> to html.
    ///
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
    ///
    ///   @params {string} text
    ///   @return {string} text
    ///
    ///   Compile and replace the <tag jade>...</tag> to html.
    ///
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
    ///
    ///   @params {string} text
    ///   @return {string} text
    ///
    ///   Format and replace <tag/> to <tag></tag>
    ///
    //#######################################
    reg = /<([A-Za-z_-]+)((?:\s|\n)+(?:[^<]|\n)*?)?\/>/g;
    return text.replace(reg, (_, tag, attr = '') => {
      return `<${tag} ${attr}></${tag}>`;
    });
  }

  _parseNav(markdown) {
    var nav, navReg;
    //#######################################
    ///
    ///   @params {string} markdown
    ///   @return {object} {string} nav ( html )
    ///                    {string} markdown
    ///
    //#######################################
    nav = '';
    navReg = /<nav.*?>(?:.|\n)*?<\/nav>/g;
    markdown = markdown.replace(navReg, (match) => {
      nav = match;
      return '';
    });
    return {nav, markdown};
  }

  _parseCover(markdown) {
    var cover, coverReg;
    //#######################################
    ///
    ///   @params {string} markdown
    ///   @return {object} {string} cover ( html )
    ///                    {string} markdown
    ///
    //#######################################
    cover = '';
    coverReg = /<cover.*?>(?:.|\n)*?<\/cover>/g;
    markdown = markdown.replace(coverReg, (match) => {
      cover = match;
      return '';
    });
    return {cover, markdown};
  }

  _parseSummary(markdown) {
    var summary, summaryReg;
    //#######################################
    ///
    ///   @params {string} markdown
    ///   @return {object} {string} summary ( html )
    ///                    {string} markdown
    ///
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

var Cover, util$3;

util$3 = util;

var Cover_1 = Cover = class Cover {
  //#######################################
  ///
  ///   Be responsible for rendering cover's dom.
  ///
  //#######################################
  constructor(html) {
    this.exist = this.exist.bind(this);
    this.compile = this.compile.bind(this);
    this._compileLogo = this._compileLogo.bind(this);
    this._compileName = this._compileName.bind(this);
    this._compileDescs = this._compileDescs.bind(this);
    this._compileItems = this._compileItems.bind(this);
    this._compileButtons = this._compileButtons.bind(this);
    this.render = this.render.bind(this);
    this._bindEvent = this._bindEvent.bind(this);
    this._onClickButton = this._onClickButton.bind(this);
    //#######################################
    ///
    ///   @params {string} html
    ///
    //#######################################
    this.html = html;
  }

  exist() {
    return !!this.html;
  }

  compile() {
    var buttons, cover, descs, dom, items, logo, name, wrap;
    //#######################################
    ///
    ///   @return {string} html
    ///
    //#######################################
    dom = util$3.dom(this.html);
    cover = util$3.dom('#cover');
    wrap = util$3.dom('.wrap');
    logo = dom.find('cover > logo');
    name = dom.find('cover > name');
    descs = dom.findAll('cover > desc');
    items = dom.findAll('cover > item');
    buttons = dom.findAll('cover > button');
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
    ///
    ///   @params {DOM} logo
    ///   @return {DOM} logo
    ///
    //#######################################
    src = logo.attr('src');
    src = util$3.filePath(src);
    logo = util$3.dom('img.logo');
    logo.attr('src', src);
    return logo;
  }

  _compileName(name) {
    var ref, text, version;
    //#######################################
    ///
    ///   @params {DOM} name
    ///   @return {DOM} name
    ///
    //#######################################
    text = name.text();
    version = (ref = name.attr('version')) != null ? ref : '';
    name = util$3.dom('.name').text(text);
    version = util$3.dom('.version').text(version);
    name.append(version);
    return name;
  }

  _compileDescs(descs) {
    var desc, i, len, li, ul;
    //#######################################
    ///
    ///   @params {DOM[]} descs
    ///   @return {DOM}   ul.descs
    ///
    //#######################################
    ul = util$3.dom('ul.descs');
    for (i = 0, len = descs.length; i < len; i++) {
      desc = descs[i];
      li = util$3.dom('li').text(desc.text());
      ul.append(li);
    }
    return ul;
  }

  _compileItems(items) {
    var i, item, len, li, ul;
    //#######################################
    ///
    ///   @params {DOM[]} items
    ///   @return {DOM}   ul.items
    ///
    //#######################################
    ul = util$3.dom('ul.items');
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      li = util$3.dom('li').text(item.text());
      ul.append(li);
    }
    return ul;
  }

  _compileButtons(buttons) {
    var a, button, href, i, len, li, ref, text, ul;
    //#######################################
    ///
    ///   @params {DOM[]} buttons
    ///   @return {DOM}   ul.buttons
    ///
    //#######################################
    ul = util$3.dom('ul.buttons');
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      li = util$3.dom('li');
      a = util$3.dom('a');
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

  render(bus) {
    var cover;
    //#######################################
    ///
    ///   @params {Bus} bus
    ///   @return {DOM} cover
    ///
    //#######################################
    cover = util$3.dom(this.compile());
    return cover;
  }

  _bindEvent(cover) {
    var button, buttons, i, len, results;
    //#######################################
    ///
    ///   @params {DOM} cover
    ///
    //#######################################
    buttons = cover.findAll('.buttons li');
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      results.push(button.on('click', this._onClickButton.bind(this, cover)));
    }
    return results;
  }

  _onClickButton(cover, button) {
    //#######################################
    ///
    ///   @params {DOM} cover
    ///   @params {MouseEvent} e
    ///
    //#######################################
    return cover.css('display', 'none');
  }

};

var Summary, util$4;

util$4 = util;

var Summary_1 = Summary = class Summary {
  //#######################################
  ///
  ///   Be responsible for rendering summary's dom.
  ///
  //#######################################
  constructor(html) {
    this.exist = this.exist.bind(this);
    this.compile = this.compile.bind(this);
    this._compileItem = this._compileItem.bind(this);
    this._compileItemByLink = this._compileItemByLink.bind(this);
    this._compileItemByHint = this._compileItemByHint.bind(this);
    this.render = this.render.bind(this);
    this._bindEvent = this._bindEvent.bind(this);
    this._onClickItem = this._onClickItem.bind(this);
    this._onArticleScroll = this._onArticleScroll.bind(this);
    this._active = this._active.bind(this);
    this._scroll = this._scroll.bind(this);
    this.html = html;
  }

  exist() {
    return !!this.html;
  }

  compile() {
    var i, item, items, len, li, model, summary, ul;
    //#######################################
    ///
    ///   @params {string} html
    ///   @return {string} html
    ///
    //#######################################
    model = util$4.dom(this.html);
    summary = util$4.dom('#summary');
    ul = util$4.dom('ul');
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
    ///
    ///   @params {DOM} item
    ///   @return {DOM} li
    ///
    //#######################################
    name = item.find('name');
    href = item.attr('href');
    lv = item.attr('lv');
    if (href) {
      return this._compileItemByLink(name, href, lv);
    } else {
      return this._compileItemByHint(name, href, lv);
    }
  }

  _compileItemByLink(name, href, lv = '1') {
    var a, li;
    //#######################################
    ///
    ///   @params {DOM}    name
    ///   @params {string} href
    ///   @params {string} lv
    ///
    ///   @return {DOM}    li.lvX
    ///
    //#######################################
    li = util$4.dom('li').attr('href', href).addClass(`lv${lv}`);
    a = util$4.dom('a').attr('href', href);
    if (name) {
      a.text(name.text());
    }
    return li.append(a);
  }

  _compileItemByHint(name, href, lv = '1') {
    var li;
    //#######################################
    ///
    ///   @params {DOM}    name
    ///   @params {string} href
    ///   @params {string} lv
    ///
    ///   @return {DOM}    li.label.lvX
    ///
    //#######################################
    li = util$4.dom('li.hint').addClass(`lv${lv}`);
    if (name) {
      li.text(name.text());
    }
    return li;
  }

  render(bus) {
    var summary;
    //#######################################
    ///
    ///   @params {Bus} bus
    ///   @return {DOM} summary
    ///
    //#######################################
    summary = util$4.dom(this.compile());
    this._bindEvent(bus, summary);
    return summary;
  }

  _bindEvent(bus, summary) {
    var i, items, len, li;
    //#######################################
    ///
    ///   @params {DOM} summary
    ///
    //#######################################
    items = summary.findAll('li');
    for (i = 0, len = items.length; i < len; i++) {
      li = items[i];
      li.on('click', this._onClickItem.bind(this, bus, summary, li));
    }
    return bus.on('article.scroll', this._onArticleScroll.bind(this, summary));
  }

  _onClickItem(bus, summary, li) {
    var href;
    //#######################################
    ///
    ///   @params {Bus} bus
    ///   @params {DOM} summary
    ///   @params {DOM} li
    ///
    //#######################################
    this._active(summary, li);
    if (href = li.attr('href')) {
      return bus.emit('summary.select', href);
    }
  }

  _onArticleScroll(summary, href) {
    var li;
    //#######################################
    ///
    ///   @params {DOM}    summary
    ///   @params {string} href
    ///
    //#######################################
    li = summary.find(`li[href="${href}"]`);
    if (li) {
      this._active(summary, li);
      return this._scroll(summary, li);
    }
  }

  _active(summary, li) {
    var old;
    //#######################################
    ///
    ///   @params {DOM} summary
    ///   @params {DOM} li
    ///
    //#######################################
    if (li.find('a')) {
      if (old = summary.find('li.active')) {
        old.removeClass('active');
      }
      return li.addClass('active');
    }
  }

  _scroll(summary, li) {
    var bottom, side, top;
    //#######################################
    ///
    ///   @params {DOM} summary
    ///   @params {DOM} li
    ///
    //#######################################
    side = util$4.dom(document.querySelector('#side'));
    top = li.top();
    bottom = li.bottom();
    if (top + 200 > window.innerHeight) {
      return side.scroll(top + 200 - window.innerHeight);
    } else if (bottom < 200) {
      return side.scroll(bottom - 200);
    }
  }

};

Summary.parse = (sections) => {
  //#######################################
  ///
  ///   @params {object[]} sections - [{ heading, content, example }]
  ///   @return {string}   html
  ///
  //#######################################
  sections = sections.filter(Summary._filterSection);
  sections = sections.map(Summary._mapSection);
  return `<summary>${sections.join('')}</summary>`;
};

Summary._filterSection = (section) => {
  //#######################################
  ///
  ///   @params {object} section - {object} heading - { lv, text, order }
  ///                              {string} content
  ///                              {string} example
  ///
  ///   @return {boolean}
  ///
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
  ///
  ///   @params {object} section - {object} heading - { lv, text, order }
  ///                              {string} content
  ///                              {string} example
  ///
  ///   @return {string} html
  ///
  //#######################################
  ({lv, text, order} = section.heading);
  href = util$4.id(order, text);
  return `<item lv="${lv}" href="#${href}">\n   <name>${text}</name>\n</item>`;
};

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

var API, util$5;

util$5 = util;

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
    var api, dom, i, item, items, len;
    //#######################################
    //|
    //|   @params {string} html
    //|   @return {string} html
    //|
    //#######################################
    dom = util$5.dom(this.html);
    api = util$5.dom('.api');
    items = dom.findAll('item');
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
    left = util$5.dom('.left');
    right = util$5.dom('.right');
    if (name) {
      name = util$5.dom('.name').text(name.text());
      left.append(name);
    }
    if (type) {
      type = util$5.dom('.type').text(type.text());
      left.append(type);
    }
    if (desc) {
      desc = util$5.dom('.desc').text(desc.text());
      right.append(desc);
    }
    item = util$5.dom('.item').append(left).append(right);
    return item;
  }

};

var Api$1, Article, Prism, marked$3, util$6;

marked$3 = marked;

Prism = prism;

Api$1 = Api;

util$6 = util;

marked$3.setOptions({
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
  //|   Article.locateID( dom ) -> id
  //|   Article.scrollTo( dom, id )
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
    article = util$6.dom('#article');
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
    id = util$6.id(order, text);
    heading = heading ? this._compileHeading(heading) : '';
    content = content ? this._compileContent(content) : '';
    example = example ? this._compileExample(example) : '';
    section = heading + content + example;
    section = util$6.dom('.section').html(section);
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
    renderer = new marked$3.Renderer();
    renderer.html = this._compileHTML;
    content = marked$3(content, {renderer});
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
    renderer = new marked$3.Renderer();
    renderer.html = this._compileHTML;
    example = marked$3(example, {renderer});
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
    pre = util$6.dom(html);
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

  _render(bus) {
    //#######################################
    //|
    //|   @params {Bus} bus
    //|   @return {DOM} article
    //|
    //#######################################
    return util$6.dom(this._compile());
  }

};

// _onSummarySelect: ( article, href ) =>

//    ########################################
//    #/
//    #/   @params {DOM} article
//    #/   @params {string} href
//    #/
//    ########################################

//    section = article.find(".section[href=\"#{href}\"]")

//    if section
//       top = section.top()
//       window.scrollBy(0, top)
//    else
//       window.scrollTo(0, 0)
Article.locateID = (article) => {
  var i, j, len, ref, section, sections;
  //#######################################
  //|
  //|   @params {DOM} article
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
  return (ref = sections[i - 1].attr('id')) != null ? ref : '';
};

Article.scrollTo = (article, id) => {
  var section, top;
  //#######################################
  //|
  //|   @params {DOM} article
  //|   @params {string} id
  //|
  //#######################################
  section = article.find(`[id="${id}"]`);
  if (section) {
    top = section.top();
    return window.scrollBy(0, top);
  } else {
    return window.scrollTo(0, 0);
  }
};

var Article$1, Bus$1, Cover$1, Markdown$1, ObservableObject$3, Page, Summary$1, util$8,
  boundMethodCheck$1 = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$3 = ObservableObject_1;

Bus$1 = Bus_1;

Markdown$1 = Markdown_1;

Cover$1 = Cover_1;

Summary$1 = Summary_1;

Article$1 = Article_1;

util$8 = util;

var Page_1 = Page = class Page extends ObservableObject$3 {
  //#######################################
  ///
  ///   new Page( text )
  ///
  ///   parse()    ->  { article, nav, cover, summary }
  ///   compile()  ->  page ( html-string )
  ///   render()   ->  page ( DOM )
  ///
  ///   Page.bindEvent( page )
  ///
  //#######################################
  constructor(text) {
    super();
    // super()

    // @isOverMain = false

    // @$root = util.element('#root')
    // @$side = util.element('#side')
    // @$main = util.element('#main')

    // @navigator = new Navigator(navigator)
    // @article   = new Article(article)
    // @summary   = new Summary(@article.summary)
    // @search    = new Search(@article.$sections)

    // @article.on('scroll', ( id ) => if @isOverMain then @rehash( id ))
    // @article.on('scroll', ( id ) => if @isOverMain then @summary.scroll( id ))
    // @article.on('scroll', ( id ) => if @isOverMain then @summary.active( id ))

    // @search.on('select',  @rehash)
    // @search.on('select',  @article.scroll)

    // if @query.id
    //    @article.scroll(@query.id)
    //    @summary.scroll(@query.id)
    //    @summary.active(@query.id)
    this.parse = this.parse.bind(this);
    this.compile = this.compile.bind(this);
    this.render = this.render.bind(this);
    this.text = text;
  }

  parse() {
    var article, cover, markdown, nav, sections, summary;
    boundMethodCheck$1(this, Page);
    //#######################################
    ///
    ///   @return {object} - {Nav}     nav
    ///                      {Cover}   cover
    ///                      {Summary} summary
    ///                      {Article} article
    ///
    //#######################################
    markdown = new Markdown$1(this.text);
    ({article, nav, cover, summary} = markdown.parse());
    article = new Article$1(article);
    cover = new Cover$1(cover);
    if (!summary) {
      summary = Summary$1.parse(sections = article.parse());
    }
    summary = new Summary$1(summary);
    return {nav, cover, summary, article};
  }

  compile() {
    var article, cover, main, nav, page, side, summary;
    boundMethodCheck$1(this, Page);
    ({nav, cover, summary, article} = this.parse());
    page = util$8.dom('#page');
    side = util$8.dom('#side');
    main = util$8.dom('#main');
    if (cover.exist()) {
      page.append(cover.compile());
    }
    side.append(summary.compile());
    main.append(article.compile());
    page.append(side);
    page.append(main);
    return page.htmlSelf();
  }

  render() {
    var article, bus, cover, main, nav, page, side, summary;
    boundMethodCheck$1(this, Page);
    //#######################################
    ///
    ///   @return {DOM} page
    ///
    //#######################################
    ({nav, cover, summary, article} = this.parse());
    bus = new Bus$1;
    page = util$8.dom('#page');
    side = util$8.dom('#side');
    main = util$8.dom('#main');
    if (cover.exist()) {
      page.append(cover.render(bus));
    }
    side.append(summary.render(bus));
    main.append(article.render(bus));
    page.append(side);
    page.append(main);
    return page;
  }

};

Page.bindEvent = (page) => {
  var article, bus, i, len, link, links;
  //#######################################
  ///
  ///   @params {DOM} page
  ///
  //#######################################
  links = page.findAll('a');
  for (i = 0, len = links.length; i < len; i++) {
    link = links[i];
    link.on('click', Page._event_linkClick);
  }
  bus = new Bus$1();
  bus.on('article.scroll', Page._event_articleScroll);
  article = page.find('#article');
  Article$1.bindEvent(bus, article);
  return window.addEventListener('scroll', Page._onWindowScroll);
};

Page._onWindowScroll = (e) => {
  //#######################################
  ///
  ///   @params {Event} e
  ///
  //#######################################
  return console.log(e);
};

Page._event_linkClick = (link) => {
  var href;
  //#######################################
  ///
  ///   @params {DOM} link
  ///
  //#######################################
  href = link.attr('href');
  return Breeze.go(href);
};

Page._event_articleScroll = (href) => {
  //#######################################
  ///
  ///   @params {string} href
  ///
  //#######################################
  return Breeze.go(href);
};

var Article$2, ObservableObject$4, PageEventBus,
  boundMethodCheck$2 = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$4 = ObservableObject_1;

Article$2 = Article_1;

var PageEventBus_1 = PageEventBus = class PageEventBus extends ObservableObject$4 {
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
    this._onClickLink = this._onClickLink.bind(this);
    this._onClickSummaryLink = this._onClickSummaryLink.bind(this);
    this._page = page;
    this._main = page.find('#main');
    this._side = page.find('#side');
    this._nav = page.find('#nav');
    this._cover = page.find('#cover');
    this._summary = page.find('#summary');
    this._article = page.find('#article');
    this._links = page.findAll('a');
    this._summaryLinks = this._summary.findAll('a');
    this._overSide = false;
    this._overMain = false;
    this._bindEvents();
  }

  _bindEvents() {
    var i, j, len, len1, link, ref, ref1, results;
    boundMethodCheck$2(this, PageEventBus);
    //#######################################
    //|
    //|   To bind all events of dom-tree.
    //|
    //#######################################
    window.addEventListener('scroll', this._onScrollArticle);
    this._side.on('mouseenter', () => {
      return this._overSide = true;
    });
    this._main.on('mouseenter', () => {
      return this._overMain = true;
    });
    this._side.on('mouseleave', () => {
      return this._overSide = false;
    });
    this._main.on('mouseleave', () => {
      return this._overMain = false;
    });
    ref = this._links;
    for (i = 0, len = ref.length; i < len; i++) {
      link = ref[i];
      link.on('click', this._onClickLink);
    }
    ref1 = this._summaryLinks;
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      link = ref1[j];
      results.push(link.on('click', this._onClickSummaryLink));
    }
    return results;
  }

  _onScrollArticle() {
    var href, id;
    boundMethodCheck$2(this, PageEventBus);
    //#######################################
    //|
    //|   When scroll the article,
    //|      1. redirect #id
    //|
    //#######################################
    if (this._article.isVisible()) {
      id = Article$2.locateID(this._article);
      href = '#' + id;
      return Breeze.go(href);
    }
  }

  _onClickLink(link) {
    var href;
    boundMethodCheck$2(this, PageEventBus);
    //#######################################
    //|
    //|   When click any link,
    //|      1. redirect path#id | open url
    //|
    //#######################################
    if (href = link.attr('href')) {
      return Breeze.go(href);
    }
  }

  _onClickSummaryLink(link) {
    var href, id;
    boundMethodCheck$2(this, PageEventBus);
    //#######################################
    //|
    //|   When click the summary's link,
    //|      1. scroll the article
    //|
    //#######################################
    href = link.attr('href');
    if (href && Breeze.isCurrentPath(href)) {
      id = Breeze.resolveID(href);
      return Article$2.scrollTo(this._article, id);
    }
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
    new PageEventBus$1(page);
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
      return document.body.replaceChild(page.root, currentPage);
    } else {
      return document.body.appendChild(page.root);
    }
  }

};

var Breeze$1, ObservableObject$5,
  boundMethodCheck$3 = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$5 = ObservableObject_1;

var Breeze_1 = Breeze$1 = class Breeze extends ObservableObject$5 {
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
    this.config = this.config.bind(this);
    this._options = {};
    this.config('basePath', '');
    this.config('common.use', false);
    this.config('common.map', {});
    this.config('summary.showLevel', 3);
    this.config('summary.showOrderLevel', 0);
    this.config('article.showOrderLevel', 0);
  }

  config(name, value) {
    boundMethodCheck$3(this, Breeze);
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

window.onload = () => {
  return window.app = new App$1(isJIT = true);
};

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
