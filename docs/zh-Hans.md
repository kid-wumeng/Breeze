嗨，朋友们 ~ ,,Ծ‸Ծ,,

让我来介绍一下 Breeze，她是一个小巧的网页文档生成器，能让你用最简单的方式，制作最精美的线上 API 文档。

你正在看的这份指南，便是她的手笔哟！

这是一个优雅的三栏布局：左侧是导航，中间是正文，而右侧是代码示例，结构清晰。而且 Breeze 采用响应式设计，对移动端进行了适配。

不同于 Hexo、GitBook、Slate 等传统工具，Breeze 遵守 **< 纯动态 >** 的设计理念：你只需写好`.md`文件，但**用不着**编译为 HTML 文档，Breeze 会在页面加载时，动态解析 Markdown 语法并渲染出来。

别担心性能问题，因为现代浏览器真的非常快。相信我，当你习惯这种无缝的撰写体验，你真的会爱上写文档！

让我们从一个 Quick Start 开始，让你彻底了解 Breeze 用起来是多么简单 ~





# 入门



## 如何使用

首先建立一个`index.html`文件：

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="breeze.css">
</head>
<body>
  <script src="breeze.js"></script>
</body>
</html>
```

然后在同一个目录中建立``README.md``文件，随便写上几句：

```md
# hello world
this is my first document by Breeze ~ !
```

好的，全部搞定！现在你可以用浏览器打开`index.html`看看效果。

使用 Breeze 就是这么简单，你要做的仅仅是引用`breeze.js`与`breeze.css`，然后便可以专心编写文档，一切杂事交给 Breeze 处理即可。





## 多页文档

一个网站可能由多份文档组成，比如`guide.md`、`api.md`等，Breeze 会自动处理好它们之间的路由映射。例如你创建了`api.md`，那么它对应的路由是`/#/api`。

假设有以下目录结构，右侧展示了当你访问网站时，哪个 url 会加载哪个`.md`文件：

####

```
-| index.html
-| README.md
-| api.md
-| api/
  -| README.md
  -| math.md
```

<example>
```
http://xxx.com             =>  README.md
http://xxx.com/#/api       =>  api.md
http://xxx.com/#/api/      =>  api/README.md
http://xxx.com/#/api/math  =>  api/math.md
```
</example>

你可能会好奇，为什么路径中会包含`#/`呢？

因为 Breeze 默认采用单页架构 ( Single-Page Application, SPA ) ，当用户从一个页面跳转到另一个页面时，Breeze 会加载相应的`.md`文件，而不会刷新整个页面。

SPA 能够带来流畅的用户体验。





## 跳转规则

你的文档里肯定有大量链接，Breeze 遵循以下跳转规则。



### 1. 外部 URL

你可以跳转到一个网络地址，必须指定包括协议在内的完整 url。

<example>
```
[Breeze](https://github.com/kid-wumeng/Breeze)
>>
https://github.com/kid-wumeng/Breeze
```
</example>



### 2. 本页 ID

Breeze 会自动提取标题 ( h1 ~ h6 ) 为 ID，你可以跳转到任意 ID，ID 以`#`开头。

<example>
若当前页为`http://xxx.com/#/api/`

```
[Math](#math)  >>  http://xxx.com/#/api?id=math
```
</example>



### 3. 其它页

跳转到另一个文档页面时，开头的`/`是可选的。

<example>
```
[Math](/api/math)  >>  http://xxx.com/#/api/math
[Math](api/math)   >>  http://xxx.com/#/api/math
```
</example>



### 4. 其它页 ID

可以在跳转到其它页时顺便指定 ID。

<example>
```
[Math.sqr](api/math#sqr)  >>  http://xxx.com/#/api/math?id=sqr
```
</example>





## Markdown

Breeze 支持的 Markdown 语法标准：

- [CommonMark Spec](http://spec.commonmark.org/0.28/)
- [GitHub Flavored Markdown Spec, GFM](https://github.github.com/gfm/)

> 由于 Breeze 中解析 Markdown 语法的部分依赖 [marked.js](marked.js.org)，这个库仅支持通用语法与核心 GFM 语法，而不支持扩展 GFM 语法，例如 [Task list items](https://github.github.com/gfm/#task-list-items-extension-) 等，可以参考 [这个 issue](https://github.com/markedjs/marked/issues/956) 了解更多。

> Breeze 将通过 ** < 标签 > ** 弥补一些功能。





# 标签

Markdown 支持直接写 HTML 标签，借助这点，Breeze 预置了一些实用组件，帮助你更好地编写文档。





## <example>

任何被 <example\> 包裹的内容，都会被放到右侧分栏：

####

<pre>
<code>
&lt;/example&gt;

this is a method example,

```js
var a = 6;
add(a, 3);

function add (a, b) {
  return a + b;
}
```

&lt;/example&gt;
</code>
</pre>


<example>
this is a method example,

```js
var a = 6;
add(a, 3);

function add (a, b) {
  return a + b;
}
```
</example>

如你所见，<example\> 里不止可以放代码示例，也可以放任何 Markdown 语句。

#### 自由分组

因为 Breeze 会将同一个标题下的所有内容视为一组，利用这个特性，我们可以很轻易地实现普通内容与 <example\> 内容的对齐，比如：

####

```md
# A heading
this is content 1
this is content 2
<EXAMPLE>this is example 2</EXAMPLE>
```

<example>
```html
<section>
  <h1>A heading</h1>
  <content>
    <p>this is content 1</p>
    <p>this is content 2</p>
  </content>
  <EXAMPLE>
    <p>this is example 2</p>
  </EXAMPLE>
</section>
```
</example>

上面的内容被 h1 分到了一组，右侧展示了通过 Breeze 实时编译后的 HTML 结构。

然而就这个例子而言，你的本意可能是希望`example 2`能与`content 2`平行对齐，但现在`example 2`将与`content 1`对齐。

为了避免这点，你可以借助一个空标题强行分组。

我的个人习惯是侧栏中仅显示 h1 ~ h3 的概要，那么文本中的 h4 ~ h6 都可以当空标题用，而不会对侧栏产生任何影响。当然，你可以按自己的喜好决定。

####

```md
# A heading
this is content 1

####
this is content 2
<EXAMPLE>this is example 2</EXAMPLE>
```

<example>
```html
<section>
  <h1>A heading</h1>
  <content><p>this is content 1</p></content>
</section>

<section>
  <h4></h4>
  <content><p>this is content 2</p></content>
  <EXAMPLE><p>this is example 2</p></EXAMPLE>
</section>
```
</example>

现在我只要简单地记住，在需要水平对齐的地方，使用4个井号即可。





## <JADE>

####








## <api>

API 参数表是一个写文档时很常见的需求，比如方法的调用参数，在线服务的请求参数等。以往我们会用列表或表格的形式来表达，但现在有专门的 <api\> 来处理。

下面这个例子表达了 JavaScript 中`Array.prototype.splice`方法的参数，右侧是在`.md`中的写法：

####

<api>
  <item>
    <name>start</name>
    <type>number</type>
    <desc>Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array.</desc>
  </item>
  <item>
    <name>deleteCount</name>
    <type>number, optional</type>
    <desc>An integer indicating the number of old array elements to remove.</desc>
  </item>
  <item>
    <name>item1, item2, ...</name>
    <type>\*, optional</type>
    <desc>The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.</desc>
  </item>
</api>

<example>
```html
<api>
  <item>
    <name>start</name>
    <type>number</type>
    <desc>Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array.</desc>
  </item>
  <item>
    <name>deleteCount</name>
    <type>number, optional</type>
    <desc>An integer indicating the number of old array elements to remove.</desc>
  </item>
  <item>
    <name>item1, item2, ...</name>
    <type>\*, optional</type>
    <desc>The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.</desc>
  </item>
</api>
```
</example>

####

这个则是 [GitHub](https://developer.github.com/v3/repos/commits/) 上某个 API 的请求参数表：

####

<api>
  <item>
    <name>sha</name>
    <type>string</type>
    <desc>SHA or branch to start listing commits from. Default: the repository’s default branch (usually master).</desc>
  </item>
  <item>
    <name>path</name>
    <type>string</type>
    <desc>Only commits containing this file path will be returned.</desc>
  </item>
  <item>
    <name>author</name>
    <type>string</type>
    <desc>GitHub login or email address by which to filter by commit author.</desc>
  </item>
  <item>
    <name>since</name>
    <type>string</type>
    <desc>Only commits after this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.</desc>
  </item>
  <item>
    <name>until</name>
    <type>string</type>
    <desc>Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.</desc>
  </item>
</api>

<example>
```html
<api>
  <item>
    <name>sha</name>
    <type>string</type>
    <desc>SHA or branch to start listing commits from. Default: the repository’s default branch (usually master).</desc>
  </item>
  <item>
    <name>path</name>
    <type>string</type>
    <desc>Only commits containing this file path will be returned.</desc>
  </item>
  <item>
    <name>author</name>
    <type>string</type>
    <desc>GitHub login or email address by which to filter by commit author.</desc>
  </item>
  <item>
    <name>since</name>
    <type>string</type>
    <desc>Only commits after this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.</desc>
  </item>
  <item>
    <name>until</name>
    <type>string</type>
    <desc>Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.</desc>
  </item>
</api>
```
</example>

####

也许你能更加物尽其用？





## <nav>

也许你已经注意到了，这份文档提供了多语言版本，它的切换以导航条菜单的形式存在，以下是它的写法：

```html
<NAV>
  <menu name="Translations">
    <item name="English" href=""/>
    <item name="简体中文" href="/zh-Hans"/>
    <item name="日本語" href="/jp-jp"/>
  </menu>
</NAV>
```

下面的例子是个更复杂的导航栏，它有两个菜单：
```html
<NAV>
  <menu name="Translations">
    <item name="English" href=""/>
    <item name="简体中文" href="/zh-Hans"/>
    <item name="日本語" href="/jp-jp"/>
  </menu>
  <menu name="Others">
    <item name="About Me" href="/about-me"/>
    <line/>
    <item name="Links"/>
    <item name="Github" href="https://github.com"/>
    <item name="Chat Room" href="https://chat-room.com"/>
  </menu>
</NAV>
```

不设`href`的 <item\> 会被视为提示文本，而 <line\> 则会显示一条分隔线。





## <cover>


<cover\> 能让你快速制作一张简洁的网站封面：

```html
<COVER>
  <logo src="logo.svg"/>
  <name version="1.0">Breeze</name>
  <desc>A Dead Simple and Beautiful API documentation site generator ~ !</desc>

  <item>No build to html, happy write.</item>
  <item>Light as a feather( ~15kB gzipped )</item>

  <button href="https://github.com/kid-wumeng/Breeze">Github</button>
  <button active href="">阅读文档</button>
</COVER>
```

* <logo\> - 可以使用任何浏览器支持的图片格式，比如`png`、`jpg`、`webp`、`svg`等。
* <name\> - 文档名，`version`属性是版本号。
* <desc\> - 比较大的文本描述，可以写多个。
* <item\> - 比较小的文本描述，可以写多个。
* <button\> - 按钮，默认是幽灵风格，`active`属性可以设置它为实心风格。





## <summary>

默认情况下，Breeze 从 Markdown 文章中读取标题，以形成侧栏的概要链接。你也可以通过 <summary\> 手动设置一些概要：

```html
<SUMMARY>
  <item href="/home">Home2</item>
</SUMMARY>
```





# 风格

## 预设主题

## 定制样式

### 大结构
### 文章 / article
### 参数 / api
### 导航 / summary
### 搜索 / search

## 代码高亮


# 高级特性

## 配置项
### basePath

## 多页架构

# 其他

## GitHub

## 许可协议