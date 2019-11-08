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
* @desc 数据劫持方法
* 为了方便递归调用Objserver方法，返回值是一个Objserver实例
* */
function createObj(data) {
    if(typeof data !== 'object') return;
    return new Objserver(data);
}

/*
* @desc 监听方法
* 对于所有object类型接着监听并且递归
* */

function Objserver(data) {
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
*
* */