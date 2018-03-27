<nav start="1" jade>
  menu(name="翻译")
    pane(name="欧文")
      item(name="English" href="")

    pane(name="亚文")
      item(name="简体中文" href="zh-Hans")
      item(name="日本語" href="jp")

  menu(name="API" href="/api")
</nav>
<nav start="1" jade>
  menu(name="翻译")
    pane(name="欧文")
      item(name="English" href="")

    pane(name="亚文")
      item(name="简体中文" href="zh-Hans")
      item(name="日本語" href="jp")

  menu(name="API" href="/api")
</nav>




<cover>
  <logo src="logo.svg"/>
  <!-- <name>Breeze</name> -->
  <desc>超简单、超漂亮的 API 文档生成器！</desc>

  <item>无需 build 成 HTML，愉快的撰写体验</item>
  <item>轻量 ( ~15kB gzipped )</item>
  <item>多主题，易扩展</item>

  <button href="https://github.com/kid-wumeng/Breeze">Github</button>
  <button active href="#">阅读文档</button>
</cover>



# 入门



## Breeze 是什么

(｡･∀･)ﾉﾞ嗨，兄弟们 ~ 给你们介绍一下 Breeze ( 微风 )，她是一个小巧的网页文档生成器，用于制作漂亮的 API 文档或技术博客。

你正在读的这份指南便是她的手笔，优雅的三栏布局：左侧是导航，中间是正文，而右侧是代码示例，结构十分清晰。

不同于 Hexo、GitBook、Slate 等传统工具，Breeze 采用了**纯动态**的设计理念：你写好`.md`文件，**不用编译为HTML文档**，Breeze 会在页面加载时，动态解析语法并渲染出来。

别担心性能，现代浏览器真的很快，你应该享受无缝写文档的快乐！

让我们用一个 Quick Start 让你理解，使用 Breeze 写文档有多简单。



## 如何使用

####

你要做的第一件事是准备一个`index.html`文件，如右侧所示：

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

####

第二件事是准备一个``README.md``，随便写几句内容：


```
# hello world
this is my first document by Breeze ~ !
```

####

好了，这就搞定了！你可以马上用浏览器打开`index.html`看看效果，是不是很简单？

#### 特性

让我们看看 Breeze 有哪些优点：

* 便捷：无需构建，所写即所得
* 轻量：仅需引用一份JS、一份CSS
* 漂亮：预设多套主题，并且很容易定制样式
* 单页架构，支持多文档结构
* 全文检索

## Markdown

Breeze 支持 [GitHub 风格的 Markdown 语法](https://github.github.com/gfm/)

# 标签

Markdown 本身支持 HTML 标签，理论上，你可以使用任何符合规范的标签，并自定义CSS实现一些特别的外观。Breeze 预定义了一部分特殊标签，使他们具备独特的功能，方便你编写文档。

## &lt;example&gt;

任何被 &lt;example&gt; 标签包裹的内容，都会被放到右侧分栏：


####

<pre>
<code>&lt;example&gt;

this is a method example,

```js
var a = 6;
add(a, 3);

function add (a, b) {
  return a + b;
}
```

&lt;/example&gt;</code>
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


你能看到，&lt;example&gt; 标签除了可以放代码，也可以放任何 markdown 语句。事实上，&lt;example&gt; 的功能，只是将它包裹的内容从中栏移动到右栏。

Breeze 将同一个标题下的内容视为一个整体，假设有如下内容：

####

<pre>
<code>&#35; A heading
this is content 1.
this is content 2.
&lt;example&gt;this is example 2.&lt;/example&gt;</code>
</pre>

这段标签文本，实际上会形成以下HTML结构：

<example>
```html
<section>
  <contents>
    <h1>A heading</h1>
    <p>this is content 1.</p>
    <p>this is content 2.</p>
  </contents>
  <examples>
    <p>this is example 2.</p>
  </examples>
</section>
```
</example>


你的本意可能希望`example 2`能与`content 2`平行对齐，但现在`example 2`将与`A heading`对齐。为了避免这点，你可以借助一个空的 h4 ~ h6 标题：

####

<pre>
<code>&#35; A heading
this is content 1.

&#35;&#35;&#35;&#35;
this is content 2.
&lt;example&gt;this is example 2.&lt;/example&gt;</code>
</pre>

<example>
```html
<section>
  <contents>
    <h1>A heading</h1>
    <p>this is content 1.</p>
  </contents>
</section>

<section>
  <contents>
    <h4></h4>
    <p>this is content 2.</p>
  </contents>
  <examples>
    <p>this is example 2.</p>
  </examples>
</section>
```
</example>


你可以单纯地记住，在需要水平对齐左右两侧的地方使用4个井号





## &lt;api&gt;

API 参数表是写文档时一个很常见的需求，比如方法的调用参数，在线服务的请求参数等。以往我们会有列表或表格的形式来表达它，现在有专门的 &lt;api&gt; 标签来处理。以下是一个参数表示例，而它的书写格式在右面。

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



## &lt;jade&gt;


####

以下是 [GitHub](https://developer.github.com/v3/repos/commits/) 上某个 API 的请求参数表，我用 Jade 风格书写的：

####

<jade>
  api
    item
      name sha
      type string
      desc SHA or branch to start listing commits from. Default: the repository’s default branch (usually master).
    item
      name path
      type string
      desc Only commits containing this file path will be returned.
    item
      name author
      type string
      desc GitHub login or email address by which to filter by commit author.
    item
      name since
      type string
      desc Only commits after this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
    item
      name until
      type string
      desc Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
</jade>


<example>
```
<jade>
  api
    item
      name sha
      type string
      desc SHA or branch to start listing commits from. Default: the repository’s default branch (usually master).
    item
      name path
      type string
      desc Only commits containing this file path will be returned.
    item
      name author
      type string
      desc GitHub login or email address by which to filter by commit author.
    item
      name since
      type string
      desc Only commits after this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
    item
      name until
      type string
      desc Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
<\/jade>
```
</example>




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