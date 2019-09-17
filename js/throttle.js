const throttle = (interval,fn)=>{
    let timeout = null;
    return function (a,b) {
        if(!timeout){
            fn.apply(this,arguments);
            timeout = setTimeout(()=>{
                clearTimeout(timeout);
            },interval)
        }
    }
};
const throttle2 = (interval,fn)=>{
    let timeout = null;
    return function(){
        if(!timeout){
            timeout = setTimeout(function () {
                fn.apply(this,arguments);
                clearTimeout(timeout);
            },interval);
        }
    }
};
export {throttle,throttle2};
