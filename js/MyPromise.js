//完全手写一个promise，实现基本功能
//三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败），还有就是状态的改变只能是pending -> fulfilled 或者 pending -> rejected
class MyPromise{
    constructor(fn){
        this.status = 'pending';
        this.value = null;
        if(typeof fn !== 'function'){
            throw new TypeError(`${fn} is not a function`);
        }
        fn(this.resolve.bind(this),this.reject.bind(this));
    }
    resolve(value){//两个功能，判断状态，是pending的时候就把它变成resolve
        if(this.status !== 'pending') return;
        this.status = 'resolved';
        this.value = value;
    }
    reject(value){
        if(this.status !== 'pending') return;
        this.status = 'rejected';
        this.value =value;
    }
    then(resolved,rejected){
        if(typeof resolved !== 'function' && typeof resolved !== 'function'){
            return this;
        }
        if(typeof resolved !== 'function' && this.status === 'resolved' || typeof rejected !== 'function' && this.status === 'rejected'){
            return this;
        }
        return new Promise((resolve,rejecte)=>{
            if(typeof resolved === 'function' && this.status === 'resolved'){
                if(resolved && typeof resolved === 'function' && this.status === 'resolved'){

                }
                if(rejected && typeof rejected === 'function' && this.status === 'rejected'){

                }
            }
        })
    }
}