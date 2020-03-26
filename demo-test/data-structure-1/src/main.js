const divScreen = document.querySelector('#screen');
const btnCreateNumber = document.querySelector('#createNumber');
const btnCallNumber = document.querySelector('#callNumber');
    /* 取到 当前号码对应的span */
const spanNewNumber = document.querySelector('#newNumber');
const spanQueue = document.querySelector('#queue'); // 取到 当前队列

/* 监听用户取号
 ** 声明一个号 n = 0 默认无人排队
 ** 声明队列数组 queue
 */
let n = 0;
let queue = [];

/* 点击取号时显示 当前号码 */
btnCreateNumber.onclick = () => {
    n += 1;
    queue.push.call(queue, n); // 将取得的好记录下来 // queue.push(n)
    spanNewNumber.innerHTML = n;
        // spanQueue.innerText = queue.toString() // spanQueue.innerText = queue.toString()  只能显示字符串，会用逗号连接 不美观 1,2,3,4,5 变为字符串格式的[]
        /* JSON.stringify 将对象变为带有原对象格式的字符串  */
    spanQueue.innerText = JSON.stringify(queue)
};

/* 点击叫号时 出队 */
btnCallNumber.onclick = () => {
    /* 排除叫完号 出现 m === undefined */
    if (queue.length === 0) {
        divScreen.innerText = `取号完毕`;
        return;
    }
    //const m = queue.shift()
    const m = queue.shift.call(queue);
    divScreen.innerText = `请 ${m} 号就餐`;
    spanQueue.innerText = JSON.stringify(queue) // 队列更新，再次打印到span里 放到span里
};

/*
    队列：类似数组的结构，只提供入队queue.push(n)，和出队queue.shift()两个操作
*/