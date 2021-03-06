~function(global,factory){
	//判断环境
	if(!global.alert){//判断不是windows环境
		throw "This is not a windows environment!"
	}
	//代码逻辑
	global.Table=factory();//暴露工厂函数的执行结果，也就是工厂函数的返回值，Table的构造函数
}(this,function(){//第二个参数的正确解释：定一个一个工厂函数，执行具体的代码逻辑，通过参数传递给形参并返回
	function Table(arg){
		var el=document.getElementById(arg.el);
		var table=document.createElement("table");
		table.className="myTable";//给一个class名，方便区分别的插件
		table.border=1;
		table.width="100%";
		table.style="text-align:center";
		el.appendChild(table);
		var head=document.createElement('thead');
		table.appendChild(head);
		var tds=arg.thead;
		for(item of tds){
			var td=document.createElement('td');
			td.innerHTML=item;
			head.appendChild(td);
		}
	}
	Table.prototype={
		test:function(){
			console.log('test');
		}
	}
	return Table;
})
/*
 *一个插件的正确写法，首先一个自执行函数
 * 为了将某些属性暴露出来，必须将它赋给当前全局对象
 * 不能给window是防止其他环境调用报错
 * 在实际参数中给this，this指代档期环境中的全局对象
 * 在形参中命名global方便理解
 * 依然只能在window环境中运行，所以先判断环境后进行逻辑
 * 通过global就能把所有想暴露的东西都暴露出来
 * */

//以下的就是写一个插件的基本格式（插件模型代码），只需要在代码逻辑的地方写上具体的代码即可
//解释：自执行函数形参封装接口，实参引出接口
//~function(global,factory){
//	//判断环境
//	if(!global.alert){
//		throw "This is not a windows environment!"
//	}
//	//代码逻辑
//	global.Table=factory();
//}(this,function(){
//	functon Table(){
	//此处写具体的代码逻辑
//	}
//	return Table;
//})