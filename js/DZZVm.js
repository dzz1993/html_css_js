/*手动实现vm*/
function DZZVm(opt={}){
    //拿到opt对象，保存在this下面
    let option = opt;
    let data = this._data = opt.data;
    //进行数据劫持,其实就是个深度的数据劫持，层层递归，只要是对象就调用监听函数
    createObj(data);
    //this代理this._data对象
    for(let key in data){
        Object.defineProperty(this,key,{
            enumerable:true,
            getter:function () {
                return this._data[key];
            },
            setter:function (newVal) {
                this._data[key] = newVal;
            }
        })
    }
    //编译页面
    Compile(opt.el,this);
}

/*
* 实现监视器Observer,简单来说，用递归的方法遍历data的所有属性，把这些属性用Object.defineProperty的getter和setter给监听起来，
* setter的话除了赋值之外，重新递归当前setter的值。
* */

/*
* @desc 数据劫持方法
* 为了方便递归调用Objserver方法，返回值是一个Objserver实例
* */
function createObj(data) {
    if(typeof data !== 'object') return;
    return new Observer(data);
}

/*
* @desc 监听方法
* 对于所有object类型接着监听并且递归
* */

function Observer(data) {
    for(let key in data){
        createObj(data[key]);
        Object.defineProperty(data,key,{
            enumerable:true,
            getter:function () {
                return data[key];
            },
            setter:function (newVal) {
                if(data[key] === newVal)return;
                this.data[key] = newVal
                //重新监听数据
                createObj(this.data[key]);
            }
        })
    }
}

/*
* 实现一个解析器Compile，简历一个虚拟dom，把dom移动到内存，利用正则进行模板替换
* 把虚拟dom append到目标主节点上进行页面的重绘
* */


/*
* @desc 实现页面渲染
* 1、dom移动到内存
* 2、模板替换
* 3、页面重绘
* */

function Compile(el,vm){
    //建立虚拟dom
    let virtualDom = document.createDocumentFragment();
    vm.$el = document.querySelector(el);
    //把el内部内容一条条加入
    let dom = null;
    while(dom = vm.$el.firstChild){
        virtualDom.appendChild(dom);
    }
    //console.log(virtualDom);
    //为了能够递归调用，把替换过程封装成一个数组
    replace(virtualDom);
    function replace(dom){
        //正则匹配替换,from类数组
        Array.from(dom.childNodes).forEach((item)=>{
            let regexp = /\{\{(.+)\}\}/g;
            let text = item.textContent;//获取内容进行匹配
            if(regexp.test(text)){
                //regexp.exec(text);
                //获取当前的key下的数据
                let data_arr = RegExp.$1.split('.');
                console.log(data_arr);
                let val = vm._data;
                data_arr.forEach(i=>{
                    val = val[i];
                })
                console.log(val);
                item.textContent = text.replace(regexp,val);
            }
            //如果当前dom有子节点，递归replace
            if(item.childNodes){
                replace(item);
            }
        })
    }
    //渲染
    vm.$el.appendChild(virtualDom);
    virtualDom = null;
}


/*
* @创建一个Dep类，实现模拟事件池
* subs保存所有需要监听的对象
* addSub将监听事件添加到事件池
* notify当数据发生变化时调用，通知更新数据
* notify触发的时候，遍历执行subs的所有事件
* */

function Dep(){
    this.subs = [];
}
Dep.prototype.addSub = function (fn) {
    this.sub.push(fn);
}
Dep.prototype.notify = function () {
    this.subs.forEach((fn)=>{
        fn.update();
    })
}

/*
* 监听函数（观察者）Wacther
* 意义：给需要变化的元素增加一个观察者，当数据变化后执行执行对应的方法
* 执行的方式：对新值和老值进行对比，如果变化了，就调用更新方法
* */
//结合vm.$watch就能很好的理解还有watch，都是实现监控
class Watcher {
    constructor(vm,expr,cb){
        this.vm = vm;//监控节点
        this.expr = expr;//监控值
        this.cb = cb;//callback操作函数
        //首先要获取一下老值，使用自定义this.get()方法
        this.value = this.get();
    }
    get(){
        Dep.target = this;    // 将当前订阅者指向自己,之所以用这个是应为之后的get会到
        let value = this.vm.data[this.expr];    // 触发getter，添加自己到属性订阅器中
        Dep.target = null;    // 添加完毕，重置
        return value;
    }
    //在setter里面调watcher的update方法
    //对外暴露一个更新方法，如果老值和新值不一样，就调用cb
    update(){
        //如果新老值不一样，就执行cb函数
    }
}
//一个Dep
class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    //循环subs里面的所有watcher，调用watcher的update
    notify(){
        this.subs.forEach(watcher=>watcher.update());
    }
}
