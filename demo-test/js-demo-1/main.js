var div1 = document.createElement('div')
div1.className = 'demo'
document.body.appendChild(div1)

var dragging = false
var lastX
var lastY

div1.onmousedown = (e) => {
    lastX = e.clientX
    lastY = e.clientY
    dragging = true
}

document.onmousemove = (e) => {
    if (dragging === true) {
        // console.log(e.clientX, e.clientY)
        // console.log(lastX, lastY)
        var deltaX = e.clientX - lastX
        var deltaY = e.clientY - lastY
            // console.log(deltaX, deltaY)
            // console.log('div1.style.top')
            // console.log(div1.style.top)
        var left = parseInt(div1.style.left) || 0
        var top = parseInt(div1.style.top) || 0

        // 阻止用户把div搞不见，即位置X Y的数值不低于零
        var resultY = top + deltaY
        var resultX = left + deltaX

        // if (resultX < 0) {
        //     resultX = 0
        //     resultY = 0
        // }
        // if (resultY < 0) {
        //     resultY = 0
        //     resultX = 0
        // }

        div1.style.left = resultX + 'px'
        div1.style.top = resultY + 'px'

        // 更新lastX lastY的位置
        lastX = e.clientX
        lastY = e.clientY

        console.log(['e.clientX:', e.clientX, 'e.clientY:', e.clientY])
        console.log([deltaX, deltaY, lastX, lastY])
    }
}

div1.onmouseup = () => {
        dragging = false
    }
    // 不放在document.body上