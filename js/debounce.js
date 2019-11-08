//let timeout = null;
const debounce = (interval,fn)=>{
    let timeout = null;//只在初次调用的时候初始化，之后由于闭包就相当于全局的静态值
    return function(){//这块不能用箭头函数，否则this未定义，arguments报错
        if(timeout){//不断触发不断的清定时器
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            fn.apply(this,arguments);
        },interval)
    }
};
const debounce2 = (interval,fn)=>{
    let timeout = null;
    return function () {
        if(!timeout){
            fn.apply(this,arguments);//先执行，再调用
            timeout = setTimeout(()=>{
                fn.apply(this,arguments);
            },interval)
        }else{
            clearTimeout(timeout);//和第一种方式一样
            timeout = setTimeout(()=>{
                fn.apply(this,arguments);
            },interval)
        }
    }
};
export {debounce,debounce2};


const debounce = function (interval,fn) {
    let timeout = null;
    return function(){
        if(timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            fn.apply(this,arguments);
        },interval)
    }
}