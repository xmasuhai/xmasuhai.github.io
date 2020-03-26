const createList = value => {
    return createNode(value)
};
const appendList = (list, value) => {
    const node = createNode(value);
    /* 使 x 是最后一个节点 */
    let x = list;
    while (x.next) { // x 非空 即不是最后一个节点
        x = x.next;
    }
    // x.next === null; // x 是最后一个节点
    x.next = node;
    return node;
};
const createNode = (value) => {
    return {
        data: value,
        next: null
    };
};
const list = createList(0);
const node1 = appendList(list, 10);
const node2 = appendList(list, 20);
const node3 = appendList(list, 30);
const node4 = appendList(list, 40);
// console.log("node");
// console.log(node);
// console.log("list");
// console.log(list);

/* 删除节点的思路
*  将 node2 从 list 里删除
*  遍历找到上一个节点
*
const removeFromList = (list, node) => {
    if (list === node) { // 删除的是第1个节点，让目前的节点等于下一个节点的 next
        list = node.next // 第一个节点 自动被回收
    } else { // 如果删除的是第2个节点
        if (list.next === node) { // 删除的是第2个节点
            list.next = node.next // 让第1个节点.next = 第2个节点.next（第三个节点）
            // 第2个节点 自动被回收
        } else { // 如果删除的是第3个节点
            // 开始递归了
            // 就让第2个节点.next = 第3个节点.next
            if (list.next.next === node) {
                (list.next).next = node.next
            }else{// 如果删除的是第4个节点
                // 开始递归了
                // 就让第3个节点.next = 第4个节点.next
                if(list.next.next.next === node){
                    (list.next.next).next = node.next
                }

            }
        }
    }
};
*/

/* 用循环实现 删除节点 */
const removeFromList = (list, node) => {
    // debugger;
    let x = list;
    let p = null; // 上一个节点 默认是空
    while (x !== node) { // x 不等于 node， 先记下 x 给 p，让下一个节点赋值给 x
        p = x; //  先记下 x 给 p
        x = x.next
    }
    // console.log(p === null || p /* x 的上一个节点 */);
    // console.log(x === node || x === null);
    p.next = x.next;
    if (list === node) { // 如果删除的是第一个节点
        // list 指向 第二个节点
        list = node.next //即删除传入的节点
    }
};
removeFromList(list, node3);
console.log("list");
console.log(list);

/* 遍历操作节点 `travel` */
const travelList = (list,fn) => {
    let x = list;
    while (x !== null) {
        fn(x); // 操作节点
        x = x.next
    }
};

travelList(list, node => {
    console.log(node.data);
});