var Breeze = (function () {
'use strict';

var DOM$1;

var DOM_web = DOM$1 = class DOM {
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

var ObservableObject;

var ObservableObject_1 = ObservableObject = class ObservableObject {
  constructor() {
    this.on = this.on.bind(this);
    this.emit = this.emit.bind(this);
    this.events = {};
  }

  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(callback);
    return this;
  }

  emit(name, ...params) {
    var callback, callbacks, i, len, ref;
    //#######################################
    //|
    //|  Trigger an event.
    //|
    //|  @params {string} event's name
    //|  @params {*...}   params...
    //|
    //|  @return {ObservableObject} this
    //|
    //#######################################
    callbacks = (ref = this.events[name]) != null ? ref : [];
    for (i = 0, len = callbacks.length; i < len; i++) {
      callback = callbacks[i];
      callback(...params);
    }
    return this;
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
  var path;
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
  if (typeof Breeze !== "undefined" && Breeze !== null ? Breeze.basePath : void 0) {
    path = Breeze.basePath + '/' + path;
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
      return new DOM(html);
    } else {
      return _domBySelector(selector = html);
    }
  } else {
    return new DOM($el = html);
  }
};

_domBySelector = (selector) => {
  var classname, dom, id, tag;
  ({tag, id, classname} = parseSelector(selector));
  dom = new DOM('<' + tag + '>');
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
var util_4 = util.dom;
var util_5 = util.element;

var ObservableObject$1, Router, util$1,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

util$1 = util;

ObservableObject$1 = ObservableObject_1;

var Router_1 = Router = class Router extends ObservableObject$1 {
  //#######################################
  ///
  ///   Be responsible for
  ///      managing the singleton router.
  ///
  //#######################################
  constructor(isJIT) {
    super();
    this._parse = this._parse.bind(this);
    this._parseFullPath = this._parseFullPath.bind(this);
    this._parsePath = this._parsePath.bind(this);
    this._parseQuery = this._parseQuery.bind(this);
    this._parseFilePath = this._parseFilePath.bind(this);
    this.go = this.go.bind(this);
    this._parseHref = this._parseHref.bind(this);
    this._redirect = this._redirect.bind(this);
    this._replace = this._replace.bind(this);
    this._push = this._push.bind(this);
    this._formatFullPath = this._formatFullPath.bind(this);
    this._formatPath = this._formatPath.bind(this);
    this._formatQuery = this._formatQuery.bind(this);
    this.isJIT = isJIT;
    this.fullPath = '';
    this.path = '';
    this.query = '';
    this.filePath = '';
    this._parse();
    window.addEventListener('popstate', () => {
      this._parse();
      return this.emit('redirect');
    });
  }

  _parse() {
    boundMethodCheck(this, Router);
    this.fullPath = this._parseFullPath();
    this.path = this._parsePath();
    this.query = this._parseQuery();
    if (this.isJIT) {
      return this.filePath = this._parseFilePath();
    }
  }

  _parseFullPath() {
    var path;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @return {string} path
    ///
    ///   when JIT,
    ///      host:port                        ->  /
    ///      host:port/#/                     ->  /
    ///      host:port/#/?id=xxx              ->  /?id=xxx
    ///      host:port/#/path/subPath?id=xxx  ->  /path/subPath?id=xxx
    ///
    ///   when no-JIT,
    ///      host:port                        ->  /
    ///      host:port?id=xxx                 ->  /?id=xxx
    ///      host:port/path/subPath?id=xxx    ->  /path/subPath?id=xxx
    ///
    //#######################################
    if (this.isJIT) {
      path = location.hash.slice(1);
    } else {
      path = location.pathname;
    }
    path = '/' + path;
    path = path.replace(/\/+/g, '/');
    return path;
  }

  _parsePath() {
    var path;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @return {string} path
    ///
    ///   when JIT,
    ///      host:port                        ->  /
    ///      host:port/#/                     ->  /
    ///      host:port/#/path/subPath?id=xxx  ->  /path/subPath
    ///
    ///   when no-JIT,
    ///      host:port                        ->  /
    ///      host:port/path/subPath?id=xxx    ->  /path/subPath
    ///
    //#######################################
    path = this._parseFullPath();
    path = path.replace(/\?.*$/, '');
    return path;
  }

  _parseQuery() {
    var field, fields, i, index, len, name, parts, path, query, ref, string, value;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @return {object} query
    ///
    ///   when JIT,
    ///      host:port/#/path/subPath         ->  {}
    ///      host:port/#/path/subPath?id=xxx  ->  { id: 'abc' }
    ///
    ///   when no-JIT,
    ///      host:port/#/path/subPath?id=xxx  ->  {}
    ///      host:port/path/subPath?id=xxx    ->  { id: 'abc' }
    ///
    //#######################################
    path = this._parseFullPath();
    index = path.indexOf('?');
    query = {};
    if (index > -1) {
      string = path.slice(index + 1);
      string = decodeURI(string);
      fields = string.split('&');
      for (i = 0, len = fields.length; i < len; i++) {
        field = fields[i];
        parts = field.split('=');
        name = parts[0];
        value = (ref = parts[1]) != null ? ref : true;
        query[name] = value;
      }
    }
    return query;
  }

  _parseFilePath() {
    var path;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @return {string} path
    ///
    ///
    ///   when JIT (only),
    ///      host:port/                 ->  basePath/README.md
    ///      host:port/#/               ->  basePath/README.md
    ///      host:port/#/path/subPath   ->  basePath/path/subPath.md
    ///      host:port/#/path/subPath/  ->  basePath/path/subPath/README.md
    ///
    //#######################################
    path = this._parsePath();
    path = util$1.filePath(path);
    if (path === '') {
      path = 'README';
    }
    if (path[path.length - 1] === '/') {
      path += 'README';
    }
    return path + '.md';
  }

  go(href = '') {
    var id, path, query;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @params {string} href - 'path#id'
    ///
    //#######################################
    ({path, id} = this._parseHref(href));
    if (id) {
      query = {id};
    } else {
      query = {};
    }
    return this._redirect(path, query);
  }

  _parseHref(href = '') {
    var id, parts, path;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @params {string} href - 'path#id'
    ///   @return {object}      - { path: 'path', id: 'id' }
    ///
    //#######################################
    parts = href.split('#');
    switch (parts.length) {
      case 1:
        path = parts[0];
        id = '';
        break;
      case 2:
        path = parts[0];
        id = parts[1];
        break;
      default:
        path = '';
        id = '';
    }
    return {path, id};
  }

  _redirect(path, query) {
    var fullPath, isSamePage;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @params {string} path
    ///   @params {object} query
    ///
    //#######################################
    fullPath = this._formatFullPath(path, query);
    if (this.isJIT) {
      isSamePage = this._formatPath(path) === this.path;
      if (isSamePage) {
        return this._replace(fullPath);
      } else {
        return this._push(fullPath);
      }
    } else {
      return location.href = fullPath;
    }
  }

  _replace(fullPath) {
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @params {string} fullPath
    ///
    //#######################################
    history.replaceState(null, null, fullPath);
    return this._parse();
  }

  _push(fullPath) {
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @params {string} fullPath
    ///
    //#######################################
    history.pushState(null, null, fullPath);
    this._parse();
    return this.emit('redirect');
  }

  _formatFullPath(path, query) {
    var fullPath;
    boundMethodCheck(this, Router);
    if (!path) {
      path = this.path;
    }
    fullPath = this._formatPath(path) + this._formatQuery(query);
    if (this.isJIT) {
      if (path === '/') {
        return fullPath;
      } else {
        return '/#' + fullPath;
      }
    }
    return fullPath;
  }

  _formatPath(path = '') {
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @params {string} path
    ///   @return {string} path
    ///
    //#######################################
    path = '/' + path;
    path = path.replace(/\/+/g, '/');
    return path;
  }

  _formatQuery(query = {}) {
    var name, parts, value;
    boundMethodCheck(this, Router);
    //#######################################
    ///
    ///   @params {object} query
    ///   @return {string} querystring
    ///
    //#######################################
    parts = [];
    for (name in query) {
      value = query[name];
      if (value === true) {
        parts.push(name);
      } else {
        parts.push(name + '=' + value);
      }
    }
    if (parts.length) {
      return '?' + parts.join('&');
    } else {
      return '';
    }
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
    this._hide = this._hide.bind(this);
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
    wrap = util$3.dom('.wrap');
    cover = util$3.dom('#cover');
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

  render() {
    var cover, html;
    //#######################################
    ///
    ///   @return {DOM} cover
    ///
    //#######################################
    html = this.compile();
    cover = util$3.dom(html);
    this._bindEvent(cover);
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
      results.push(button.on('click', this._hide.bind(this, cover)));
    }
    return results;
  }

  _hide(cover) {
    //#######################################
    ///
    ///   @params {DOM} cover
    ///   @params {MouseEvent} e
    ///
    //#######################################
    return cover.css('display', 'none');
  }

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
  constructor($raw) {
    this.render = this.render.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this._$raw = $raw;
  }

  render() {
    var $api, $item, $items, i, len;
    $api = util$5.element('.api');
    $items = this._$raw.querySelectorAll('item');
    for (i = 0, len = $items.length; i < len; i++) {
      $item = $items[i];
      $item = this.renderItem($item);
      $api.appendChild($item);
    }
    return $api;
  }

  renderItem($item) {
    var $desc, $left, $name, $right, $type;
    $name = $item.querySelector('name');
    $type = $item.querySelector('type');
    $desc = $item.querySelector('desc');
    $left = util$5.element('.left');
    $right = util$5.element('.right');
    if ($name) {
      $name = util$5.element('.name', $name.innerHTML);
      $left.appendChild($name);
    }
    if ($type) {
      $type = util$5.element('.type', $type.innerHTML);
      $left.appendChild($type);
    }
    if ($desc) {
      $desc = util$5.element('.desc', $desc.innerHTML);
      $right.appendChild($desc);
    }
    $item = util$5.element('.item');
    $item.appendChild($left);
    $item.appendChild($right);
    return $item;
  }

};

var Api$1, Article, Prism, marked$4;

marked$4 = marked;

Prism = prism;

Api$1 = Api;

marked$4.setOptions({
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
  constructor(markdown) {
    this.parse = this.parse.bind(this);
    this._parseSections = this._parseSections.bind(this);
    this._parseSection = this._parseSection.bind(this);
    this._checkLine = this._checkLine.bind(this);
    this._parseHeadings = this._parseHeadings.bind(this);
    this._parseHeading = this._parseHeading.bind(this);
    this._parseOrder = this._parseOrder.bind(this);
    this.compile = this.compile.bind(this);
    // markdown = @markdown

    // sections            = @parseSections(markdown)

    // @trimFirst(sections)

    // { html, sections } = @compileSections(sections)

    // @html     = html
    // @sections = sections
    // @cover    = cover
    this.parseSections = this.parseSections.bind(this);
    this.formatHeading = this.formatHeading.bind(this);
    this.trimFirst = this.trimFirst.bind(this);
    this.compileSections = this.compileSections.bind(this);
    this.compileSection = this.compileSection.bind(this);
    this.parseContentAndExample = this.parseContentAndExample.bind(this);
    this.parseExamples = this.parseExamples.bind(this);
    this.delExamples = this.delExamples.bind(this);
    this.parseHeading = this.parseHeading.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.createSummary = this.createSummary.bind(this);
    this.createSummaryItem = this.createSummaryItem.bind(this);
    this.getID = this.getID.bind(this);
    this.render = this.render.bind(this);
    this.wrapParams = this.wrapParams.bind(this);
    this.bindScrollEvent = this.bindScrollEvent.bind(this);
    this.getSectionStats = this.getSectionStats.bind(this);
    this.scroll = this.scroll.bind(this);
    this.markdown = markdown;
    this.html = '';
    this.lastOrder = '0';
    this.sections = [];
    this.$dom = null;
    this.$sections = [];
    this.cover = '';
    this.summary = '';
    this.lastID = '';
  }

  parse() {
    var sections;
    //#######################################
    ///
    ///   @return {object} - {object[]} sections
    ///
    //#######################################
    sections = this._parseSections(this.markdown);
    sections = this._parseHeadings(sections);
    return sections;
  }

  _parseSections(markdown) {
    var i, inCode, inExample, isCode, isExampleEnd, isExampleStart, j, len, line, lines, next, section, sectionLines, sections;
    //#######################################
    ///
    ///   @params {string}   markdown
    ///   @return {object[]} section - [{ heading, content, example }]
    ///
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
    ///
    ///   @params {string[]} sectionLines
    ///   @return {object}   section - {string} heading
    ///                                {string} content
    ///                                {string} example
    ///
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
    return {heading, content, example};
  }

  _checkLine(line) {
    var code, exampleEnd, exampleStart, heading, isCode, isEOF, isExampleEnd, isExampleStart, isHeading;
    //#######################################
    ///
    ///   @return {object} - {boolean} isExampleStart
    ///                      {boolean} isExampleEnd
    ///                      {boolean} isCode
    ///                      {boolean} isHeading
    ///                      {boolean} isEOF
    ///
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
///
///   @params {object[]} sections - [{ heading, content, example }]
///   @return {object[]} sections - [{ heading, content, example }]
///
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
    ///
    ///   @params {string} heading
    ///   @params {object} prev - {number} lv
    ///                           {string} text
    ///                           {string} order
    ///
    ///   @return {object} heading - {number} lv
    ///                              {string} text
    ///                              {string} order
    ///
    ///   Assume the prev.order is '1.2',
    ///      '#### Quick Start'  ->  { lv: 4, text: 'Quick Start', order: '1.2.0.1' }
    ///
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
    ///
    ///   @params {number} lv
    ///   @params {string} prevOrder
    ///   @return {string} order
    ///
    //#######################################
    if (prevOrder) {
      // Assume lv = 4, prevOrder = '1.2'
      order = prevOrder.split('.'); // order = ['1', '2']
      order = order.map((p) => {
        return parseInt(p); // order = [1, 2]
      });
      while (order.length < lv) { // order = [1, 2, 0, 0]
        order.push(0);
      }
      order[lv - 1] += 1; // order = [1, 2, 0, 1]
      order = order.join('.'); // order = '1.2.0.1'
      return order;
    } else {
      return '1';
    }
  }

  compile() {
    var renderer;
    //#######################################
    //|
    //|  Compile article-markdown to html.
    //|
    //#######################################
    renderer = new marked$4.Renderer();
    renderer.html = (html) => {
      return html;
    };
    return marked$4(this.markdown, {renderer});
  }

  parseSections(markdown) {
    var allLines, inCode, isCode, isHeading, j, len, line, lines, section, sections;
    //#######################################
    //|
    //|  @params {string}   markdown
    //|  @return {string[]} sections
    //|
    //|  Split each section from article.
    //|
    //#######################################
    sections = [];
    allLines = markdown.split('\n');
    lines = [];
    inCode = false;
    for (j = 0, len = allLines.length; j < len; j++) {
      line = allLines[j];
      isCode = /^\s*```/.test(line);
      isHeading = /^\s*#{1,6}/.test(line);
      if (isCode) {
        inCode = !inCode;
      }
      if (isHeading && !inCode) {
        section = lines.join('\n');
        sections.push(section);
        lines = [];
        line = this.formatHeading(line);
      }
      lines.push(line);
    }
    section = lines.join('\n');
    sections.push(section);
    return sections;
  }

  formatHeading(heading) {
    var lv, results, text;
    heading = heading.trim();
    results = heading.match(/^(#+)\s*(.*)$/);
    lv = results[1].length;
    text = results[2];
    return `<h${lv}>${text}</h${lv}>`;
  }

  trimFirst(sections) {
    //#######################################
    //|
    //|  @params {string[]} sections
    //|
    //|  Delete the first section if empty.
    //|
    //#######################################
    if (sections[0] != null) {
      if (sections[0].match(/^(?:\s|\n)*$/)) {
        return sections.shift();
      }
    }
  }

  compileSections(sections) {
    var html;
    //#######################################
    //|
    //|  @params {string[]} sections
    //|  @return {object} - { article, sections }
    //|
    //#######################################
    html = '';
    sections = sections.map((section) => {
      var content, example, heading;
      ({section, heading, content, example} = this.compileSection(section));
      html += section;
      return {heading, content, example};
    });
    html = html.trim();
    return {html, sections};
  }

  compileSection(section) {
    var content, example, heading, id, lv, order, ref, ref1, ref2, text;
    //######################################
    //|
    //|  @params {string} section-markdown
    //|
    //|  @return {object} - {string} section-html
    //|                     {string} content-html
    //|                     {string} example-html
    //|
    //#######################################
    ({content, example} = this.parseContentAndExample(section));
    heading = this.parseHeading(content);
    content = marked$4(content);
    example = marked$4(example);
    lv = (ref = heading != null ? heading.lv : void 0) != null ? ref : '';
    order = (ref1 = heading != null ? heading.order : void 0) != null ? ref1 : '';
    text = (ref2 = heading != null ? heading.text : void 0) != null ? ref2 : '';
    id = this.getID(order, text);
    section = `<section lv="${lv}" id="${id}">\n   <div class="content">${content}</div>\n   <div class="example">${example}</div>\n</section>`;
    return {section, heading, content, example};
  }

  parseContentAndExample(section) {
    var content, example, examples, indexes;
    //#######################################
    //|
    //|  @params {string} section-markdown
    //|
    //|  @return {string} content-markdown
    //|          {string} example-markdown
    //|
    //#######################################
    ({examples, indexes} = this.parseExamples(section));
    content = this.delExamples(section, indexes);
    example = examples.join('');
    return {content, example};
  }

  parseExamples(section) {
    var end, example, examples, index, indexes, isOpenTag, reg, result, stack, start;
    //#######################################
    //|
    //|  @params {string} section
    //|  @return {object} { examples, indexes }
    //|
    //#######################################
    stack = [];
    indexes = [];
    examples = [];
    reg = /(<example>)|(<\/example>)/g;
    while (result = reg.exec(section)) {
      index = result.index;
      isOpenTag = result[0] === '<example>';
      if (isOpenTag) {
        stack.push(index);
      } else {
        start = stack.pop();
        end = index + '</example>'.length;
        if (stack.length === 0) {
          example = section.slice(start, end);
          example = example.replace(/(<example>)|(<\/example>)/g, '');
          examples.push(example);
          indexes.push(start);
          indexes.push(end);
        }
      }
    }
    return {examples, indexes};
  }

  delExamples(section, indexes = []) {
    var end, rest, start;
    //#######################################
    //|
    //|  @params {string}   section
    //|  @params {number[]} indexes
    //|  @return {string}   section (rest)
    //|
    //|  Delete all examples from section.
    //|
    //|  123<example>456</example>789 => 123789
    //|
    //#######################################
    rest = '';
    indexes.unshift(-1);
    while (indexes.length > 1) {
      start = indexes.shift();
      end = indexes.shift();
      rest += section.slice(start + 1, end);
    }
    start = indexes.shift();
    rest += section.slice(start + 1);
    return rest;
  }

  parseHeading(content) {
    var lv, order, results, text;
    //#######################################
    //|
    //|  @params {string} content
    //|  @return {object} heading - { lv, text }
    //|
    //#######################################
    if (results = content.match(/^<h([1-6])>(.*)<\/h[1-6]>$/m)) {
      lv = parseInt(results[1]);
      order = this.getOrder(lv);
      text = results[2];
      return {lv, order, text};
    } else {
      return null;
    }
  }

  getOrder(lv) {
    var _, i, j, len, part, parts, ref;
    //#######################################
    //|
    //|  @params {number} lv
    //|  @return {string} order
    //|
    //#######################################
    parts = this.lastOrder.split('.');
    i = lv - 1;
    part = (ref = parts[i]) != null ? ref : '0';
    part = parseInt(part);
    part = part + 1;
    parts[i] = part;
    parts = parts.slice(0, i + 1);
    for (i = j = 0, len = parts.length; j < len; i = ++j) {
      _ = parts[i];
      if (!parts[i]) {
        parts[i] = '0';
      }
    }
    return this.lastOrder = parts.join('.');
  }

  createSummary(sections) {
    var heading, j, len, results1, section;
//#######################################
//|
//|  Create the article's summary by headings.
//|
//|  @params {object[]} sections
//|  @return {string}   summary-markdown
//|
//#######################################
    results1 = [];
    for (j = 0, len = sections.length; j < len; j++) {
      section = sections[j];
      ({heading} = section);
      if (heading && heading.lv <= 3) {
        results1.push(this.summary += this.createSummaryItem(heading));
      } else {
        results1.push(void 0);
      }
    }
    return results1;
  }

  createSummaryItem(heading) {
    var count, lv, order, space, text;
    //#######################################
    //|
    //|  @params {object} heading - { lv, text }
    //|  @return {string} markdown-item
    //|
    //|  { lv:2, text: 'Quick Start' }
    //|
    //|  => '  * [Quick Start](#Quick-Start)'
    //|
    //#######################################
    ({lv, order, text} = heading);
    count = lv;
    space = '';
    while (count > 1) {
      space += '  ';
      count--;
    }
    return `${space}* [${text}](#${this.getID(order, text)})\n`;
  }

  getID(order, text = '') {
    //#######################################
    //|
    //|  @params {string} order
    //|  @params {string} text
    //|  @return {string} id
    //|
    //#######################################
    text = text.replace(/\s+/g, '-');
    if (text) {
      return order + '-' + text;
    } else {
      return order;
    }
  }

  render() {
    this.$dom = document.createElement('article');
    this.$dom.innerHTML = this.html;
    this.wrapParams();
    return this.bindScrollEvent();
  }

  wrapParams() {
    var $api, $raw, $raws, api, j, len, results1;
    $raws = this.$dom.querySelectorAll('api');
    results1 = [];
    for (j = 0, len = $raws.length; j < len; j++) {
      $raw = $raws[j];
      api = new Api$1($raw);
      $api = api.render();
      results1.push($raw.parentNode.replaceChild($api, $raw));
    }
    return results1;
  }

  bindScrollEvent() {
    return window.addEventListener('scroll', () => {
      var i, id, isExisted, isVisible, j, len, stat, stats;
      isExisted = this.$dom.innerHTML !== '';
      isVisible = this.$dom.getBoundingClientRect().width > 0;
      if (isExisted && isVisible) {
        stats = this.getSectionStats();
        for (i = j = 0, len = stats.length; j < len; i = ++j) {
          stat = stats[i];
          if (stat.top > 0) {
            break;
          }
        }
        id = stats[i - 1].id;
        if (this.lastID !== id) {
          this.lastID = id;
          return this.emit('scroll', id);
        }
      }
    });
  }

  getSectionStats() {
    var $section, id, j, len, ref, stats, top;
    //#######################################
    //|
    //|  @params {object[]} sectionStats
    //|
    //#######################################
    stats = [];
    ref = this.$sections;
    for (j = 0, len = ref.length; j < len; j++) {
      $section = ref[j];
      id = $section.getAttribute('id');
      top = $section.getBoundingClientRect().top;
      stats.push({id, top});
    }
    return stats;
  }

  scroll(id) {
    var $section, top;
    $section = this.$dom.querySelector(`section[id="${id}"]`);
    if ($section) {
      top = $section.getBoundingClientRect().top;
      return window.scrollBy(0, top);
    } else {
      return window.scrollTo(0, 0);
    }
  }

};

var Article$1, Cover$1, Markdown$1, ObservableObject$3, Page, util$7,
  boundMethodCheck$2 = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$3 = ObservableObject_1;

Markdown$1 = Markdown_1;

Cover$1 = Cover_1;

Article$1 = Article_1;

util$7 = util;

var Page_1 = Page = class Page extends ObservableObject$3 {
  constructor(text, common = '') {
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

    // @cover.on('select', @rehash)

    // @summary.on('select', @rehash)
    // @summary.on('select', @summary.active)
    // @summary.on('select', @article.scroll)

    // @search.on('select',  @rehash)
    // @search.on('select',  @article.scroll)

    // @ready()
    // @render()

    // if @query.id
    //    @article.scroll(@query.id)
    //    @summary.scroll(@query.id)
    //    @summary.active(@query.id)
    this.parse = this.parse.bind(this);
    this.compile = this.compile.bind(this);
    this.render = this.render.bind(this);
    this._bindLinkEvent = this._bindLinkEvent.bind(this);
    this._redirect = this._redirect.bind(this);
    this.text = text + common;
  }

  parse() {
    var article, cover, markdown, nav, summary;
    boundMethodCheck$2(this, Page);
    //#######################################
    ///
    ///   @return {object} - {Nav}     nav
    ///                      {Cover}   cover
    ///                      {Summary} summary
    ///                      {Article} article
    ///
    //#######################################
    markdown = new Markdown$1(this.text);
    ({nav, cover, summary, article} = markdown.parse());
    cover = new Cover$1(cover);
    article = new Article$1(article);
    return {nav, cover, summary, article};
  }

  compile() {
    var article, cover, nav, page, summary;
    boundMethodCheck$2(this, Page);
    ({nav, cover, summary, article} = this.parse());
    page = util$7.dom('#page').append(cover.compile());
    return page.htmlSelf();
  }

  render(router) {
    var article, bus, cover, nav, page, summary;
    boundMethodCheck$2(this, Page);
    //#######################################
    ///
    ///   @params {Router} router
    ///
    //#######################################
    ({nav, cover, summary, article} = this.parse());
    bus = new ObservableObject$3;
    page = util$7.dom('#page').append(cover.render(bus));
    this._bindLinkEvent(router, page);
    return page;
  }

  _bindLinkEvent(router, page) {
    var i, len, link, links, results;
    boundMethodCheck$2(this, Page);
    //#######################################
    ///
    ///   @params {Router} router
    ///   @params {DOM}    page
    ///
    //#######################################
    links = page.findAll('a');
    results = [];
    for (i = 0, len = links.length; i < len; i++) {
      link = links[i];
      results.push(link.on('click', this._redirect.bind(this, router)));
    }
    return results;
  }

  _redirect(router, link) {
    var href;
    boundMethodCheck$2(this, Page);
    //#######################################
    ///
    ///   @params {Router}     router
    ///   @params {DOM}        link
    ///   @params {MouseEvent} e
    ///
    //#######################################
    href = link.attr('href');
    if (util$7.isUrl(href)) {
      return window.open(href, '_blank');
    } else {
      return router.go(href);
    }
  }

};

var App, Page$1, Router$1, util$8;

Router$1 = Router_1;

Page$1 = Page_1;

util$8 = util;

var App_1 = App = class App {
  //#######################################
  ///
  ///   Be responsible for
  ///      loading pages and save them to cache,
  ///      swapping them when route is changed.
  ///
  //#######################################
  constructor(isJIT) {
    this._run = this._run.bind(this);
    this._loadPage = this._loadPage.bind(this);
    this._renderPage = this._renderPage.bind(this);
    this._mount = this._mount.bind(this);
    //#######################################
    ///
    ///   @params {boolean} isJIT - is the Just In Time mode ?
    ///
    //#######################################
    this.isJIT = isJIT;
    this.pageCache = {};
    this.router = new Router$1(isJIT);
    this.router.on('redirect', this._loadPage);
    this._run();
  }

  _run() {
    if (this.isJIT) {
      return this._loadPage();
    } else {
      return util$8.dom(document.querySelector('#page'));
    }
  }

  _loadPage() {
    var page, path;
    //#######################################
    ///
    ///   Load current page.
    ///
    //#######################################
    path = this.router.filePath;
    page = this.pageCache[path];
    if (page) {
      return this._mount(page);
    } else {
      return util$8.ajax(path, this._renderPage);
    }
  }

  _renderPage(text) {
    var page, path;
    //#######################################
    ///
    ///   @params {string} text
    ///
    //#######################################
    path = this.router.filePath;
    page = new Page$1(text);
    page = page.render(this.router);
    this.pageCache[path] = page;
    return this._mount(page);
  }

  _mount(page) {
    var old;
    //#######################################
    ///
    ///   @params {DOM} page
    ///
    //#######################################
    old = document.querySelector('body > #page');
    if (old) {
      return document.body.replaceChild(page.$el, old);
    } else {
      return document.body.appendChild(page.$el);
    }
  }

};

var App$1, DOM$2;

DOM$2 = DOM_web;

App$1 = App_1;

window.DOM = DOM$2;

window.onload = () => {
  var isJIT;
  return new App$1(isJIT = true);
};

var src = {

};

return src;

}());
