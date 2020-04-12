/* 实现的几个 DOM 接口
** dom.create(`<div>hi</div>`) // 用于创建节点
** dom.after(node, node2) // 用于向后追加兄弟节点
// 原生的提供了一个兼容性不佳的实验性接口`ChildNode.after() MDN`
** dom.before(node, node2) // 用于向前追加兄弟节点
** dom.append(parent, child) // 用于创建子节点
** dom.wrap(`<div></div>`) //  用于创建父节点
*/
// dom.create = function() {}
window.dom = {
    // create: function() {} // 可简化为
    create(tagName /* 语义化 形参 */ ) {
        // return document.createElement(tagName) // 不能创建带有结构的 HTML 元素`<div><span>1</span></div>`

        // const container = document.createElement("div")
        const container = document.createElement("template")
        container.innerHTML = tagName.trim() // 除去空格
            // return container.children[0]
        return container.content.firstChild
            /* 存在 不可识别元素(<td></td>)的 bug
             ** <td</td>> 不能单独存在 只能放在<table></table> 里<tr></tr>或<tbody></tbody> 里，放在 div 里不符合 HTML 语法
             ** 可以放任意元素，不出 bug 的标签是 <template></template>
             ** <template></template> 是窜门用来容纳人以标签的
             ** <template></template> 用template.content.firstChild拿到
             */
    },
    after(node, node2) { // 在后面插入节点，就相当于在此 node 后面的节点的前面插 // 必须调用父节点的 insertBefore() 方法
        console.log(node.siblings) // null ?
        node.parentNode.insertBefore(node2, node.nextSibling)
            /* 判断 排除最后一个节点 没有下一个节点 null 也符合 */
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        dom.before(node, parent) // 将要包裹的“父节点”先插到目标节点的前面
        dom.append(parent, node) // 再把目标节点用 append 移至将要包裹的父节点的下面
    },
    remove(node) {
        // node.remove() // IE 不支持 兼容性不好
        node.parentNode.removeChild(node)
        return node // 仍然需要获取此节点的引用
    },
    empty(node) { // 清空 node 里面的所有子元素
        // node.innerHTML = ''
        // const childNodes = node.childNodes 可以改写成以下的写法
        /*     const {
                childNodes
            } = node */ // 解构赋值 
        const array = []
            /* 
            for (let i = 0; i < childNodes.length; i++) { // 不需要i++的循环就用 while 循环代替
                console.log(childNodes)
                console.log(childNodes.length)
                dom.remove(childNodes[i]) // remove( nodes) 会实时改变 nodes 的长度每次减一 导致循环的长度不固定 出现 bug
                array.push(childNodes[i])
            } 
            */
            //  不需要i++的循环就用 while 循环代替for 循环

        /* 获取第一个子节点 并 push 进数组 */
        let x = node.firstChild
        while (x) { // 如果 x 存在
            array.push(dom.remove(node.firstChild))
            x = node.firstChild // 第一个子节点已经移除 原先第二节点就变为现在的第一个节点
        }
        return array // 仍然需要获取此节点的引用
    },
    /* 改 */
    attr(node, name, value) { // 组合
        node.setAttribute(name, value) // 原生 setAttribute(name, value)
    }
}