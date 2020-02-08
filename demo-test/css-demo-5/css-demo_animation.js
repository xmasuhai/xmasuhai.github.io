button.onclick = () => {
    demo.classList.add('start');
};
button2.onclick = () => {
    demo.style.animationPlayState = 'paused';
};
button3.onclick = () => {
    demo.style.animationPlayState = 'running';
};
button4.onclick = () => {
    demo.classList.remove('start');
};