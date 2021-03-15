Array.prototype.showMeTheMoney = function showMeTheMoney(callback){
    let _this = this;
    let arr = []     // 如果修改元数据直接在this上进行修改，最后在把this抛出去
    if(_this && _this.length && typeof _this == 'object'){
        let len = _this.length;
        for( let i = 0; i < len; i++){
             arr.push(callback(_this[i], i))
        }
    }
    return arr;
}
let arr = [
    {
        name: 'cen',
        age: 27
    },
    {
        name: 'cen',
        age: 28
    }
]
let arr2 = arr.showMeTheMoney( (item)=> {
    return {
        ...item,
        sex: item.name
    }
});

let arr3 = arr2.map(item=>({...item}))


/*
 * 自己封装偏函数,封在Function上
 */
Function.prototype.partial = function(){
    let _self = this;
    let _args = [].slice.call(arguments);
    return function (){
        let newArgs = _args.concat([].slice.call(arguments));
        return _self.apply(this,newArgs);  // _self是当前this，指向调用它的这个函数
    }
}
function splits(str){
    return str.split('');
}
function reverses(str){
    return str.reverse()
}
function join(str){
    return str.join('-')
}
// 一般函数组合的写法->其实就是利用必包的模式  -->  抓住的compose2的作用域，两个function
function compose2(f,g){
    return function(x){
        return f(g(x))
    }
}
//--------------> 相当于   const compose2 = (f,g) => x => f(g(x))
/**
 *@name     函数组合
 *@params   { argumensts } 每个传入的function
 */
function compose(){
    let args = Array.prototype.slice.call(arguments);    // 伪数组调用真数组的方法   args为传入function的数组
    let len = args.length - 1;
    return function(x){
        let res = args[len](x);
        while(len--){
            res = args[len](res)
        }
        return res
    }
}
function compose2(){
    let args = Array.prototype.slice.call(arguments);    // 伪数组调用真数组的方法   args为传入function的数组
    let len = args.length - 1;
    return function(x){
        return args.reduceRight((pre,cur)=>{             // args从右往左执行,pre(初始值, 或者计算结束后的返回值),cur(当前元素)->是个function, pre不是函数是因为经过计算后的返回值了
            return cur(pre)
        },x)                                             // return出来的值会从新赋值给这个x,每次处理完一个函数给这个x赋值,每次执行完的return出去的值给x（相当于就是pre）
    }
}
//  最后执行的时候顺序是从后往前执行的，依次执行作用域上的函数，跟作用域中的数据       
function curry(fn,len){
    let leng = len || fn.length;                                        // fn.length是定义函数的时候形参的个数
    let func = function(fn){
        let _arg = [].slice.call(arguments,1);
        return function(){
            let newArgs = _arg.concat([].slice.call(arguments));        
            console.log('我是之前进来的')
            return fn.apply(this,newArgs);
        }
    }
    return function(){
        let argLen = arguments.length;
        if(argLen < leng){
            let formattedArr = [fn].concat([].slice.call(arguments));
            return curry(func.apply(this,formattedArr),leng - argLen)
        }else{
            console.log('最后进来的吗')
            return fn.apply(this,arguments)
        }
    }
}
/**
 * @name   随便到处一个数据
 * @params (*)
 * @des 描述过程
 */
class Index1 {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
}
class Index extends Index1{
    constructor(...val){ //name
       super(...val)     //name    相当于Index1.call(...val)
    }
    getName(){                     // 能够定义会改变this的指向，需要函数调用的死后用call,apply,bind.绑定一下
        console.log(this.name);
    }
    getAge = () => {
        console.log(this.age);
    }
}
let obj = new Index('my name is Robert',24);
export {
    obj,
}
//export default new Index('my name is Robert')

function show( obj ){
    this.name = obj.name;
    this.age = obj.age;
    this.sex = obj.sex;
}
show.prototype = {
    getName(){
        return this.name;
    },
    getAge:function(){
        return this.age;
    }
}
function doIt( obj ){
    show.call(this,obj);
}
doIt.prototype = {
    getName(){
        return this.name;
    }
}
let newObj = new doIt({
    name: 'xixi',
    age: 24,
    sex: 'boy'
})
console.log(newObj.getName())


// -----------------------------****-----------------//
class Index1 {
   static getAll(){
       return 'getAll'
   }
   static app = "app";
   constructor(name,age){
       this.name = name;
       this.age = age;
   }
   getName(){                     
       console.log(this.name);
   }
   getAge = () => {
       console.log(this.age);
   }
}
class Index extends Index1{
   static getAllTwo(){
       return super.getAll() + 'getAllTwo';
   }
   constructor(...val){ //name
       super(...val)     //name    相当于Index1.call(...val)
   }
   getName(){                     // 能够定义会改变this的指向，需要函数调用的死后用call,apply,bind.绑定一下
       console.log(this.name);
       return super.getAge();
   }
   getAge = () => {
       console.log(this.age);
   }
}
console.log(Index.getAllTwo());
console.log(Index.getAll());
// let obj = new Index('my name is Robert',24);
let obj2 = new Index1('my name is index2',25);
// obj2.getAge();
obj2.getName();    
// obj.getAge();
// obj.getName();