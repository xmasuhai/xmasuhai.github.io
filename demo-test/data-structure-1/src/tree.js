const createTree = value => {
    return {
        data: value,
        children: null,
        /* 用类似双向链表，在属性中记录父节点 */
        parent: null // 默认 空
    };
};
/* 增加节点 */
const addChild = (node, value) => { // 每次在一个节点上 加一个孩子（值）
    const newNode = {
        data: value,
        children: null,
        /* 用类似双向链表，在属性中记录父节点 */
        parent: node
    };
    /* 父节点 有可能是空 也有可能是数组 保底值 */
    node.children = node.children || [];
    node.children.push(newNode);
    /* 将加了子节点的新节点 返回 */
    return newNode
};

/* 删除节点的过程中，必须先遍历节点，先确保要删除的节点存在于当前父节点中 */
const travelTree = (tree, fn) => { // 所谓遍历，就是把每一个节点的值打出来
    // debugger;
    /* 首先 打印 tree上的每一个值，先遍历根节点 */
    fn(tree);
    /* 其次 再打印 tree上的每一个节点的值，可用 forEach遍历数组 children
     * // children 如果为空 就不应该被遍历 所以要加判断
     *  */
    if (!tree.children) {
        return;
    }
    for (let i = 0; i < tree.children.length; i++) {
        travelTree(tree.children[i], fn) // 把子节点作为一个树，再遍历一下
    }
};

const tree = createTree(0);
const node1 = addChild(tree, 10);
const node2 = addChild(tree, 20);
const node3 = addChild(tree, 30);
const node4 = addChild(tree, 40);
const node5 = addChild(tree, 50);
addChild(node2, 201);
addChild(node2, 202);
addChild(node2, 203);
addChild(node2, 204);
console.log(tree);
console.log(node3);

/* 为打断点 */
const fn = node => {
    // debugger;
    console.log(node.data);
};
travelTree(tree, fn);

/* 抽象一个查找函数 find()
 * 判断一棵树里是否有要查找的节点
 * 即查找这棵树的子树里是否存在 要查找的节点
 * 当前节点是否匹配 子节点里遍历查找
 *  */
const find = (tree, node) => {
    if (tree === node) { // 找到当前节点即为所查找的
        return tree;
    } else if (tree.children) { // 如果存在子树 遍历子树节点
        for (let i = 0; i < tree.children.length; i++) {
            const result = find(tree.children[i], node);
            if (result) { // 返回子树中 查找到的 节点
                return result
            }
        }
        return undefined // 未找到
    } else {
        return undefined // 未找到
    }
};

console.log('找到了');
console.log(find(tree, node2));

/* 删除节点 */
const removeNode = (tree, node) => {
    /* 找到下标 找到兄弟节点
     *  要知道 删除的节点在 兄弟节点里的下标
     *  数组仅支持按下标删除
     * */
    if (node === tree) {
        console.log('不能删除自己')
        return tree
    } else {
        const siblings = node.parent.children;
        let index = 0;
        for (let i = 1; i < siblings.length; i++) {
            if (siblings[i] === node) {
                index = i
            }
        }
        // 得到要删除节点的下标index
        siblings.splice(index, 1)
    }
};
console.log(tree);
removeNode(tree, node5);
console.log(tree);