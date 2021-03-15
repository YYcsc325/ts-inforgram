import React, { ComponentType, Children, ReactElement, ReactNode } from 'react';
import { message, notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification/index';

export  function openNotification(props: ArgsProps) {
  const { type, message, description } = props;
  if(!type) return;
  notification[type]({
      message,
      description
  });
}

export function processingObj(item = {}, todo, injectProps){
  const newItem = {...item};
  for( const key in item ){
    if(isFunc(item[key]) && Object.prototype.hasOwnProperty.call(item, key)){
      if(todo === 'calling'){
        newItem[key] = item[key].call(null, injectProps)
      }else if(todo === 'bindding'){
        newItem[key] = item[key].bind(null, injectProps)
      }else{
        newItem[key] = item[key];
      }
    }
  }
  return newItem;
}

export function isFunc(fn: Function){
    if(typeof fn === 'function') return true;
    return false;
}

// 字符串去重复
export function uniqueStr(arr: string[]){
  return [new Set([...arr])];
}
// 数组对象根据id去重复
export function unique(data, type = 'id'){
  let obj = {}
  data = data.reduce((item, next)=>{  //next是另外一个参数
      obj[next[type]]? '': obj[next[type]] = true && item.push(next)
      return item
  },[])
  return data
}

// 将对象转成地址栏山的参数
/**
* @author csc
* @param {Object} obj 需要拼接的参数对象
* @return {String}
* */
export function objToQs(obj: Object) {
if(!obj && !Object.keys(obj).length) {
    return "";
} else {
    var arr = [];
    for(var key in obj) {
        arr.push(key + "=" + obj[key]);
    }
    return arr.join("&");
}
}
// 将地址栏上的参数转成对象
/**
* @author csc
* @param {String} url url地址栏
* @return {Object}
*/
export function qsToObj(url: string) {
var qs = url.split("?")[1];
var arr = [];
var res = {};
if(!qs) {
    // return res;
} else {
    arr = qs.split("&");
    for(var i = 0, len = arr.length; i < len; i++) {
        var key = arr[i].split("=")[0];
        var val = arr[i].split("=")[1];
        res[key] = decodeURIComponent(val);
    }
}
return res;
}
// 获取local
export function getlocal(str) {
try{
    if(window){
        if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
            const local_message = JSON.parse(window.localStorage.getItem(str)) || {}
            return local_message;
        }
    }
}catch(err){
    console.log(err,'err')
}
}

//设置
export function setlocal(str,obj) {
try{
    if(window){
        if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
            localStorage.setItem(str,JSON.stringify(obj))
        }
    }
}catch(err){
    console.log(err,'err')
}
}

//删除
export function removelocal(str) {
try{
    if(window){
        if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
            localStorage.removeItem(str)
        }
    }
}catch(err){
    console.log(err,'err')
}
}
export function copyRangeText(){
  try{
      const range = document.createRange();
      range.selectNode(document.getElementById('id1'));
      const selection = window.getSelection();
      debugger;
      if(selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('copy');
      // alert('复制成功')
  }catch(e){
      alert('你复制个蛋');
  }
  
}
export function copyInput(){    
  let obj = document.getElementById('input1');
  obj.select();
  try{   
      if(document.execCommand("Copy","false",null)){
      //如果复制成功
      alert("复制成功！");  
      }else{
      //如果复制失败
      alert("复制失败！");
      }
  }catch(e){    
    alert("您的浏览器不支持此复制功能，请选中相应内容并使用Ctrl+C进行复制!");    
  }    
} 
export function CopyContent(props) {
  const createRef = React.createRef();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span ref={createRef}>{props.content}</span>
      <a
        href="###"
        onClick={() => {
          const text = createRef.current.innerText;
          var oInput = document.createElement('input');
          oInput.value = text;
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象
          document.execCommand('Copy'); // 执行浏览器复制命令
          oInput.remove();
          message.info('复制成功');
        }}
      >
        复制
      </a>
    </div>
  );
};

export function addTreeKey(list: any[] = [], cb: (val: any) => any) {
  if (!isFunc(cb)) return list;
  return list.map((item: any) => {
    const result = cb({ ...item });
    if (item.children && item.children.length) {
      result.children = addTreeKey(item.children, cb);
    }
    return result;
  });
}
/**
 * @name 监听页面切换
 */
export function addPageListener(cb: () => any){
  document.addEventListener('visibilitychange', cb)
}
/**
 * @name 
 */
export function removePageListener(cb: () => any){
  document.addEventListener('visibilitychange', cb)
}

export function getDisplayName(component: ComponentType<any>) {
  if (!component) return 'Unknow';
  return component.displayName || component.name || 'Unknown';
}

export function findChild<P = any>(children: ReactNode | undefined, component: ComponentType<P>) {
  return Children.toArray(children).find(
    (child: any) => child.type === component,
  ) as ReactElement<P>;
}

export function filterChildren<P = any>(
  children: ReactNode | undefined,
  component: ComponentType<P>,
) {
  return Children.toArray(children).filter((child: any) => child.type === component) as Array<
    ReactElement<P>
  >;
}