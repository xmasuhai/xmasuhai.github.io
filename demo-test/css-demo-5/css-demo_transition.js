x.onclick = () => {
    demo.classList.add("end");
    // setTimeout(() => {
    //     demo.remove();
    // }, 6000); // 移除样式
};
// demo.addEventListener("transitionend", () => {
//     console.log(1);
//     demo.remove();
// });
button.onclick = () => {
    demo2.classList.add("b");
    setTimeout(() => {
        demo.classList.remove("b");
        demo2.classList.add("c");
    }, 1000);
    setTimeout(() => {
        demo.classList.remove("c");
        demo2.classList.add("d");
    }, 2000);
};