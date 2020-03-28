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
/* 遍历操作节点 `travel` */
const travelList = (list, fn) => {
    let x = list;
    while (x !== null) {
        fn(x); // 操作节点
        x = x.next
    }
};
travelList(list, node => {
    console.log(node.data);
});

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
const removeFromList_test = (list, node) => {
    // debugger;
    let x = list;
    let p = null; // 上一个节点 默认是空
    if (list === node) { // 如果删除的是第一个节点
        // list 指向 第二个节点
        list = node.next //即删除传入的节点
    }
    while (x !== node) { // x 不等于 node， 先记下 x 给 p，让下一个节点赋值给 x
        p = x; //  先记下 x 给 p
        x = x.next
    }
    // console.log(p === null || p /* x 的上一个节点 */);
    // console.log(x === node || x === null);
    p.next = x.next;
};
removeFromList_test(list, node3);
console.log("list");
console.log(list);
/* bug */
const list1 = createList(10);
const node0 = list1; // node 就是 list 的第一个节点了现在
removeFromList_test(list, node0); // 你会发现 list 没有任何变化
const newList = removeFromList_test(list, node); // 就算获取返回值也没有用，因为根本就没返回新 list
/*  Uncaught TypeError: Cannot set property 'next' of null
*   at removeFromList (<anonymous>:71:12)
*   at <anonymous>:1:1
*   removeFromList @ VM343:71
*   (anonymous) @ VM658:1
*   null 不存在任何属性 也不能添加任何属性
*/
//list.js
const removeFromList = (list, node) => {
    let x = list;
    let p = node; // 课堂里将 p 初始化为 null，这里改为 node
    while (x !== node && x !== null) { // 课堂里忘了对 null 进行处理，如果 node 不在 list 中，x 就可能为 null
        p = x;
        x = x.next;
    }
    if (x === null) { // 若 x 为 null，则不需要删除，直接 return， false 表示无法删除不在list里的节点
        return false
    } else if (x === p) { // 这说明要删除的节点是第一个节点
        p = x.next;
        return p // 如果删除的是第一个节点，那么就要把新 list 的头节点 p 返回给外面，即 newList = removeFromList(list, list)
    } else {
        p.next = x.next;
        return list // 如果删除的不是第一个节点，返回原来的 list 即可
    }
};

// 使用方法为
const list0 = createList(10);
const node = list0; // node 就是 list 的第一个节点了现在
const newList = removeFromList(list0, node); // 必须用 newList 获取返回值才能拿到删除了第一个节点的新 list
//另一种实现，比如将头指针改为头结点，不过有点超纲