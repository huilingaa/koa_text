import Vue from 'vue'

Vue.directive('drag', {
    // 使用bind会有可能没有渲染完成
    inserted: function (el, binding, vnode) {
        const _el = el //获取当前元素
        const ref = vnode.context.$refs[binding.expression] // 判断基于移动的是哪一个盒子
        const refName = binding.expression
        const masterNode = ref ? ref : document // 用于绑定事件
        const masterBody = ref ? ref : document.body // 用于获取高和宽
        const mgl = _el.offsetLeft
        const mgt = _el.offsetTop
        const maxWidth = refName == 'refInfinity' ? Infinity : masterBody.clientWidth
        const maxHeight = refName == 'refInfinity' ? Infinity : masterBody.clientHeight
        const elWidth = _el.clientWidth
        const elHeight = _el.clientHeight
        let positionX = 0
        let positionY = 0
        _el.onmousedown = e => {
            // 当子元素class名中包含drag-not-move时不移动
            if (JSON.stringify(e.target.className).includes('drag-not-move')) return
            //算出鼠标相对元素的位置，加上的值是margin的值
            let disX = e.clientX - _el.offsetLeft + mgl
            let disY = e.clientY - _el.offsetTop + mgt
            masterNode.onmousemove = e => {
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX
                let top = e.clientY - disY
                // 绑定的值不能滑出基于盒子的范围
                if (refName != 'refInfinity') {
                    left < 0 && (left = 0)
                    left > (maxWidth - elWidth - mgl) && (left = maxWidth - elWidth - mgl)
                    top < 0 && (top = 0)
                    top > (maxHeight - elHeight - mgt) && (top = maxHeight - elHeight - mgt)
                }
                //绑定元素位置到positionX和positionY上面
                positionX = top
                positionY = left

                //移动当前元素
                _el.style.left = left + "px"
                _el.style.top = top + "px"
            }
            // 这里是鼠标超出基于盒子范围之后再松开，会监听不到
            document.onmouseup = e => {
                masterNode.onmousemove = null
                document.onmouseup = null
            }
        }
    }
})

