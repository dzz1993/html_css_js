//手写代码实现一个懒加载，完成前端性能优化
//滑动到页面的区域，再加载图片
/*实现方案：
* 1、所有需要懒加载的图片放在一个盒子里，设置宽高和默认占位图
* 2、开始把所有ING的src设置为空，把真实图片地址放在img的自定义属性上，让img隐藏,使用自定义属性很方便
* 3、等所有其他资源加载完毕后，再加载图片
* 4、当有很多图片时，需要滚动后，当前区域完全显示出来后，再加载真实图片
*
* */
//获取外部包裹和内部图片
import {debounce} from "./debounce.js";
let box = document.querySelectorAll('.wrapper');
let img = document.querySelector(".wrapper img");
let lazyLoad= function() {
    //获取1、图片下边距离浏览器顶端的距离    2、浏览器底端距离顶端的距离
    let imgDis = box[0].clientHeight + box[0].offsetTop;
    let broDis = window.innerHeight + window.scrollY;
    console.log(imgDis);
    console.log(broDis);
    if(imgDis<=broDis && img.getAttribute("data-display") === "false"){
        //img.src = img.data-src;//直接dom赋值，不用想了根本不行
        //js获取和设置dom的属性值
        img.style.display = "block";
        img.setAttribute("src",img.getAttribute("data-src"));//实现了图片的懒加载
        if(img.onload){
            img.setAttribute("data-display","true");

        }
    }
};
//图片加载的实际：首屏要在页面其他元素加载完毕加载，其余要在页面滚动到图片位置加载
window.onload = window.onscroll = debounce(200,lazyLoad);
export  default  lazyLoad;
