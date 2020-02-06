// demo.style.left = '100px';
var n = 1;
var id = setInterval(() => {
    console.log(n);
    if (n < 100) {
        demo.style.left = n + "px";
        n = n + 1;
    } else {
        clearInterval(id);
    }
}, 1000 / 60);
setTimeout(() => {
    demo1.classList.add("end");
}, 3000);
setTimeout(() => {
    demo2.remove();
}, 5000);
setTimeout(() => {
    demo3.style.background = "red";
}, 6000);
setTimeout(() => {
    demo4.style.transform = "translateX(300px)";
}, 8000);