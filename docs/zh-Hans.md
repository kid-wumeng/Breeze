# Breeze 是什么？

(｡･∀･)ﾉﾞ嗨，兄弟们 ~ 给你们介绍一下 Breeze ( 微风 )，她是一个小巧的网页文档生成器，用于制作漂亮的 API 文档或技术博客。

你正在读的这份指南便是她的手笔，优雅的三栏布局：左侧是导航，中间是正文，而右侧是代码示例，结构十分清晰。

不同于 Hexo、GitBook、Slate 等传统工具，Breeze 采用了**纯动态**的设计理念：你写好``.md``文件，**不用编译为HTML文档**，Breeze 会在页面加载时，动态解析语法并渲染出来。

别担心性能，现代浏览器真的很快，你应该享受无缝写文档的快乐！

让我们用一个 Quick Start 让你理解，使用 Breeze 写文档有多简单。

## 快速开始

####

你要做的第一件事是准备一个``index.html``文件，如右侧所示：

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

## 特性

让我们看看 Breeze 有哪些优点：

* 便捷：无需构建，所写即所得
* 轻量：仅需引用一份JS、一份CSS
* 漂亮：预设多套主题，并且很容易定制样式
* 单页架构，支持多文档结构
* 全文检索


