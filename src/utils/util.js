/*
 * @Description: createjs工具类
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020/1/15 15:10
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/1/15 15:10
 */


//---------------------------------------createjs里用到的方法 开始------------------------------------------------------//
const createjs = window.createjs || {};
const exportRoot = window.exportRoot || {};
const stage = window.stage || {};


/*判断cjs的canvas上的元素是否渲染成功。true 渲染成功；false 渲染不成功；*/
export const onCanvasRendered = function(value, fun) {
    var t = window.setInterval(function () {
        if(exportRoot && exportRoot.numChildren > 0 && stage && stage.contains(exportRoot)){
            window.clearInterval(t);
            if (typeof fun === 'function') {fun(true);}
        }
    }, 200);
};


/**
 * 添加外部script标签
 * 参考 https://www.jb51.net/article/40623.htm
 * @param src
 */
export const addExtScript = function (src) {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= src; //'call.js'
    head.appendChild(script);
}
