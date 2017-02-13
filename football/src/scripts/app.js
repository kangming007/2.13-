
require("./libs/angular.min");
require("./libs/swiper-3.3.1.min");
require("./libs/zepto.min");
var a=require("./libs/iscroll.js");
require("./libs/touch");
require("./libs/angular-ui-router.min");
require("./js/app");
require("./js/config");
require("./js/controller");
require("./js/service");
require("./js/directive");

new IScroll("#con");
$(document).on("touchmove",function(e){
			e.preventDefault()
		})


























//解构数组
/*function getColors(){
	return ["red","green","blue"]
}
let [hong,lv,lan] = getColors()
console.log(hong+","+lv+","+lan)  //  ["red","green","blue"]

//解构对象
function persons(){
	return {
		name:"zhangsan",
		age:19,
		like:"fruit"
	}
}

var zhangsan=persons()
console.log(zhangsan.name+","+zhangsan.age+","+zhangsan.like)


//模板字符串*****
function foods(){
	return {
		dirnk:"tea",
		food:"chiken"
	}
}
let {food,dirnk}=foods();
console.log(food+","+dirnk)
let person =`今天我准备吃${food},吃完喝点${dirnk}`;
console.log(person)


//带标签的模板字符串
let dessert ="cake",
	dirnks="tea";
//let breakfast = kitchen(`今天是早餐是：${dessert}与${dirnks}`);
let breakfast = kitchen`今天是早餐是：${dessert}与${dirnks}`;
function kitchen(string,...value){
	console.log(string)
	console.log(value)
}



//判断字符串里是否包含其他的字符串
var chichi="cake",
	hehe="tea";
let breakf=`今天的早餐是：
				${chichi}与${hehe}`;
console.log(breakf.startsWith("今天"))  //查找开头   //true   Boolean
console.log(breakf.endsWith("ea"))      //查找结尾   //true   Boolean
console.log(breakf.includes("早餐"))	//查找其中   //true   Boolean


//默认参数
function add(x,y=3){   //当y没有传递参数的时候，默认取值为3
	return x+y
}
console.log(add(2,5)) //7
console.log(add(2))   //5


//展开操作符
let fruit = ["apple","banana"];
let foodss= [...fruit,"bread"];
console.log(foodss)   //["apple","banana","bread"]


//剩余操作符


//...............神奇...............
var a={
	x:10,
	add:function(z){
		return this.x+this.y+z
	}
}
var b={
	y:20,
	__proto__:a
}

console.log(b)

console.log(b.add(30)) //60

//解构参数    
function getPerson(id,name,{email,dizhi}){
	console.log(id)
	console.log(name+","+email)
}
getPerson(1,"张三",{email:"460583580@qq.com",dizhi:"123"})

//函数名称
let fn = function fun(){

}
console.log(fn) //function fun() {}

//箭头函数
let jiantou =(id,name) => {      //===>>>     var jiantou =function(id,name){  
	
	console.log(name,id)					//		console.log(name,id)
}                                           //}
jiantou(2,"张三")

//对象表达式
let abc=12;
let str={abc,def:"张三"}
console.log(str)    //  Object{abc:12,def:"张三"}


//对象属性名
let obj={};
let num="QQ";
let iphone="电 话";
obj[num]=460583580
obj[iphone]=18301503481
console.log(obj)

//     Object.is      比较俩个东西是否一模一样**************
				console.log(Object.is(NaN,"234"))   //等价   NaN=="234"   false
/*特殊*/	//	console.log(Object.is(NaN,NaN))     //true
			//	console.log(Object.is(+0,-0))       //false
			//	console.log(NaN == NaN)             //false
			//	console.log(+0  == -0)				//true

//****************设置对象的prototype
//*******************神奇啊*********************************
/**///	function km(){									  							/* */
/**/													  							/* */
/**///	}												  							/* */
/**///console.log(km.__proto__==Function.prototype)         //函数的原型				/* */
/**///console.log(km.__proto__.__proto__==Object.prototype) //对象字面量的原型 		/* */
/**///console.log(km.__proto__.__proto__.__proto__==null)   //null找到头了			/* */
//**********************************************************


//把 对象的值复制到另外一个对象里  ****Object.assign()的方法****
/*let params ={
		city:"北京",
		age:28
}
let obbj ={
	name:"张三"
}
Object.assign(
	params,
	obbj
)
console.log(obbj)  //{name:"张三"}
console.log(params)//{city:"北京",age:28,name:"张三"}

Object.assign(
	params,
	{dizhi:"河南"},
	{minzu:"战斗民族"}
)
console.log(params)


//class类*************************
class chef{
	constructor(food){
		this.food=food;
		this.dish=[];
	}
	get menu(){
		return this.dish;
	}
	set menu(dish){
		this.dish.push(dish);
	}
	cook(){
		console.log(this.food);
	}
}
	var  gp=new chef("包子")
	gp.cook()
	gp.menu="fruit";
	gp.menu="pasir";
	console.log(gp.menu)

//静态方法的声明        **静态   static
	/*static oo(foot)(){
		console.log(food)
	}*/
//继承*    class 子类名  extends 父类  

//Set ********
 /*let perso=new Set(["banana","apple","orange"])
 console.log(perso.size)
 console.log(perso.has("banana"))
 console.log(perso.delete("apple"))
 perso.forEach(perso => {
 	console.log(perso)
 })*/
