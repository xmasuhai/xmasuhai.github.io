// 对比 document.createElement("div") 简化代码
// const div = dom.create("div")
/* 直接写出 HTML 结构 */
const div = dom.create("<div><span>newDiv</span></div>")
const td = dom.create("<tr><td>TD</td></tr>")
console.log(div)
console.log(td)

/* after */
dom.after(test, div)
const div3 = dom.create('<div id="wrapper">DIV3</div>') // 父节点
dom.wrap(test, div3)
    /* empty test */
const nodes = dom.empty(window.empty)
console.log(nodes)

/* 改 */
dom.attr(test, 'title', 'Hi, Jack')