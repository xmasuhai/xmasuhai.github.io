---
title: "【CSS全解03】CSS基础 盒模型"
date: 2020-01-13T00:27:37+08:00
draft: false
tags: ["CSS"]
tags_weight: 100
categories: ["2020"]
categoryes_weight: 100
isCJKLanguage: true
---

## 两种盒模型

### 盒模型

[直观地感受下盒模型demo](http://output.jsbin.com/puyazix)

- content-box 内容盒：以内容为盒子的边界（宽高度）
- border-box 边框盒：以边框为盒子的边界（宽高度）

> 请说一下盒模型

标准回答：

> CSS 盒模型分两种：
>
> 一种是content box，另一种是border box；
>
> 区别是：
>
> content box的宽、高度只包含content；
>
> border box的宽、高度包含到border（以内），包括border、padding和content；

### 区别

只在设置了宽高后有区别

content-box 是写了多少宽度，内容就是多少宽度，但是如果设置了padding、border和margin，整个加起来，不符合视觉习惯。

border-box 为了符合视觉习惯，压缩了content的内容，除去margin以外的宽度，边框的最左边到最右边就是宽度，从而使得宽度迎合视觉习惯

### 尺寸计算公式

> 在浏览器**缩放比例**为`1`的情况下，F12(Chrome)打开检查元素，查看开发者工具>Styles
>
> `content-box [width | height] = content`
>
> `border-box [width | height] = content + padding + border`

很多人对盒模型有误解。把margin算进去的那是**盒子占据的位置**，而不是**盒子的大小**！

> 盒子的大小为`content+padding+border`即内容的`(width)`+内边距的再加上边框，而不加上`margin`。
>
> content 二维 width和height；可见
>
> border、padding和margin 二维的`-top`,`-bottmom`, `-left`,`-right`；
>
> border可见,通过` border-`, `border-style`, `border-color`属性
>
> `border: [border-width ||border-style ||border-color |inherit] `;
>
> padding和margin透明（无显现属性transparent elements），间接可见

[CSS padding margin border属性详解 by Ruthless](https://www.cnblogs.com/linjiqin/p/3556497.html)

影响和盒子有关的其他内容

mdn参考

> [CSS 基础框盒模型介绍 mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)
>
> 假如框盒上设有背景（`background-color` 或 `background-image`），背景将会一直延伸至边框的外沿（默认为在边框下层延伸，边框会盖在背景上）。此默认表现可通过 CSS 属性 `background-clip` 来改变。
>
> 除[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)外，对于行内元素来说，尽管内容周围存在内边距与边框，但其占用空间（每一行文字的高度）则由 `line-height`属性决定，即使边框和内边距仍会显示在内容周围。

### 哪个好用

> border-box 边框盒更好用，因为宽度不用考虑padding和border的影响，压缩点内容，要看，如果是处理文字，可以用text-overflow等来省略
>
> 因为border-box的width会将padding和border包含在内，布局时更好控制，尤其是在响应式布局中。

有一篇墙推IE怪异盒模型的文章：[《把所有元素的box-sizing都设置成border-box吧！》](https://css-tricks.com/international-box-sizing-awareness-day/)

有一种推荐而且很常见的做法：

```CSS
* {
    box-sizing:border-box;
}
```

#### 块级盒的默认宽度

如果未声明宽度，并且盒子是静态或者相对定位，有内容`content`，宽度会保持 100％的 宽度，改变了`padding` 和 `border`的值不为0后， 块级盒会向内推动，而不是向外扩展。

但是，如果明确设置盒子的宽度为 100％，那么 padding 就会向外延展。

盒子的默认宽度并不真的是 100％

而是**剩下的可能值**(剩余真实存在的宽度)。

很多情况下，盒子的默认宽度（剩余可能值）对于设置/不设置宽度都是非常有用

[CSS盒模型详解+定位](https://www.cnblogs.com/hnyei/archive/2011/09/29/2195935.html)，翻的是[CSS Tricks: The CSS Box Model](https://css-tricks.com/the-css-box-model/)

[你真的理解浏览器盒模型吗？](https://github.com/FrankKai/FrankKai.github.io/issues/38)

[前端精华总结](https://www.kancloud.cn/dunizb/web-dev-marrow/647634)

[边框盒 VS 内容盒Demo](https://codepen.io/carolineartz/full/ogVXZj)

### 变态的margin合并

margin不会影响盒子本身的大小，但是它会影响和盒子有关的其他内容，比如margin合并

#### 哪些情况会合并

> 上下合并，左右不合并，这样设计，方便写margin时不用再算除以2的问题，直接合并

- 父子margin合并（第一个子元素的上边距，最后一个子元素的下边距）
- 兄弟间上下margin合并

#### 如何阻止合并

> 父子合并（内外block）：

- 用`padding/border`挡住合并
- 用`overflow:hidden`挡住合并
- 用`display:flex`，不知道为什么，别问我，文档规定

> 父子margin间存在padding或border，就加了阻隔，隔开父子margin，自然就不能合并了
>
> 兄弟合并（上下block）：

- 符合预期的
- 用`inline-block`消除，margin分开计算不会合并
- CSS属性逐年增多，一条条死记

### [基本单位](https://www.zhangxinxu.com/wordpress/2011/03/css-css3-unit-units/)

#### 长度单位

- `px`像素
- `em`相对于自身`font-size`的倍数`1,2,3,4em`=`1x,2x,3x,4x font-size`
- 百分数
- 整数
- `rem`
- `vw` | `vh`
- 其他，少，不用了解

#### 颜色

- `hsla(h, s, l, a): (30°, 100%, 100%, 0.5)`

- `rgba(r, g, b,a): (255, 127, 0,0.5)`

- `Hex triplet: #FF7F00`

- 淘宝色`#FF6600`
- 透明`transparent`

[CSS values and units mdn](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

[CSS length mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Relative_length_units)

> 自动填充背景色
>
> 在body上添加一个颜色，外面也同样变成这个色，但并不意味着背景全是body，只有加了border，才能看出body的实际范围
>
> 用border来确定body在哪

W3C 组织建议把所有网页上的对像都放在一个盒(box)中，设计师可以通过创建定义来控制这个盒的属性，这些对像包括段落、列表、标题、图片以及层。

盒模型主要定义四个区域：内容(content)、边框距(padding)、边界(border)和边距(margin)。

margin，background-color，background-image，padding，content，border之间的层次、关系和相互影响。

用3D画一张box model层次图

1. margin：层的边框以外留的空白
2. background-color：背景颜色
3. background-image：背景图片
4. padding：层的边框到层的内容之间的空白
5. border：边框
6. content：内容

---

[用CSS实现彩虹](https://codepen.io/xmasuhai/full/ExaLrpa)

[CSS 基础概念.pdf](https://static.xiedaimala.com/xdml/file/3ac7c224-c23d-491f-84b5-4fabfbeab9b8/2019-8-23-12-30-0.pdf)

[CSS盒模型 定位扫盲](https://zhuanlan.zhihu.com/p/24778275)

[CSS盒模型完整介绍JS，BFC](https://segmentfault.com/a/1190000013069516)

[盒模型 大小 定位](https://jayzangwill.github.io/blog/2016/12/15/CSS%20box%20model%20and%20location/#more)

[对盒子模型，BFC，IFC和外边距合并等概念和问题的总结](https://zhuanlan.zhihu.com/p/27839418)

[深入理解CSS盒模型](https://www.jianshu.com/p/8b8198095487)

[WEB前端开发 盒模型](http://caibaojian.com/fend_note/chapter1/04_04_box_model.html)

[前端工程师手册 盒模型](https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/box-module.html)

[谈谈我对盒模型的理解2017](https://wanghan0.github.io/2017/03/31/css-box/)

[牛客 介绍一下CSS的盒子模型？](https://www.nowcoder.com/questionTerminal/7f415325ccc344789093a70a54e4745b)

[8 Box model](https://www.w3.org/TR/CSS2/box.html)

[CSS的盒模型-过去和将来2014](http://zhanglun.xyz/2014/10/05/css%E7%9A%84%E7%9B%92%E6%A8%A1%E5%9E%8B%E5%9B%9E%E9%A1%BE/)

[CSS各种居中实现方式](https://wanghan0.github.io/2017/04/24/css-center/)

[学习CSS布局](https://zh.learnlayout.com/toc.html)

[学习CSS布局 box-sizing](https://zh.learnlayout.com/box-sizing.html)

<!-- Article End -->

---

<!-- test -->

<div style="text-align:center;">·未完待续·</div>

<!-- ok -->

---

#### 参考文章

- 无

#### 相关文章

- 无

---

- 作者： Joel
- 文章链接：
- [版权声明](http://xmasuhai.xyz/posts/版权声明链接/)
- 非自由转载-非商用-非衍生-保持署名
- <a style='color:#DB2D5D;' href='https://xiedaimala.com/bbs/users/8c266e6f-55a2-4348-a180-17cb8cdb2c46#/?page=1' target='_blank' rel='noreferrer noopener'>河</a>
<a style='color:#006CFF;' href='https://juejin.im/user/59abfad26fb9a0248f4aa221' target='_blank' rel='noreferrer noopener'>掘</a>
<a style='color:#009A61;' href='https://segmentfault.com/u/joel_59b17eb9d2155' target='_blank' rel='noreferrer noopener'>思</a>
<a style='color:#0084FF;' href='https://www.zhihu.com/people/xue-shou-41/posts' target='_blank' rel='noreferrer noopener'>知</a> 
<a style='color:#EA6F5A;' href='https://www.jianshu.com/u/079916729823' target='_blank' rel='noreferrer noopener'>简</a>

---
