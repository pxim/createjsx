/*
 * @Description: 将mc等定义成一个悬停按钮
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020-10-27 16:57
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-10-27 16:57
 */
export const ButtonHelper = function(mc, cursor) {
    mc.gotoAndStop(0);
    if(cursor) {mc.cursor = cursor;}
    mc.addEventListener('mouseover', (event)=>{
        mc.gotoAndStop(1);
    });
    mc.addEventListener('mouseout', (event)=>{
        mc.gotoAndStop(0);
    });
};
