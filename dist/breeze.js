var Breeze = (function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {
exports.isUrl = (href) => {
  return /^(?:http)|(?:https)|(?:ftp):\/\//.test(href);
};

exports.formatPath = (path = '') => {
  if (!exports.isUrl(path)) {
    if (typeof Breeze !== "undefined" && Breeze !== null ? Breeze.base : void 0) {
      path = Breeze.base + '/' + path;
    }
    if (path) {
      path = path.replace(/\/{2,}/g, '/');
    }
    if (path[0] === '/') {
      path = path.slice(1);
    }
  }
  return path;
};

exports.ajax = (path, done) => {
  var xhr;
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

exports.element = (name = 'div', innerHTML = '') => {
  var $el, classname, hasClass, hasID, id, parts, tag;
  hasID = /#/.test(name);
  hasClass = /\./.test(name);
  tag = 'div';
  id = '';
  classname = '';
  parts = name.split(/#|\./);
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
  $el = document.createElement(tag);
  if (id) {
    $el.id = id;
  }
  if (classname) {
    $el.classList.add(classname);
  }
  if (innerHTML) {
    $el.innerHTML = innerHTML;
  }
  return $el;
};

exports.createElement = (name = 'div', innerHTML = '') => {
  var $el, classname, hasClass, hasID, id, parts, tag;
  hasID = /#/.test(name);
  hasClass = /\./.test(name);
  tag = 'div';
  id = '';
  classname = '';
  parts = name.split(/#|\./);
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
  $el = document.createElement(tag);
  if (id) {
    $el.id = id;
  }
  if (classname) {
    $el.classList.add(classname);
  }
  if (innerHTML) {
    $el.innerHTML = innerHTML;
  }
  return $el;
};

exports.parseSelector = (sel = 'div') => {
  var classname, hasClass, hasID, id, parts, tag;
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
  ///   This selector can't includes id and classname at the same time.
  ///   This selector can't includes classname more than two.
  ///
  //#######################################
  hasID = /#/.test(sel);
  hasClass = /\./.test(sel);
  tag = '';
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

exports.dom = (html) => {
  var classname, dom, id, sel, tag;
  //#######################################
  ///
  ///   @params {string} html | selector
  ///   @return {DOM}    dom
  ///
  ///   Wrap a dom if argument is html.
  ///   Create a dom if argument is selector.
  ///
  //#######################################
  if (html[0] === '<') {
    return new DOM(html);
  } else {
    ({tag, id, classname} = exports.parseSelector(sel = html));
    dom = new DOM('<' + tag + '>');
    if (id) {
      dom.attr('id', id);
    }
    if (classname) {
      dom.attr('class', classname);
    }
    return dom;
  }
};
});
var util_1 = util.isUrl;
var util_2 = util.formatPath;
var util_3 = util.ajax;
var util_4 = util.element;
var util_5 = util.createElement;
var util_6 = util.parseSelector;
var util_7 = util.dom;

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
  ///   Be responsible for compiling text to markdown
  ///   and parsing some components, such as <nav>, <cover>, <summary> and so on.
  ///
  //#######################################
  constructor(text) {
    this.compile = this.compile.bind(this);
    this.parse = this.parse.bind(this);
    this._compileJadeByTag = this._compileJadeByTag.bind(this);
    this._compileJadeByAttribute = this._compileJadeByAttribute.bind(this);
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

var Cover, util$2;

util$2 = util;

var Cover_1 = Cover = class Cover {
  //#######################################
  ///
  ///   Be responsible for rendering cover's dom.
  ///
  //#######################################
  constructor(html) {
    this.render = this.render.bind(this);
    this._renderLogo = this._renderLogo.bind(this);
    this._renderName = this._renderName.bind(this);
    this._renderDescs = this._renderDescs.bind(this);
    this._renderDesc = this._renderDesc.bind(this);
    this._renderItems = this._renderItems.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._renderButtons = this._renderButtons.bind(this);
    this._renderButton = this._renderButton.bind(this);
    this._onClickButton = this._onClickButton.bind(this);
    //#######################################
    ///
    ///   @params {string} html
    ///
    //#######################################
    this.html = html;
  }

  render() {
    var $buttons, $cover, $descs, $items, $logo, $model, $name, $wrap;
    $model = util$2.createElement('model', this.html);
    $cover = util$2.createElement('#cover');
    $wrap = util$2.createElement('.wrap');
    $logo = $model.querySelector('logo');
    $name = $model.querySelector('name');
    $descs = $model.querySelectorAll('desc');
    $items = $model.querySelectorAll('item');
    $buttons = $model.querySelectorAll('button');
    $logo = this._renderLogo($logo);
    $name = this._renderName($name);
    $descs = this._renderDescs($descs);
    $items = this._renderItems($items);
    $buttons = this._renderButtons($buttons);
    if ($logo) {
      $wrap.appendChild($logo);
    }
    if ($name) {
      $wrap.appendChild($name);
    }
    if ($descs) {
      $wrap.appendChild($descs);
    }
    if ($items) {
      $wrap.appendChild($items);
    }
    if ($buttons) {
      $wrap.appendChild($buttons);
    }
    $cover.appendChild($wrap);
    return $cover;
  }

  _renderLogo($logo) {
    var src;
    //#######################################
    ///
    ///   @params {HTMLElement} $logo
    ///   @return {HTMLElement} $logo
    ///
    //#######################################
    if ($logo) {
      src = $logo.getAttribute('src');
      src = util$2.formatPath(src);
      $logo = util$2.createElement('img.logo');
      $logo.setAttribute('src', src);
    }
    return $logo;
  }

  _renderName($name) {
    var $version, name, ref, version;
    //#######################################
    ///
    ///   @params {HTMLElement} $name
    ///   @return {HTMLElement} $name
    ///
    //#######################################
    if ($name) {
      name = $name.innerText;
      version = (ref = $name.getAttribute('version')) != null ? ref : '';
      $name = util$2.createElement('.name', name);
      $version = util$2.createElement('.version', version);
      $name.appendChild($version);
    }
    return $name;
  }

  _renderDescs($descs) {
    var $desc, $li, $ul, i, len;
    //#######################################
    ///
    ///   @params {NodeList}    $descs
    ///   @return {HTMLElement} $descs
    ///
    //#######################################
    if ($descs.length) {
      $ul = util$2.createElement('ul.descs');
      for (i = 0, len = $descs.length; i < len; i++) {
        $desc = $descs[i];
        $li = this._renderDesc($desc);
        $ul.appendChild($li);
      }
      return $ul;
    } else {
      return null;
    }
  }

  _renderDesc($desc) {
    //#######################################
    ///
    ///   @params {HTMLElement} $desc
    ///   @return {HTMLElement} $desc
    ///
    //#######################################
    return util$2.createElement('li', $desc.innerText);
  }

  _renderItems($items) {
    var $item, $li, $ul, i, len;
    //#######################################
    ///
    ///   @params {NodeList}    $items
    ///   @return {HTMLElement} $items
    ///
    //#######################################
    if ($items.length) {
      $ul = util$2.createElement('ul.items');
      for (i = 0, len = $items.length; i < len; i++) {
        $item = $items[i];
        $li = this._renderItem($item);
        $ul.appendChild($li);
      }
      return $ul;
    } else {
      return null;
    }
  }

  _renderItem($item) {
    //#######################################
    ///
    ///   @params {HTMLElement} $item
    ///   @return {HTMLElement} $item
    ///
    //#######################################
    return util$2.createElement('li', $item.innerText);
  }

  _renderButtons($buttons) {
    var $button, $li, $ul, i, len;
    //#######################################
    ///
    ///   @params {NodeList}    $buttons
    ///   @return {HTMLElement} $buttons
    ///
    //#######################################
    if ($buttons.length) {
      $ul = util$2.createElement('ul.buttons');
      for (i = 0, len = $buttons.length; i < len; i++) {
        $button = $buttons[i];
        $li = this._renderButton($button);
        $ul.appendChild($li);
      }
      return $ul;
    } else {
      return null;
    }
  }

  _renderButton($button) {
    var $a, $li, href;
    //#######################################
    ///
    ///   @params {HTMLElement} $button
    ///   @return {HTMLElement} $button
    ///
    //#######################################
    $li = util$2.createElement('li');
    $a = util$2.createElement('a', $button.innerText);
    if ($button.hasAttribute('active')) {
      $li.classList.add('active');
      $a.classList.add('active');
    }
    if (href = $button.getAttribute('href')) {
      $a.setAttribute('href', href);
    }
    $li.appendChild($a);
    return $li;
  }

  _onClickButton(e) {
    var href;
    href = e.target.getAttribute('href');
    if (href[0] === '#') {
      return this.$dom.style.display = 'none';
    }
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

var Prism, marked$4;

marked$4 = marked;

Prism = prism;

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

var Cover$1, Markdown$1, ObservableObject$2, Page, util$6,
  boundMethodCheck$1 = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

ObservableObject$2 = ObservableObject_1;

Markdown$1 = Markdown_1;

Cover$1 = Cover_1;

util$6 = util;

var Page_1 = Page = class Page extends ObservableObject$2 {
  constructor(navigator) {
    super();
    // @render(cover)

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
    this.getPath = this.getPath.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.getFilePath = this.getFilePath.bind(this);
    this.ready = this.ready.bind(this);
    // @$main.appendChild( @article.$dom )
    // @$side.appendChild( @search.$dom )
    // @$side.appendChild( @summary.$dom )

    // @$root.appendChild(@navigator.render()) if @navigator.exist()
    // @$root.appendChild( @cover.$dom ) if @cover.html and !@query.id
    // @$root.appendChild( @$side )
    // @$root.appendChild( @$main )

    // @$main.addEventListener('mouseenter', => @isOverMain = true)
    // @$main.addEventListener('mouseleave', => @isOverMain = false)

    // @$main.style.minHeight = window.innerHeight + 'px'

    // @bindLinkEvent(@$root)
    this.render = this.render.bind(this);
    this.rehash = this.rehash.bind(this);
    this.formatPath = this.formatPath.bind(this);
    this.bindLinkEvent = this.bindLinkEvent.bind(this);
    this.onClickUrl = this.onClickUrl.bind(this);
    this.onClickPageInner = this.onClickPageInner.bind(this);
    this.onClickPageOuter = this.onClickPageOuter.bind(this);
    this.isOverMain = false;
    this.$root = util$6.element('#root');
    this.$side = util$6.element('#side');
    this.$main = util$6.element('#main');
    this.path = this.getPath();
    this.query = this.getQuery();
    this.filePath = this.getFilePath();
    util$6.ajax(this.filePath, (text) => {
      var article, cover, markdown, nav, summary;
      markdown = new Markdown$1(text);
      ({nav, cover, summary, article} = markdown.parse());
      cover = new Cover$1(cover);
      return cover.format();
    });
  }

  getPath() {
    var hash, path;
    boundMethodCheck$1(this, Page);
    //#######################################
    //|
    //|  @return {string} path
    //|
    //|  localhost:8080/#/api?id=abc  =>  /api
    //|
    //#######################################
    hash = location.hash;
    if (hash) {
      path = hash.slice(1);
      path = path.replace(/\?.*$/, '');
    } else {
      path = '/';
    }
    return path;
  }

  getQuery() {
    var array, hash, i, index, item, len, name, query, ref, string, value;
    boundMethodCheck$1(this, Page);
    //#######################################
    //|
    //|  @return {string} path
    //|
    //|  localhost:8080/#/api?id=abc  =>  { id: 'abc' }
    //|
    //#######################################
    query = {};
    hash = decodeURI(location.hash);
    index = hash.indexOf('?');
    if (index > -1) {
      string = hash.slice(index + 1);
      array = string.split('&');
      for (i = 0, len = array.length; i < len; i++) {
        item = array[i];
        item = item.split('=');
        name = item[0];
        value = (ref = item[1]) != null ? ref : true;
        query[name] = value;
      }
    }
    return query;
  }

  getFilePath() {
    var path;
    boundMethodCheck$1(this, Page);
    //#######################################
    //|
    //|  @return {string} path
    //|
    //|  localhost:8080/#/api?id=abc   =>  api.md
    //|  localhost:8080/#/api/?id=abc  =>  api/README.md
    //|
    //#######################################
    path = this.getPath();
    if (path) {
      path = path.slice(1); // remove '#'
    }
    path = util$6.formatPath(path);
    if (path === '') {
      path = 'README';
    }
    if (path[path.length - 1] === '/') {
      path += 'README';
    }
    return path + '.md';
  }

  ready() {
    boundMethodCheck$1(this, Page);
  }

  render(cover) {
    var $root, $rootCurrent;
    boundMethodCheck$1(this, Page);
    $root = util$6.createElement('#root');
    $root.appendChild(cover.render());
    $rootCurrent = document.querySelector('body > #root');
    if ($rootCurrent) {
      return document.body.replaceChild($root, $rootCurrent);
    } else {
      return document.body.appendChild($root);
    }
  }

  rehash(id) {
    boundMethodCheck$1(this, Page);
    //#######################################
    //|
    //|  @params {string} id
    //|
    //#######################################
    if (id) {
      return history.replaceState(null, null, this.formatPath({id}));
    } else {
      return history.replaceState(null, null, this.formatPath());
    }
  }

  formatPath(newQuery = {}) {
    var array, name, path, query, value;
    boundMethodCheck$1(this, Page);
    //#######################################
    //|
    //|  @params {object} newQuery
    //|  @return {string} path
    //|
    //#######################################
    query = Object.assign({}, query, newQuery);
    array = [];
    for (name in query) {
      value = query[name];
      if (value) {
        array.push(name + '=' + value);
      } else {
        array.push(name);
      }
    }
    if (array.length) {
      path = this.path + '?' + array.join('&');
    } else {
      path = this.path;
    }
    if (location.hash) {
      path = '/#' + path;
    }
    return path;
  }

  bindLinkEvent($root) {
    var $link, $links, href, i, isUrl, len, results;
    boundMethodCheck$1(this, Page);
    $links = $root.querySelectorAll('a');
    results = [];
    for (i = 0, len = $links.length; i < len; i++) {
      $link = $links[i];
      href = $link.getAttribute('href');
      isUrl = /^(?:http)|(?:https)|(?:ftp):\/\//.test(href);
      if (isUrl) {
        results.push($link.addEventListener('click', this.onClickUrl));
      } else if (href[0] === '#') {
        results.push($link.addEventListener('click', this.onClickPageInner));
      } else {
        results.push($link.addEventListener('click', this.onClickPageOuter));
      }
    }
    return results;
  }

  onClickUrl(e) {
    boundMethodCheck$1(this, Page);
    window.open(e.target.getAttribute('href'));
    return e.preventDefault();
  }

  onClickPageInner(e) {
    var id;
    boundMethodCheck$1(this, Page);
    id = e.target.getAttribute('href').slice(1);
    this.rehash(id);
    return e.preventDefault();
  }

  onClickPageOuter(e) {
    boundMethodCheck$1(this, Page);
    this.emit('reload', e.target.getAttribute('href'));
    return e.preventDefault();
  }

};

var DOM$1;

var DOM_web = DOM$1 = class DOM {
  //#######################################
  ///
  ///   Be responsible for querying and operating dom ( html-string ).
  ///   Adapted to the web environment ( browser-runtime ).
  ///
  //#######################################
  constructor(html) {
    this._getRoot = this._getRoot.bind(this);
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
    //#######################################
    ///
    ///   @params {string} html
    ///
    //#######################################
    this.root = this._getRoot(html);
  }

  _getRoot(html) {
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

  find(sel) {
    var el, fragment, html;
    //#######################################
    ///
    ///   @params {string} sel
    ///   @return {DOM}    dom - return null when not found.
    ///
    //#######################################
    el = this.root.querySelector(sel);
    if (el) {
      el = el.cloneNode(true);
      fragment = document.createElement('fragment');
      fragment.appendChild(el);
      html = fragment.innerHTML;
      return new DOM(html);
    } else {
      return null;
    }
  }

  findAll(sel) {
    var doms, el, els, fragment, html, i, len;
    //#######################################
    ///
    ///   @params {string} sel
    ///   @return {DOM[]}  doms - return [] when not found.
    ///
    //#######################################
    doms = [];
    els = this.root.querySelectorAll(sel);
    for (i = 0, len = els.length; i < len; i++) {
      el = els[i];
      el = el.cloneNode(true);
      fragment = document.createElement('fragment');
      fragment.appendChild(el);
      html = fragment.innerHTML;
      doms.push(new DOM(html));
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
    if (html) {
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
    if (html) {
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
    if (value) {
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
    if (text) {
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
    ///   @params {DOM} child
    ///   @return {DOM} this
    ///
    //#######################################
    this.root.appendChild(child.root.cloneNode(true));
    return this;
  }

};

var DOM$2, Page$1, load, loadNavigator, loadPage, navigator, pages, util$7;

util$7 = util;

Page$1 = Page_1;

DOM$2 = DOM_web;

window.DOM = DOM$2;

navigator = '';

pages = {};

load = () => {
  return loadNavigator(() => {
    return loadPage();
  });
};

loadNavigator = (callback) => {
  var path;
  if (typeof Breeze !== "undefined" && Breeze !== null ? Breeze.navigator : void 0) {
    if (Breeze.navigator === true) {
      path = 'NAVIGATOR.md';
    } else {
      path = Breeze.navigator;
    }
    path = util$7.formatPath(path);
    return util$7.ajax(path, (markdown) => {
      navigator = markdown;
      return callback();
    });
  } else {
    return callback();
  }
};

loadPage = () => {
  var href, page;
  href = location.href;
  if (pages[href]) {
    page = pages[href];
    return page.render();
  } else {
    page = new Page$1(navigator);
    pages[href] = page;
    return page.on('reload', (hash) => {
      hash = '#/' + hash;
      hash = hash.replace(/\/+/, '/');
      history.pushState(null, null, hash);
      return loadPage();
    });
  }
};

window.addEventListener('load', load);

window.addEventListener('hashchange', loadPage);

var src = {

};

return src;

}());
